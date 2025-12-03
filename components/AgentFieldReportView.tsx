
import React, { useState } from 'react';
import { Icon } from './Icon';

interface AgentFieldReportViewProps {
  onBack: () => void;
}

export const AgentFieldReportView: React.FC<AgentFieldReportViewProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 z-[60] bg-background-light dark:bg-background-dark flex flex-col animate-in slide-in-from-right duration-300">
      <header className="flex items-center gap-4 p-4 sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md z-10 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <Icon name="close" className="text-2xl" />
        </button>
        <h1 className="text-lg font-bold text-slate-800 dark:text-white truncate flex-1">
          New Field Report
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
         {step === 1 && (
             <div className="space-y-6 animate-in fade-in">
                 <section>
                     <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Visit Type</label>
                     <div className="grid grid-cols-2 gap-3">
                         <button className="p-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg">Routine Visit</button>
                         <button className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold">Verification</button>
                         <button className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold">Repayment Collection</button>
                         <button className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold">Issue Resolution</button>
                     </div>
                 </section>

                 <section>
                     <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Trader</label>
                     <div className="relative">
                         <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                         <input 
                            type="text" 
                            placeholder="Search trader name..." 
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none"
                         />
                     </div>
                 </section>

                 <section>
                     <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Notes</label>
                     <textarea 
                        rows={4} 
                        placeholder="Enter visit details..."
                        className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none"
                     ></textarea>
                 </section>
             </div>
         )}

         {step === 2 && (
             <div className="space-y-6 animate-in fade-in">
                 <section>
                     <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Evidence & Media</label>
                     
                     <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4 bg-slate-50 dark:bg-slate-800/50">
                         <div className="size-16 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 shadow-sm">
                             <Icon name="add_a_photo" className="text-3xl" />
                         </div>
                         <div>
                             <p className="font-bold text-slate-800 dark:text-white">Upload Photos</p>
                             <p className="text-xs text-slate-500 dark:text-slate-400">Shop front, inventory, or receipt</p>
                         </div>
                     </div>
                 </section>

                 <section>
                     <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">GPS Location</label>
                     <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl">
                         <Icon name="my_location" className="text-emerald-500" />
                         <div>
                             <p className="text-sm font-bold text-slate-800 dark:text-white">Location Tagged</p>
                             <p className="text-xs text-slate-500 dark:text-slate-400">Accuracy: 5 meters</p>
                         </div>
                     </div>
                 </section>
             </div>
         )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-md mx-auto flex gap-4">
             {step === 2 && (
                 <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl"
                 >
                     Back
                 </button>
             )}
             <button 
                onClick={() => step === 1 ? setStep(2) : onBack()}
                className="flex-[2] py-3 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-colors"
             >
                 {step === 1 ? 'Next' : 'Submit Report'}
             </button>
        </div>
      </div>
    </div>
  );
};
