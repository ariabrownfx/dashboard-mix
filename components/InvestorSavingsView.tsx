
import React, { useState } from 'react';
import { Icon } from './Icon';
import { UserProfile, ViewType } from '../types';

interface InvestorSavingsViewProps {
  onNavigate: (view: ViewType, id?: string) => void;
  userProfile: UserProfile;
}

export const InvestorSavingsView: React.FC<InvestorSavingsViewProps> = ({ onNavigate, userProfile }) => {
  const [showInterestRates, setShowInterestRates] = useState(false);
  const totalSaved = userProfile.savingsPlans.reduce((sum, plan) => sum + plan.balance, 0);

  const getLiquidityColor = (type: string) => {
      switch(type) {
          case 'Locked': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400';
          case 'Partial': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
          case 'Flexible': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-4">
      
      {/* Header / Summary Card */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
          <div className="absolute -top-10 -right-10 size-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 size-32 rounded-full bg-emerald-500/10 blur-2xl"></div>
          
          <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                  <div>
                      <h2 className="text-sm font-medium text-slate-300 mb-1">Total Savings</h2>
                      <h1 className="text-4xl font-sans font-extrabold tracking-tight mb-2">
                          ₦{totalSaved.toLocaleString()}
                      </h1>
                      <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                          <Icon name="trending_up" className="text-sm" />
                          <span>+₦840 interest accrued</span>
                      </div>
                  </div>
                  <div className="size-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <Icon name="savings" className="text-xl" />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => onNavigate(ViewType.INVESTOR_SAVINGS_CREATE)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors active:scale-[0.98]"
                  >
                      <Icon name="add" />
                      <span>Create Plan</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/5 active:scale-[0.98]">
                      <Icon name="bolt" />
                      <span>Quick Save</span>
                  </button>
              </div>
          </div>
      </div>

      {/* View Toggle */}
      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex mb-2">
        <button
            onClick={() => setShowInterestRates(false)}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${!showInterestRates ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
        >
            Active Plans
        </button>
        <button
            onClick={() => setShowInterestRates(true)}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${showInterestRates ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
        >
            Interest Rates
        </button>
      </div>

      {/* Savings Plans */}
      <div className="flex flex-col gap-4">
          <h3 className="font-bold text-slate-800 dark:text-white">Active Plans</h3>
          
          {userProfile.savingsPlans.length > 0 ? (
              userProfile.savingsPlans.map((plan) => (
                  <div 
                    key={plan.id}
                    onClick={() => onNavigate(ViewType.INVESTOR_SAVINGS_DETAIL, plan.id)}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group"
                  >
                      <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-3">
                                  <div className={`size-10 rounded-full flex items-center justify-center text-lg ${showInterestRates ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'}`}>
                                      {showInterestRates ? (
                                          <span className="font-bold text-xs">{plan.interestRate}%</span>
                                      ) : (
                                          <Icon name={plan.liquidityType === 'Locked' ? 'lock' : 'lock_open'} />
                                      )}
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{plan.name}</h4>
                                      <div className="flex items-center gap-2 text-xs">
                                          <span className={`px-1.5 py-0.5 rounded font-medium ${getLiquidityColor(plan.liquidityType)}`}>
                                              {plan.liquidityType}
                                          </span>
                                          <span className="text-slate-400">• {plan.tenorDays > 0 ? `${plan.tenorDays} Days` : 'Flexible'}</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <Icon name="chevron_right" className="text-slate-300 group-hover:text-primary transition-colors" />
                              </div>
                          </div>

                          <div className="space-y-2">
                              <div className="flex justify-between items-end">
                                  <div>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Saved</p>
                                      <p className="font-bold text-lg text-slate-800 dark:text-white">₦{plan.balance.toLocaleString()}</p>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Target</p>
                                      <p className="font-bold text-sm text-slate-600 dark:text-slate-300">₦{plan.targetAmount.toLocaleString()}</p>
                                  </div>
                              </div>
                              
                              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                  <div 
                                      className="bg-primary h-2 rounded-full transition-all duration-1000"
                                      style={{ width: `${Math.min(100, (plan.balance / plan.targetAmount) * 100)}%` }}
                                  />
                              </div>
                          </div>
                      </div>
                      
                      {plan.nextDepositDate && (
                          <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-2 flex justify-between items-center text-xs">
                              <span className="text-slate-500 dark:text-slate-400">Next Due: <span className="font-bold text-slate-700 dark:text-slate-300">{plan.nextDepositDate}</span></span>
                              {plan.autoSaveEnabled && (
                                  <span className="flex items-center gap-1 text-emerald-500 font-bold">
                                      <Icon name="autorenew" className="text-xs" /> Auto-save on
                                  </span>
                              )}
                          </div>
                      )}
                  </div>
              ))
          ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                  <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4 text-slate-400">
                      <Icon name="savings" className="text-3xl" />
                  </div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">No Active Plans</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px] mb-4">Start a fixed deposit or target savings plan today.</p>
                  <button 
                    onClick={() => onNavigate(ViewType.INVESTOR_SAVINGS_CREATE)}
                    className="text-primary font-bold text-sm hover:underline"
                  >
                      Create your first plan
                  </button>
              </div>
          )}
      </div>
    </div>
  );
};
