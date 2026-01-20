import React from 'react';

/**
 * Landing Page Template
 * 
 * To create a new landing page:
 * 1. Duplicate this folder
 * 2. Rename it (e.g., CampaignXLanding)
 * 3. Update the content and styles
 * 4. Register the route in App.tsx
 */

const BaseLanding: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 flex items-center justify-center">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl text-center border border-slate-200 dark:border-slate-800">
                <h1 className="text-3xl font-bold mb-4 dark:text-white">Nova Landing Page</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Este é um template base. Comece a editar para criar sua oferta personalizada.
                </p>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">
                    Configurar CTA
                </button>
            </div>
        </div>
    );
};

export default BaseLanding;
