
import React, { useState } from 'react';
import { Investment } from '../types';
import { Icon } from './Icon';

interface ActiveInvestmentDetailViewProps {
  investment: Investment;
  onBack: () => void;
}

export const ActiveInvestmentDetailView: React.FC<ActiveInvestmentDetailViewProps> = ({ investment, onBack }) => {
  const [rolloverOption, setRolloverOption] = useState<'payout' | 'principal' | 'all'>('payout');

  return (
    <div className="fixed inset-0 z-[60] bg-background-light dark:bg-background-dark flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md z-10 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <Icon name="arrow_back" className="text-2xl" />
        </button>
        <h1 className="text-lg font-bold text-slate-800 dark:text-white truncate flex-1">
          Investment Details
        </h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
          <Icon name="receipt_long" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Hero Section */}
        <div className="p-6 bg-slate-900 dark:bg-slate-800 text-white shadow-lg mb-6">
           <div className="flex items-center gap-3 mb-6">
               <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                   <Icon name={investment.iconName} className="text-2xl" />
               </div>
               <div>
                   <h2 className="text-xl font-bold">{investment.name}</h2>
                   <p className="text-slate-400 text-sm">{investment.cycleDuration} Cycle • {investment.category}</p>
               </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
               <div>
                   <p className="text-sm text-slate-400 mb-1">Current Value</p>
                   <p className="text-2xl font-bold">₦{(investment.investedAmount + investment.currentReturn).toLocaleString()}</p>
               </div>
               <div className="text-right">
                   <p className="text-sm text-slate-400 mb-1">Accrued Interest</p>
                   <p className="text-2xl font-bold text-emerald-400">+₦{investment.currentReturn.toLocaleString()}</p>
               </div>
           </div>
        </div>

        <div className="px-4 space-y-6">
            {/* Timeline */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                <h3 className="font-bold text-slate-800 dark:text-white mb-6">Maturity Timeline</h3>
                
                <div className="relative flex justify-between items-center z-0 px-2">
                    {/* Line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-700 -z-10 rounded-full" />
                    <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-1000" 
                        style={{ width: `${investment.progress}%` }} 
                    />

                    {/* Start */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="size-4 rounded-full bg-primary border-4 border-white dark:border-slate-800 shadow-sm" />
                        <div className="text-center">
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Start</p>
                            <p className="text-xs font-bold text-slate-800 dark:text-white">{investment.startDate}</p>
                        </div>
                    </div>

                    {/* Current (Floating) - Simplified for UI */}

                    {/* End */}
                    <div className="flex flex-col items-center gap-2">
                         <div className={`size-4 rounded-full border-4 border-white dark:border-slate-800 shadow-sm ${investment.progress >= 100 ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`} />
                        <div className="text-center">
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Maturity</p>
                            <p className="text-xs font-bold text-slate-800 dark:text-white">{investment.maturityDate}</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                    <Icon name="info" className="text-blue-500" />
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        Funds will be available in your wallet on <span className="font-bold">{investment.payoutDate}</span> unless rolled over.
                    </p>
                </div>
            </div>

            {/* Rollover Settings */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">Payout Preferences</h3>
                
                <div className="space-y-3">
                    <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${rolloverOption === 'payout' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'}`}>
                        <input 
                            type="radio" 
                            name="rollover" 
                            checked={rolloverOption === 'payout'}
                            onChange={() => setRolloverOption('payout')}
                            className="text-primary focus:ring-primary size-5"
                        />
                        <div className="ml-3">
                            <span className="block text-sm font-bold text-slate-800 dark:text-white">Payout to Wallet</span>
                            <span className="block text-xs text-slate-500 dark:text-slate-400">Principal + Interest deposited to balance</span>
                        </div>
                    </label>

                    <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${rolloverOption === 'principal' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'}`}>
                        <input 
                            type="radio" 
                            name="rollover" 
                            checked={rolloverOption === 'principal'}
                            onChange={() => setRolloverOption('principal')}
                            className="text-primary focus:ring-primary size-5"
                        />
                        <div className="ml-3">
                            <span className="block text-sm font-bold text-slate-800 dark:text-white">Rollover Principal</span>
                            <span className="block text-xs text-slate-500 dark:text-slate-400">Reinvest principal, payout interest</span>
                        </div>
                    </label>

                     <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${rolloverOption === 'all' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'}`}>
                        <input 
                            type="radio" 
                            name="rollover" 
                            checked={rolloverOption === 'all'}
                            onChange={() => setRolloverOption('all')}
                            className="text-primary focus:ring-primary size-5"
                        />
                        <div className="ml-3">
                            <span className="block text-sm font-bold text-slate-800 dark:text-white">Compound (Rollover All)</span>
                            <span className="block text-xs text-slate-500 dark:text-slate-400">Reinvest principal + interest for max returns</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Documents */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                 <h3 className="font-bold text-slate-800 dark:text-white mb-4">Documents</h3>
                 <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500">
                            <Icon name="description" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Investment Contract</span>
                    </div>
                    <Icon name="download" className="text-slate-400 group-hover:text-primary transition-colors" />
                 </button>
                 <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <Icon name="verified" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ownership Certificate</span>
                    </div>
                    <Icon name="download" className="text-slate-400 group-hover:text-primary transition-colors" />
                 </button>
            </div>

             <button className="w-full py-4 rounded-xl text-rose-500 font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors text-sm">
                Emergency Liquidation Request
             </button>
        </div>
      </div>
    </div>
  );
};