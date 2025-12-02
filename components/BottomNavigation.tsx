import React from 'react';
import { Icon } from './Icon';
import { ViewType } from '../types';

interface BottomNavigationProps {
  currentView: ViewType;
  onChange: (view: ViewType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentView, onChange }) => {
  const tabs = [
    { id: ViewType.DASHBOARD, label: 'Home', icon: 'home' },
    { id: ViewType.EXPLORE, label: 'Explore', icon: 'travel_explore' },
    { id: ViewType.ACTIVITY, label: 'Activity', icon: 'history' },
    { id: ViewType.PROFILE, label: 'Profile', icon: 'person' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 pb-safe pt-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto h-14">
        {tabs.map((tab) => {
          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 ${
                isActive
                  ? 'text-primary'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? '-translate-y-0.5' : ''}`}>
                <Icon 
                  name={tab.icon} 
                  className={`text-[26px] ${isActive ? 'font-bold' : ''}`} 
                  // Using inline style to toggle FILL variation if supported by the font file loaded
                  // style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24` }}
                />
              </div>
              <span className={`text-[10px] font-medium transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area spacing for mobile devices with home indicators */}
      <div className="h-4 w-full" /> 
    </div>
  );
};
