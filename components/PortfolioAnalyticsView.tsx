
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Icon } from './Icon';

interface PortfolioAnalyticsViewProps {
  onBack: () => void;
}

export const PortfolioAnalyticsView: React.FC<PortfolioAnalyticsViewProps> = ({ onBack }) => {
  // Mock Data for Visualizations
  const allocationData = [
    { name: 'Agriculture', value: 35, color: '#10B981' }, // Primary
    { name: 'Technology', value: 30, color: '#3B82F6' }, // Blue
    { name: 'Manufacturing', value: 20, color: '#F59E0B' }, // Amber
    { name: 'Retail', value: 15, color: '#6366F1' }, // Indigo
  ];

  const statements = [
    { id: 1, month: 'September 2023', size: '1.2 MB' },
    { id: 2, month: 'August 2023', size: '1.1 MB' },
    { id: 3, month: 'July 2023', size: '1.4 MB' },
  ];

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
          Portfolio Analytics
        </h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
          <Icon name="share" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
        
        {/* KPI Grid */}
        <section className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-slate-800 dark:bg-slate-800 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-slate-300">
              <Icon name="avg_pace" className="text-lg" />
              <span className="text-xs font-bold uppercase">Avg. Return</span>
            </div>
            <p className="text-2xl font-bold">14.2%</p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <Icon name="trending_up" className="text-sm" /> +0.8% vs last month
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400">
              <Icon name="event" className="text-lg" />
              <span className="text-xs font-bold uppercase">Next Payout</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">Oct 12</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Est. ₦840.00</p>
          </div>
        </section>

        {/* Asset Allocation */}
        <section className="bg-white dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 dark:text-white mb-6">Asset Allocation</h3>
          
          <div className="flex items-center justify-center h-[200px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="flex-1 flex justify-between items-center text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                  <span className="font-bold text-slate-800 dark:text-white">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Statements & Reports */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">Monthly Statements</h3>
            <button className="text-xs font-bold text-primary">View All</button>
          </div>

          <div className="flex flex-col gap-3">
            {statements.map((statement) => (
              <div key={statement.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500">
                    <Icon name="picture_as_pdf" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{statement.month}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">PDF • {statement.size}</p>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
                  <Icon name="download" />
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
