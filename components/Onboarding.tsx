
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
        setTargetRect(rect);
      }
      animationFrameId = requestAnimationFrame(trackPosition);
    };

    trackPosition();
    
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

  // --- REFINED POSITIONING LOGIC TO PREVENT OVERLAP ---
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? windowWidth - 40 : 320;
  const estimatedCardHeight = 260; // Increased buffer for safety

  let top, left;

  // 1. Calculate center of the target
  const targetCenterY = targetRect.top + targetRect.height / 2;
  const spaceAbove = targetRect.top;
  const spaceBelow = windowHeight - targetRect.bottom;

  // 2. Decide if placing above or below based on available space
  // We prefer below (spaceBelow) if it's enough, otherwise check above.
  if (spaceBelow > estimatedCardHeight + 40) {
      // Place BELOW
      top = targetRect.bottom + 24;
  } else if (spaceAbove > estimatedCardHeight + 40) {
      // Place ABOVE
      top = targetRect.top - estimatedCardHeight - 24;
  } else {
      // FALLBACK: If target is too tall or covers middle, 
      // place it at the extreme bottom or top of the viewport
      // depending on which half the target's center is NOT in.
      if (targetCenterY > windowHeight / 2) {
          // Target is in bottom half, put modal at the top
          top = 24;
      } else {
          // Target is in top half, put modal at the bottom
          top = windowHeight - estimatedCardHeight - 24;
      }
  }

  // 3. Horizontal centering relative to target
  left = targetRect.left + (targetRect.width / 2) - (cardWidth / 2);

  // 4. Clamping: Ensure it stays within screen boundaries
  const horizontalMargin = 20;
  left = Math.max(horizontalMargin, Math.min(left, windowWidth - cardWidth - horizontalMargin));
  
  const verticalMargin = 20;
  top = Math.max(verticalMargin, Math.min(top, windowHeight - estimatedCardHeight - verticalMargin));

  const popoverStyle: React.CSSProperties = {
      top: top,
      left: left,
      width: isMobile ? 'calc(100vw - 40px)' : '320px',
      maxWidth: '400px',
      position: 'fixed'
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto touch-none">
      {/* Spotlight Effect */}
      <div 
        className="fixed transition-all duration-300 ease-out rounded-3xl"
        style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.85)',
            pointerEvents: 'none'
        }}
      >
          <div className="absolute inset-0 rounded-3xl border-4 border-gold/40 animate-pulse"></div>
      </div>

      {/* The Popover Card */}
      <div 
        className="fixed bg-white dark:bg-stone-900 rounded-[2.5rem] p-6 shadow-2xl border-4 border-stone-100 dark:border-stone-800 transition-all duration-500 animate-slide-up flex flex-col gap-4"
        style={popoverStyle}
      >
          {/* Mascot / Logo Header */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-br from-gold to-orange p-3 rounded-full shadow-xl border-4 border-white dark:border-stone-800">
                  <ShalomLogo size="w-10 h-10" />
              </div>
          </div>

          <div className="mt-6 text-center">
              <h3 className="text-xl font-black text-ink dark:text-white mb-2 leading-tight">{currentStep.title}</h3>
              <div className="max-h-[30vh] overflow-y-auto pr-1 no-scrollbar">
                <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base leading-relaxed font-medium">
                    {currentStep.description}
                </p>
              </div>
          </div>

          <div className="flex gap-3 mt-2">
              <button 
                onClick={handleSkip}
                className="flex-1 py-3.5 rounded-2xl font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors text-xs uppercase tracking-wider bg-stone-100 dark:bg-stone-800"
              >
                  Pular
              </button>
              <button 
                onClick={handleNext}
                className="flex-[2] bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
              >
                  {currentStepIndex === steps.length - 1 ? 'Começar' : 'Próximo'} <ChevronRight size={16} strokeWidth={3} />
              </button>
          </div>

          {/* Step Dots */}
          <div className="flex justify-center gap-2 mt-1">
              {steps.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStepIndex ? 'w-8 bg-green-500' : 'w-2 bg-stone-200 dark:bg-stone-700'}`}></div>
              ))}
          </div>
      </div>
    </div>,
    document.body
  );
};

export default Onboarding;
