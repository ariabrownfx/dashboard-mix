
import React, { useState, useMemo } from 'react';
import { Icon } from './Icon';
import { ClusterCard } from './ClusterCard';
import { ClusterDetailsView } from './ClusterDetailsView';
import { COLLECTIONS } from '../constants';
import { Collection, ViewType } from '../types';

const COUNTRIES = ["All", "Nigeria", "Kenya", "Ghana", "South Africa", "Rwanda"];

interface ExploreViewProps {
    onNavigate?: (view: ViewType) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCountry, setActiveCountry] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  
  // Advanced Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minReturn, setMinReturn] = useState<number>(0);

  const filteredCollections = useMemo(() => {
    return COLLECTIONS.filter(collection => {
      // 1. Search matching
      const matchesSearch = 
        collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collection.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collection.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collection.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        collection.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Country matching
      let matchesCountry = true;
      if (activeCountry !== 'All') {
        matchesCountry = collection.country === activeCountry;
      }

      // 3. Min Return matching (Advanced)
      let matchesReturn = true;
      if (minReturn > 0) {
        matchesReturn = collection.maxReturn >= minReturn;
      }

      return matchesSearch && matchesCountry && matchesReturn;
    });
  }, [searchQuery, activeCountry, minReturn]);

  const activeFilterCount = (minReturn > 0 ? 1 : 0);

  const resetFilters = () => {
    setMinReturn(0);
  };

  // If a collection is selected, show the details view overlay
  if (selectedCollection) {
    return <ClusterDetailsView collection={selectedCollection} onBack={() => setSelectedCollection(null)} />;
  }

  return (
    <>
      <div className="flex flex-col gap-4 animate-in fade-in duration-500">
        {/* Search and Filter Section */}
        
        {/* Row 1: Search Bar */}
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="search" className="text-slate-400" />
            </div>
            <input
            type="text"
            placeholder="Search markets, categories..."
            className="block w-full pl-10 pr-3 h-12 rounded-xl border-none bg-white dark:bg-slate-800/80 text-slate-800 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary shadow-sm outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* Continental Markets Banner (Premium) */}
        <div 
            onClick={() => onNavigate && onNavigate(ViewType.SECONDARY_MARKET)}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-700 to-yellow-600 rounded-xl text-white shadow-md cursor-pointer hover:opacity-95 transition-opacity relative overflow-hidden group"
        >
             {/* Decorative Background */}
             <div className="absolute -right-6 -bottom-6 opacity-20 text-black group-hover:scale-110 transition-transform duration-500">
                 <Icon name="public" className="text-9xl" />
             </div>

            <div className="flex items-center gap-3 relative z-10">
                <div className="size-12 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Icon name="public" className="text-white text-2xl" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-sm">Continental Markets</p>
                        <span className="text-[10px] font-bold bg-black/40 px-1.5 py-0.5 rounded text-yellow-100 border border-yellow-200/30">GOLD+</span>
                    </div>
                    <p className="text-xs text-yellow-50 opacity-90">Cross-border opportunities across Africa</p>
                </div>
            </div>
            <Icon name="chevron_right" />
        </div>

        {/* Row 2: Country Dropdown & Filter Button */}
        <div className="flex gap-3">
            {/* Country Dropdown */}
            <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Icon name="public" className="text-slate-500 dark:text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <select
                    value={activeCountry}
                    onChange={(e) => setActiveCountry(e.target.value)}
                    className="appearance-none w-full h-12 pl-10 pr-10 rounded-xl border-none bg-white dark:bg-slate-800/80 text-slate-800 dark:text-white font-semibold text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
                >
                    {COUNTRIES.map((country) => (
                        <option key={country} value={country}>{country === 'All' ? 'All Locations' : country}</option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
                    <Icon name="expand_more" />
                </div>
            </div>

            {/* Filter Toggle Button */}
            <button 
                onClick={() => setIsFilterOpen(true)}
                className={`
                relative flex items-center justify-center size-12 rounded-xl transition-all duration-200 border flex-shrink-0
                ${activeFilterCount > 0
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-white dark:bg-slate-800/80 border-transparent text-slate-500 dark:text-slate-400 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700'
                }
                `}
                aria-label="Open filters"
            >
                <Icon name="tune" />
                {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white border-2 border-background-light dark:border-background-dark">
                    {activeFilterCount}
                </span>
                )}
            </button>
        </div>

        {/* Results Count & Clear */}
        <div className="flex items-center justify-between px-1 pt-2">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {filteredCollections.length} {filteredCollections.length === 1 ? 'Market' : 'Markets'} Found
          </p>
          {(activeFilterCount > 0 || activeCountry !== 'All' || searchQuery) && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCountry('All');
                resetFilters();
              }}
              className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Filter Modal / Sheet */}
        {isFilterOpen && (
             <div className="fixed inset-0 z-50 flex items-end justify-center">
                 <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsFilterOpen(false)} />
                 <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
                     <div className="flex items-center justify-between mb-6">
                         <h3 className="text-xl font-bold text-slate-800 dark:text-white">Filters</h3>
                         <button onClick={() => setIsFilterOpen(false)} className="p-2 -mr-2 text-slate-500 dark:text-slate-400">
                             <Icon name="close" />
                         </button>
                     </div>

                     <div className="space-y-6 mb-8">
                         <div>
                             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                                 Minimum Return: <span className="text-primary">{minReturn}%</span>
                             </label>
                             <input 
                                type="range" 
                                min="0" 
                                max="20" 
                                step="1" 
                                value={minReturn}
                                onChange={(e) => setMinReturn(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                             />
                             <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                                 <span>0%</span>
                                 <span>10%</span>
                                 <span>20%+</span>
                             </div>
                         </div>
                     </div>

                     <button 
                        onClick={() => setIsFilterOpen(false)}
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-colors"
                     >
                         Show Results
                     </button>
                 </div>
             </div>
        )}

        {/* List */}
        <div className="flex flex-col gap-4 pb-4">
          {filteredCollections.map((collection) => (
            <ClusterCard
              key={collection.id}
              cluster={collection}
              onClick={() => setSelectedCollection(collection)}
            />
          ))}
          
          {filteredCollections.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Icon name="search_off" className="text-3xl text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-700 dark:text-slate-300">No markets found</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
