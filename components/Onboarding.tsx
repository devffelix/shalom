
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight } from 'lucide-react';
import { ShalomLogo } from './Layout';

export interface Step {
  targetId: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingProps {
  steps: Step[];
  onComplete?: () => void;
  storageKey: string; // New prop to differentiate flows
}

const Onboarding: React.FC<OnboardingProps> = ({ steps, onComplete, storageKey }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const currentStep = steps[currentStepIndex];

  // Start logic
  useEffect(() => {
    const hasCompleted = localStorage.getItem(storageKey);
    if (!hasCompleted) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, [storageKey]);

  // SCROLL LOGIC: Trigger scroll ONLY when step changes
  useEffect(() => {
    if (!isVisible) return;

    const element = document.getElementById(currentStep.targetId);
    if (element) {
      // Smooth scroll to the element with centered alignment
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [currentStepIndex, isVisible, currentStep.targetId]);

  // TRACKING LOGIC: Constantly update rect position AND handle resize
  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId: number;

    const trackPosition = () => {
      const element = document.getElementById(currentStep.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Only update if dimensions actually changed (simple diff check could optimize this)
        setTargetRect(rect);
      }
      animationFrameId = requestAnimationFrame(trackPosition);
    };

    trackPosition();
    
    // Add explicit listeners for robustness
    window.addEventListener('resize', trackPosition);
    window.addEventListener('scroll', trackPosition, { capture: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', trackPosition);
      window.removeEventListener('scroll', trackPosition, { capture: true });
    };
  }, [isVisible, currentStepIndex, currentStep.targetId]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleSkip = () => {
    finishOnboarding();
  };

  const finishOnboarding = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, 'true');
    if (onComplete) onComplete();
  };

  if (!isVisible || !targetRect) return null;

  // --- RESPONSIVE POSITIONING LOGIC ---
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  // Card dimensions logic
  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? windowWidth - 32 : 300; // Full width - margin on mobile
  const estimatedCardHeight = 220; 

  // Verifica se o alvo é muito grande
  const isLargeTarget = targetRect.height > windowHeight * 0.5 || targetRect.width > windowWidth * 0.8;

  let top, left;

  if (isLargeTarget) {
      // Centraliza na tela se o alvo for muito grande
      top = (windowHeight / 2) - (estimatedCardHeight / 2);
      left = (windowWidth / 2) - (cardWidth / 2);
  } else {
      // Posicionamento padrão: Abaixo do elemento
      top = targetRect.bottom + 20;
      left = targetRect.left + (targetRect.width / 2) - (cardWidth / 2);

      // Se estourar a parte inferior, tenta colocar em cima
      if (top + estimatedCardHeight > windowHeight - 20) {
          const spaceAbove = targetRect.top - 20 - estimatedCardHeight;
          if (spaceAbove > 20) {
              top = targetRect.top - 20 - estimatedCardHeight;
          } else {
              // Se não couber em cima nem embaixo, centraliza verticalmente
              top = (windowHeight / 2) - (estimatedCardHeight / 2);
          }
      }
  }

  // Clamping Horizontal (Segurança de borda)
  left = Math.max(16, Math.min(left, windowWidth - cardWidth - 16));
  
  // Clamping Vertical Final (Segurança absoluta)
  top = Math.max(16, Math.min(top, windowHeight - estimatedCardHeight - 16));

  const popoverStyle: React.CSSProperties = {
      top: top,
      left: left,
      width: isMobile ? 'calc(100vw - 32px)' : '300px',
      maxWidth: '400px',
      position: 'fixed' // Garante posicionamento relativo à viewport
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto touch-none">
      {/* Spotlight Effect - Uses FIXED position to match getBoundingClientRect coordinates perfectly even during scroll */}
      <div 
        className="fixed transition-all duration-100 ease-out rounded-3xl"
        style={{
            top: targetRect.top - 5,
            left: targetRect.left - 5,
            width: targetRect.width + 10,
            height: targetRect.height + 10,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.85)', // Darker overlay for focus
            pointerEvents: 'none'
        }}
      >
          {/* Pulsing border for focus */}
          <div className="absolute inset-0 rounded-3xl border-2 border-white/50 animate-pulse"></div>
      </div>

      {/* The Popover Card */}
      <div 
        className="fixed bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border-4 border-stone-100 dark:border-stone-800 transition-all duration-300 animate-slide-up flex flex-col gap-4"
        style={popoverStyle}
      >
          {/* Little Mascot / Logo Header */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="bg-white dark:bg-stone-800 p-2 rounded-full shadow-lg border-4 border-stone-100 dark:border-stone-700">
                  <ShalomLogo size="w-10 h-10" />
              </div>
          </div>

          <div className="mt-4 text-center">
              <h3 className="text-xl font-black text-ink dark:text-white mb-2 leading-tight">{currentStep.title}</h3>
              <div className="max-h-[30vh] overflow-y-auto pr-1 scrollbar-thin">
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed font-medium">
                    {currentStep.description}
                </p>
              </div>
          </div>

          <div className="flex gap-3 mt-2">
              <button 
                onClick={handleSkip}
                className="flex-1 py-3 rounded-2xl font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors text-xs uppercase tracking-wider bg-stone-100 dark:bg-stone-800"
              >
                  Pular
              </button>
              <button 
                onClick={handleNext}
                className="flex-[2] bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-black text-xs shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
              >
                  {currentStepIndex === steps.length - 1 ? 'Começar' : 'Próximo'} <ChevronRight size={16} strokeWidth={3} />
              </button>
          </div>

          {/* Step Dots */}
          <div className="flex justify-center gap-1.5 mt-1">
              {steps.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStepIndex ? 'w-6 bg-green-500' : 'w-1.5 bg-stone-300 dark:bg-stone-700'}`}></div>
              ))}
          </div>
      </div>
    </div>,
    document.body
  );
};

export default Onboarding;
