
import React from 'react';
import { Icon } from './Icon';
import { TraderProfile, ViewType } from '../types';
import { OnboardingWidget } from './OnboardingWidget';

interface TraderDashboardViewProps {
  onNavigate: (view: ViewType) => void;
  traderProfile: TraderProfile;
}

export const TraderDashboardView: React.FC<TraderDashboardViewProps> = ({ onNavigate, traderProfile }) => {
  const hasActiveLoan = !!traderProfile.activeLoan;
  const isKycComplete = traderProfile.kycStatus === 'Verified';

  // Credit Score Color
  const getScoreColor = (score: number) => {
      if (score >= 700) return 'text-emerald-500';
      if (score >= 600) return 'text-amber-500';
      return 'text-rose-500';
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Header / Credit Score */}
      <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
              <Icon name="speed" className="text-9xl" />
          </div>
          
          <div className="relative z-10 flex justify-between items-start">
              <div>
                  <h2 className="text-3xl font-bold mb-1">{traderProfile.businessName}</h2>
                  <p className="text-slate-400 text-sm flex items-center gap-1">
                      <Icon name="location_on" className="text-xs" />
                      {traderProfile.location}
                  </p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                  <p className="text-xs text-slate-300 uppercase font-bold mb-1">Credit Score</p>
                  <p className={`text-3xl font-bold ${getScoreColor(traderProfile.creditScore)}`}>
                      {traderProfile.creditScore > 0 ? traderProfile.creditScore : 'N/A'}
                  </p>
              </div>
          </div>
          
          <div className="relative z-10 mt-6 flex gap-4">
              <div className="flex-1 bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">Wallet Balance</p>
                  <p className="text-xl font-bold">₦{traderProfile.walletBalance.toLocaleString()}</p>
              </div>
              <button 
                onClick={() => onNavigate(ViewType.PAYMENT_METHODS)}
                className="flex items-center justify-center px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors font-bold text-sm"
              >
                  <Icon name="add" className="mr-1" /> Top Up
              </button>
          </div>
      </div>

      {/* Onboarding Checklist (if KYC not done or no loan) */}
      {!hasActiveLoan && (
          <OnboardingWidget 
            steps={traderProfile.onboardingSteps} 
            onNavigate={onNavigate} 
          />
      )}

      {/* Active Loan Card */}
      {hasActiveLoan && traderProfile.activeLoan && (
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Icon name="verified_user" className="text-9xl" />
              </div>

              <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                              <Icon name="request_quote" />
                          </div>
                          <div>
                              <h3 className="font-bold text-white">Active Loan</h3>
                              <p className="text-xs text-emerald-100">{traderProfile.activeLoan.collectionName}</p>
                          </div>
                      </div>
                      <span className="text-xs font-bold bg-white text-emerald-700 px-2 py-1 rounded-full shadow-sm">
                          {traderProfile.activeLoan.status}
                      </span>
                  </div>

                  <div className="space-y-4">
                      <div className="flex justify-between items-end">
                          <div>
                              <p className="text-xs text-emerald-100 mb-1">Outstanding Balance</p>
                              <p className="text-2xl font-bold text-white">
                                  ₦{(traderProfile.activeLoan.totalRepayment - traderProfile.activeLoan.amountPaid).toLocaleString()}
                              </p>
                          </div>
                          <div className="text-right">
                              <p className="text-xs text-emerald-100 mb-1">Due Date</p>
                              <p className="text-sm font-bold text-white">{traderProfile.activeLoan.dueDate}</p>
                          </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                          <div className="flex justify-between text-xs mb-1 text-emerald-100">
                              <span>Repayment Progress</span>
                              <span className="font-bold text-white">{Math.round((traderProfile.activeLoan.amountPaid / traderProfile.activeLoan.totalRepayment) * 100)}%</span>
                          </div>
                          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000" 
                                style={{ width: `${(traderProfile.activeLoan.amountPaid / traderProfile.activeLoan.totalRepayment) * 100}%` }}
                              />
                          </div>
                      </div>

                      {/* Daily Repayment Action */}
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between border border-white/10">
                          <div>
                              <p className="text-xs text-emerald-100 font-bold uppercase">Daily Installment</p>
                              <p className="text-lg font-bold text-white">₦{traderProfile.activeLoan.dailyRepaymentAmount.toLocaleString()}</p>
                          </div>
                          <button className="px-6 py-2 bg-white text-emerald-700 font-bold rounded-lg shadow-md hover:bg-emerald-50 transition-colors">
                              Pay Now
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Esusu Card */}
      <div 
        onClick={() => onNavigate(ViewType.TRADER_ESUSU)}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow relative overflow-hidden"
      >
          <div className="absolute -right-6 -bottom-6 opacity-20">
              <Icon name="groups" className="text-9xl" />
          </div>
          
          <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                      <Icon name="savings" /> Esusu Groups
                  </h3>
                  <Icon name="chevron_right" />
              </div>

              {traderProfile.esusuGroups.length > 0 ? (
                  <div className="space-y-3">
                      {traderProfile.esusuGroups.map(group => (
                          <div key={group.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                              <div className="flex justify-between mb-1">
                                  <span className="font-bold text-sm">{group.name}</span>
                                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-white">{group.frequency} Contribution</span>
                              </div>
                              <p className="text-xs text-indigo-100">Saved: ₦{group.totalSaved.toLocaleString()}</p>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-4">
                      <p className="text-sm font-medium mb-2">Join a savings circle today</p>
                      <span className="bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">Explore Groups</span>
                  </div>
              )}
          </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
          <button 
             onClick={() => onNavigate(ViewType.TRADER_LOAN_APPLY)}
             className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
              <div className="size-10 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                  <Icon name="add_business" />
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Apply for Loan</span>
          </button>
          <button className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="size-10 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center">
                  <Icon name="history" />
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">History</span>
          </button>
      </div>

    </div>
  );
};