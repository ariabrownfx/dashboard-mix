
import React, { useState } from 'react';
import { Icon } from './Icon';
import { SavingsPlan } from '../types';

interface SavingsPlanDetailViewProps {
  plan: SavingsPlan;
  onBack: () => void;
}

export const SavingsPlanDetailView: React.FC<SavingsPlanDetailViewProps> = ({ plan, onBack }) => {
  const [showAgentCode, setShowAgentCode] = useState(false);
  const progress = Math.min(100, Math.round((plan.balance / plan.targetAmount) * 100));

  if (showAgentCode) {
      return (
          <div className="fixed inset-0 z-[70] bg-slate-900 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
              <div className="bg-white rounded-3xl p-8 w-full max-w-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Agent Deposit</h2>
                  <p className="text-slate-500 text-sm mb-6">Show this code to a registered Mix Agent to deposit cash instantly.</p>
                  
                  <div className="bg-slate-100 rounded-xl p-6 mb-6">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">YOUR CODE</p>
                      <p className="text-4xl font-mono font-bold text-slate-900 tracking-widest">849 201</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6">
                      <Icon name="timer" />
                      <span>Code expires in 15:00</span>
                  </div>

                  <button 
                    onClick={() => setShowAgentCode(false)}
                    className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold"
                  >
                      Close
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="fixed inset-0 z-[60] bg-background-light dark:bg-background-dark flex flex-col animate-in slide-in-from-right duration-300">
      <header className="flex items-center gap-4 p-4 sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md z-10 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <Icon name="arrow_back" className="text-2xl" />
        </button>
        <h1 className="text-lg font-bold text-slate-800 dark:text-white truncate flex-1">
          {plan.name}
        </h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
          <Icon name="more_vert" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
         {/* Main Card */}
         <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl mb-6">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Icon name="lock" className="text-9xl" />
              </div>
              <div className="relative z-10 text-center">
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Current Balance</p>
                  <h1 className="text-4xl font-extrabold mb-4">₦{plan.balance.toLocaleString()}</h1>
                  
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                      <div className="flex justify-between text-xs font-bold mb-2">
                          <span className="text-emerald-400">{progress}% Reached</span>
                          <span className="text-slate-300">Target: ₦{plan.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-3">
                          <div className="bg-emerald-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                      </div>
                  </div>
              </div>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-2 gap-3 mb-6">
             <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                 <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Interest Rate</p>
                 <p className="text-xl font-bold text-slate-800 dark:text-white">{plan.interestRate}% P.A.</p>
             </div>
             <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                 <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Maturity</p>
                 <p className="text-xl font-bold text-slate-800 dark:text-white">{plan.maturityDate}</p>
             </div>
             <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                 <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Next Deposit</p>
                 <p className="text-lg font-bold text-slate-800 dark:text-white">{plan.nextDepositDate}</p>
             </div>
             <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                 <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Status</p>
                 <p className="text-lg font-bold text-emerald-500">{plan.status}</p>
             </div>
         </div>

         {/* Actions */}
         <div className="space-y-3 mb-6">
             <button className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                 <Icon name="add_card" />
                 <span>Top Up with Card / Wallet</span>
             </button>
             
             <button 
                onClick={() => setShowAgentCode(true)}
                className="w-full py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold border border-slate-200 dark:border-slate-700 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
             >
                 <Icon name="store" />
                 <span>Deposit via Agent</span>
             </button>

             {plan.liquidityType !== 'Locked' && (
                 <button className="w-full py-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                    <Icon name="arrow_upward" />
                    <span>Withdraw Funds</span>
                 </button>
             )}
         </div>

         {/* Transaction Mini-feed */}
         <div>
             <h3 className="font-bold text-slate-800 dark:text-white mb-3">Recent Contributions</h3>
             <div className="space-y-3">
                 {[1, 2].map((i) => (
                     <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                         <div className="flex items-center gap-3">
                             <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                 <Icon name="arrow_downward" className="text-sm" />
                             </div>
                             <div>
                                 <p className="text-sm font-bold text-slate-800 dark:text-white">Auto-Deposit</p>
                                 <p className="text-[10px] text-slate-500">Oct 12, 2023</p>
                             </div>
                         </div>
                         <span className="font-bold text-emerald-500">+₦5,000</span>
                     </div>
                 ))}
             </div>
         </div>
      </div>
    </div>
  );
};
