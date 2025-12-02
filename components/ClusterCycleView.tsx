
import React, { useState } from 'react';
import { Cluster, Collection } from '../types';
import { Icon } from './Icon';

interface ClusterCycleViewProps {
  cluster: Cluster;
  collection: Collection;
  onBack: () => void;
}

export const ClusterCycleView: React.FC<ClusterCycleViewProps> = ({ cluster, collection, onBack }) => {
  const [investAmount, setInvestAmount] = useState<string>(cluster.minInvestment.toString());

  // Use fixed return rate calculation: Principal * (Rate / 100)
  const estimatedReturn = Math.floor(
    parseInt(investAmount || '0') * (cluster.fixedReturn / 100)
  );

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
          {cluster.durationDays} Days Cycle
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Main Stats Card */}
        <div className="p-6 bg-slate-900 dark:bg-slate-800 text-white rounded-b-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Icon name={collection.iconName} className="text-9xl" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 opacity-80">
               <Icon name="location_on" className="text-sm" />
               <span className="text-sm font-medium">{collection.name}</span>
            </div>
            
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-bold tracking-tight">{cluster.fixedReturn}%</span>
              <span className="text-lg font-medium text-emerald-400">Return</span>
            </div>
            
            <p className="text-slate-300 mb-6 max-w-[80%]">
              Fixed return for this {cluster.durationDays}-day liquidity cycle.
            </p>

            <div className="flex gap-4">
               <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-sm font-medium">
                  Min. ₦{cluster.minInvestment.toLocaleString()}
               </div>
               <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 backdrop-blur-sm text-sm font-medium border border-emerald-500/30">
                  {cluster.status}
               </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 flex flex-col gap-6">
          {/* Timeline Section */}
          <div className="bg-white dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Icon name="calendar_month" className="text-primary" />
              Cycle Timeline
            </h3>
            
            <div className="relative pl-4 space-y-6 border-l-2 border-slate-200 dark:border-slate-700 ml-2">
              <div className="relative">
                <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-800"></div>
                <p className="text-sm font-bold text-slate-800 dark:text-white">Open for Investment</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Today</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-800"></div>
                <p className="text-sm font-bold text-slate-800 dark:text-white">Cycle Starts</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{cluster.startDate}</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-800"></div>
                <p className="text-sm font-bold text-slate-800 dark:text-white">Maturity Date</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{cluster.maturityDate}</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-800"></div>
                <p className="text-sm font-bold text-slate-800 dark:text-white">Payout Date</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{cluster.payoutDate}</p>
              </div>
            </div>
          </div>

          {/* Funding Progress */}
          <div className="bg-white dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
             <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Funding Progress</h3>
                <span className="text-sm font-bold text-primary">{cluster.fundingProgress}% Filled</span>
             </div>
             <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 mb-2">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-1000" 
                  style={{ width: `${cluster.fundingProgress}%` }}
                />
             </div>
             <p className="text-xs text-slate-500 dark:text-slate-400">
               {Math.floor(Math.random() * 200) + 50} investors have already joined this cycle.
             </p>
          </div>

          {/* Information */}
          <div className="space-y-4">
             <div>
               <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Cycle Objectives</h3>
               <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                 {cluster.description} Funds are directly allocated to vetted merchants in the {collection.category} sector within {collection.location}.
               </p>
             </div>
             
             <div>
               <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Security</h3>
               <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Icon name="verified_user" className="text-primary" />
                  <span>Backed by {collection.securityType}</span>
               </div>
             </div>
          </div>

          {/* Calculator */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Return Calculator</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">Investment Amount (₦)</label>
                <input 
                  type="number"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700/50">
                <span className="text-sm text-slate-600 dark:text-slate-400">Est. Return ({cluster.durationDays} days)</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  +₦{estimatedReturn.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 safe-area-bottom">
        <div className="max-w-md mx-auto flex gap-4">
          <div className="flex-1">
             <p className="text-xs text-slate-500 dark:text-slate-400">Total Payable</p>
             <p className="text-xl font-bold text-slate-800 dark:text-white">₦{parseInt(investAmount || '0').toLocaleString()}</p>
          </div>
          <button className="flex-[2] bg-primary text-white font-bold text-base py-3 px-6 rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform">
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );
};
