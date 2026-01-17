import React from 'react';
import { Brain, ArrowLeft } from 'lucide-react';

export const KidsQuiz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#f0f9ff] -m-8 p-8 flex flex-col items-center justify-center font-kids">
            <div className="max-w-md text-center p-8 bg-white rounded-[2rem] shadow-xl border-4 border-blue-200">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                    <Brain size={48} />
                </div>
                <h2 className="text-3xl font-black text-blue-500 mb-4">Quiz Bíblico</h2>
                <p className="text-stone-500 font-bold mb-8">Esta funcionalidade estará disponível em breve!</p>
                <button
                    onClick={onBack}
                    className="bg-blue-500 text-white px-8 py-3 rounded-xl font-black hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
                >
                    <ArrowLeft size={20} /> Voltar
                </button>
            </div>
        </div>
    );
};

export default KidsQuiz;
