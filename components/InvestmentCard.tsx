
import React from 'react';
import { Investment } from '../types';
import { Icon } from './Icon';

interface InvestmentCardProps {
  investment: Investment;
  onClick?: () => void;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment, onClick }) => {
  const isPending = investment.status === 'Pending';
  
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col gap-4 rounded-xl p-4 bg-white dark:bg-slate-800/50 shadow-sm border border-slate-100 dark:border-slate-700/50 hover:dark:bg-slate-800/80 transition-all ${onClick ? 'cursor-pointer active:scale-[0.99]' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg size-10 bg-primary/20 text-primary">
            <Icon name={investment.iconName} />
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white">{investment.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">{investment.category}</p>
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {investment.cycleDuration}
              </span>
            </div>
          </div>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            ${isPending 
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400' 
              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400'
            }`}
        >
          {investment.status}
        </span>
      </div>

      <div className="flex justify-between items-baseline">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Invested</p>
          <p className="font-semibold text-lg text-slate-800 dark:text-white">
            ₦{investment.investedAmount.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 dark:text-slate-400">Current Return</p>
          <p className="font-semibold text-lg text-primary">
            +₦{investment.currentReturn.toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          <span>Repayment Progress</span>
          <span>{investment.progress}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${investment.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};