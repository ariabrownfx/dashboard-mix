
import React from 'react';
import { Icon } from './Icon';
import { AgentProfile, ViewType } from '../types';

interface AgentDashboardViewProps {
  onNavigate: (view: ViewType) => void;
  agentProfile: AgentProfile;
}

export const AgentDashboardView: React.FC<AgentDashboardViewProps> = ({ onNavigate, agentProfile }) => {
  
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Header / Wallet */}
      <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
              <Icon name="admin_panel_settings" className="text-9xl" />
          </div>
          
          <div className="relative z-10 flex justify-between items-start mb-6">
              <div>
                  <h2 className="text-3xl font-bold mb-1">{agentProfile.name}</h2>
                  <p className="text-slate-400 text-sm flex items-center gap-1">
                      <Icon name="map" className="text-xs" />
                      {agentProfile.region}
                  </p>
              </div>
          </div>
          
          <div className="relative z-10">
              <p className="text-xs text-slate-400 mb-1">Commission Balance</p>
              <h2 className="text-4xl font-sans font-extrabold tracking-tight mb-4">
                  ₦{agentProfile.walletBalance.toLocaleString()}
              </h2>
              
              <div className="flex gap-4">
                  <button 
                    onClick={() => onNavigate(ViewType.AGENT_WALLET)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-colors"
                  >
                      <Icon name="account_balance_wallet" />
                      <span>Wallet</span>
                  </button>
                  <button 
                    onClick={() => onNavigate(ViewType.AGENT_REPORTS)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                      <Icon name="post_add" />
                      <span>New Report</span>
                  </button>
              </div>
          </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-4">
          <div 
             onClick={() => onNavigate(ViewType.AGENT_TRADERS)}
             className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm cursor-pointer hover:border-purple-200 dark:hover:border-purple-800 transition-colors"
          >
              <div className="size-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
                  <Icon name="groups" />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{agentProfile.tradersCount}</p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Managed Traders</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                  <Icon name="pie_chart" />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{agentProfile.repaymentRate}%</p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Repayment Rate</p>
          </div>
      </div>

      {/* Alerts / Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white">Field Alerts</h3>
              <span className="text-xs font-bold bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">2 New</span>
          </div>

          <div className="space-y-3">
              <div className="flex gap-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20">
                  <Icon name="warning" className="text-rose-500 mt-0.5" />
                  <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">Repayment Missed</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Emmanuel Eze (Eze Hardware) is 3 days overdue.</p>
                      <button className="text-xs font-bold text-rose-600 mt-2 hover:underline">Send Reminder</button>
                  </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                  <Icon name="person_add" className="text-amber-500 mt-0.5" />
                  <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">New Application</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Chinedu Okeke is pending verification.</p>
                      <button 
                        onClick={() => onNavigate(ViewType.AGENT_TRADERS)}
                        className="text-xs font-bold text-amber-600 mt-2 hover:underline"
                      >
                        Review Profile
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* Recent Activity */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Activity</h3>
            <button className="text-sm font-medium text-purple-600 hover:text-purple-700">View All</button>
        </div>
        
        <div className="space-y-3">
            {agentProfile.activities.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300">
                        <Icon name={item.type === 'commission' ? 'monetization_on' : 'edit_document'} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{item.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                    </div>
                    <div className="text-right">
                        <span className={`text-sm font-bold ${item.amount > 0 ? 'text-emerald-500' : 'text-slate-700'}`}>
                            {item.amount > 0 ? '+' : ''}₦{item.amount.toLocaleString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};
