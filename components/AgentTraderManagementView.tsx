
import React, { useState } from 'react';
import { Icon } from './Icon';
import { AgentProfile } from '../types';

interface AgentTraderManagementViewProps {
  onBack: () => void;
  agentProfile: AgentProfile;
}

export const AgentTraderManagementView: React.FC<AgentTraderManagementViewProps> = ({ onBack, agentProfile }) => {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Pending' | 'Risk'>('All');
  
  const filteredTraders = agentProfile.managedTraders.filter(t => {
      if (filter === 'All') return true;
      if (filter === 'Active') return t.status === 'Active';
      if (filter === 'Pending') return t.status === 'Pending Verification';
      if (filter === 'Risk') return t.status === 'Default Risk';
      return true;
  });

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400';
          case 'Pending Verification': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
          case 'Default Risk': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

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
          Manage Traders
        </h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
          <Icon name="search" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-20">
         {/* Filters */}
         <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
             {['All', 'Active', 'Pending', 'Risk'].map((f) => (
                 <button 
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                        filter === f 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                 >
                     {f}
                 </button>
             ))}
         </div>

         {/* Trader List */}
         <div className="space-y-4">
             {filteredTraders.map((trader) => (
                 <div key={trader.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                     <div className="p-4 flex items-start gap-4">
                         <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold text-lg">
                             {trader.name[0]}
                         </div>
                         <div className="flex-1">
                             <div className="flex justify-between items-start mb-1">
                                 <h3 className="font-bold text-slate-800 dark:text-white">{trader.name}</h3>
                                 <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${getStatusColor(trader.status)}`}>
                                     {trader.status}
                                 </span>
                             </div>
                             <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{trader.businessName} • {trader.location}</p>
                             
                             <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                 <div className="flex items-center gap-1">
                                     <Icon name="event_available" className="text-sm" />
                                     <span>Visited {trader.lastVisit}</span>
                                 </div>
                                 {trader.loanStatus && (
                                     <div className={`flex items-center gap-1 ${trader.loanStatus === 'Late' ? 'text-rose-500' : 'text-emerald-500'}`}>
                                         <Icon name="payments" className="text-sm" />
                                         <span>{trader.loanStatus}</span>
                                     </div>
                                 )}
                             </div>
                         </div>
                     </div>
                     
                     {/* Actions */}
                     <div className="flex border-t border-slate-100 dark:border-slate-700">
                         {trader.status === 'Pending Verification' ? (
                             <>
                                <button className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    Decline
                                </button>
                                <div className="w-px bg-slate-100 dark:bg-slate-700" />
                                <button className="flex-1 py-3 text-sm font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors">
                                    Verify Trader
                                </button>
                             </>
                         ) : (
                             <>
                                <button className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    Log Visit
                                </button>
                                <div className="w-px bg-slate-100 dark:bg-slate-700" />
                                <button className="flex-1 py-3 text-sm font-bold text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors">
                                    View Profile
                                </button>
                             </>
                         )}
                     </div>
                 </div>
             ))}
         </div>
      </div>
    </div>
  );
};
