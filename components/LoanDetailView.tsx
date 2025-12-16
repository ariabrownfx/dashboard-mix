
import React from 'react';
import { Loan } from '../types';
import { Icon } from './Icon';

interface LoanDetailViewProps {
  loan: Loan;
  onBack: () => void;
}

export const LoanDetailView: React.FC<LoanDetailViewProps> = ({ loan, onBack }) => {
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
          Loan Details
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Summary Card */}
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white mb-6">
           <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-emerald-100 text-xs font-bold uppercase mb-1">Total Outstanding</p>
                    <h2 className="text-3xl font-bold">₦{(loan.totalRepayment - loan.amountPaid).toLocaleString()}</h2>
                </div>
                <div className="size-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Icon name="verified_user" className="text-2xl" />
                </div>
           </div>

           <div className="grid grid-cols-2 gap-4 bg-black/10 rounded-xl p-4 border border-white/10">
               <div>
                   <p className="text-xs text-emerald-100 mb-1">Principal</p>
                   <p className="font-bold">₦{loan.amount.toLocaleString()}</p>
               </div>
               <div>
                   <p className="text-xs text-emerald-100 mb-1">Interest</p>
                   <p className="font-bold">₦{(loan.totalRepayment - loan.amount).toLocaleString()}</p>
               </div>
           </div>
        </div>

        <div className="px-4 space-y-6">
            {/* Progress Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Repayment Progress</p>
                        <p className="text-lg font-bold text-slate-800 dark:text-white">{loan.progress}%</p>
                    </div>
                    <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-lg">
                        On Track
                    </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 mb-4">
                    <div 
                        className="bg-emerald-500 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${loan.progress}%` }} 
                    />
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Paid: ₦{loan.amountPaid.toLocaleString()}</span>
                    <span>Total: ₦{loan.totalRepayment.toLocaleString()}</span>
                </div>
            </div>

            {/* Schedule Info */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Repayment Schedule</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Icon name="calendar_month" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-white">Daily Installment</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Due every day at 4 PM</p>
                            </div>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-white">₦{loan.dailyRepaymentAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <Icon name="event" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-white">Due Date</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Final deadline</p>
                            </div>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-white">{loan.dueDate}</span>
                    </div>
                </div>
            </div>

            {/* Recent Payments Mock */}
            <div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-3">Recent Payments</h3>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <Icon name="check" className="text-sm" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">Daily Auto-Debit</p>
                                    <p className="text-[10px] text-slate-500">Oct {12-i}, 2023</p>
                                </div>
                            </div>
                            <span className="font-bold text-emerald-500">-₦{loan.dailyRepaymentAmount.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-md mx-auto flex gap-4">
             <button className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-slate-700">
                 Defer Payment
             </button>
             <button className="flex-[2] py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-colors">
                 Pay Now
             </button>
        </div>
      </div>
    </div>
  );
};
