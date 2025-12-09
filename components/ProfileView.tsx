


import React, { useState } from 'react';
import { Icon } from './Icon';
import { PROFILE_IMAGE_URL } from '../constants';
import { BalanceCard } from './BalanceCard';
import { ViewType, UserProfile } from '../types';

interface ProfileViewProps {
  onLogout?: () => void;
  onNavigate?: (view: ViewType) => void;
  userProfile: UserProfile;
  onSimulateProfile: (type: 'fresh' | 'starter' | 'expert') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onLogout, onNavigate, userProfile, onSimulateProfile }) => {
  const [showDemoOptions, setShowDemoOptions] = useState(false);

  // Check if Tax Profile exists to determine navigation target
  const taxAction = userProfile.taxProfile ? ViewType.TAX_DASHBOARD : ViewType.TAX_PROFILE;

  const menuItems = [
    { 
        icon: 'verified_user', 
        label: 'Identity Verification', 
        sub: userProfile.id === 'fresh_01' ? 'Not Started' : 'Tier 1 - Verified', 
        action: () => onNavigate && onNavigate(ViewType.KYC),
        badge: userProfile.id === 'fresh_01' ? 'Action Required' : undefined
    },
    { 
        icon: 'gavel', 
        label: 'TaxDesk', 
        sub: 'Automated Tax & Filing', 
        action: () => onNavigate && onNavigate(taxAction),
        badge: 'New'
    },
    { icon: 'person', label: 'Personal Information', sub: 'Name, Email, Phone', action: () => {} },
    { icon: 'account_balance_wallet', label: 'Payment Methods', sub: 'Bank Accounts, Cards', action: () => onNavigate && onNavigate(ViewType.PAYMENT_METHODS) },
    { icon: 'eco', label: 'My Impact', sub: 'Social & Environmental stats', action: () => onNavigate && onNavigate(ViewType.IMPACT) },
    { icon: 'card_giftcard', label: 'Refer & Earn', sub: 'Invite friends, earn cash', action: () => onNavigate && onNavigate(ViewType.REFERRAL) },
    { icon: 'school', label: 'Learning Hub', sub: 'Tutorials, Guides, News', action: () => onNavigate && onNavigate(ViewType.LEARN) },
    { icon: 'security', label: 'Security', sub: 'Password, 2FA', action: () => onNavigate && onNavigate(ViewType.SECURITY) },
    { icon: 'notifications', label: 'Notifications', sub: 'Email, Push, SMS', action: () => onNavigate && onNavigate(ViewType.NOTIFICATIONS_SETTINGS) },
    { icon: 'description', label: 'Terms & Privacy', sub: 'Legal Information', action: () => {} },
    { icon: 'help', label: 'Help & Support', sub: 'FAQ, Contact Support', action: () => onNavigate && onNavigate(ViewType.HELP) },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center justify-center gap-3 py-4 mt-2">
        <div className="relative group cursor-pointer">
            <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-28 ring-4 ring-white dark:ring-slate-800 shadow-xl transition-transform group-hover:scale-105"
            style={{ backgroundImage: `url("${PROFILE_IMAGE_URL}")` }}
            />
            <div className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full border-4 border-background-light dark:border-background-dark shadow-sm">
                <Icon name="edit" className="text-xs font-bold" />
            </div>
        </div>
        <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{userProfile.name}</h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{userProfile.email}</p>
        </div>
        <button 
            onClick={() => onNavigate && onNavigate(ViewType.TIERS)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 hover:bg-amber-200 dark:hover:bg-amber-500/30 transition-colors"
        >
            <Icon name="military_tech" className="text-lg" />
            <span className="text-xs font-bold uppercase tracking-wide">{userProfile.tier}</span>
            <Icon name="chevron_right" className="text-sm" />
        </button>
      </div>

      <BalanceCard compact balance={userProfile.walletBalance} />

      {/* Menu Options */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 overflow-hidden shadow-sm">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-50 dark:border-slate-700/50 last:border-0"
          >
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300">
                <Icon name={item.icon} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 dark:text-white text-sm">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.sub}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
                {item.badge && (
                    <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
                <Icon name="chevron_right" className="text-slate-400" />
            </div>
          </button>
        ))}
      </div>

      <button 
        onClick={onLogout}
        className="w-full py-4 rounded-xl text-rose-500 font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors flex items-center justify-center gap-2"
      >
        <Icon name="logout" />
        <span>Log Out</span>
      </button>

      {/* Simulation Toggle - DEVELOPER SETTINGS */}
      <div className="mt-8 mb-4 border-t border-slate-200 dark:border-slate-700 pt-6">
        <button 
            onClick={() => setShowDemoOptions(!showDemoOptions)}
            className="text-xs font-bold text-slate-400 uppercase tracking-widest w-full text-center hover:text-primary transition-colors mb-4"
        >
            {showDemoOptions ? 'Hide Demo Controls' : 'Show Demo Controls'}
        </button>
        
        {showDemoOptions && (
            <div className="grid grid-cols-3 gap-2">
                <button 
                    onClick={() => onSimulateProfile('fresh')}
                    className={`p-2 rounded-lg text-xs font-bold border ${userProfile.id === 'fresh_01' ? 'bg-primary text-white border-primary' : 'bg-transparent text-slate-500 border-slate-300 dark:border-slate-700'}`}
                >
                    Fresh User
                </button>
                <button 
                    onClick={() => onSimulateProfile('starter')}
                    className={`p-2 rounded-lg text-xs font-bold border ${userProfile.id === 'start_01' ? 'bg-primary text-white border-primary' : 'bg-transparent text-slate-500 border-slate-300 dark:border-slate-700'}`}
                >
                    Starter
                </button>
                <button 
                    onClick={() => onSimulateProfile('expert')}
                    className={`p-2 rounded-lg text-xs font-bold border ${userProfile.id === 'expert_01' ? 'bg-primary text-white border-primary' : 'bg-transparent text-slate-500 border-slate-300 dark:border-slate-700'}`}
                >
                    Expert
                </button>
            </div>
        )}
      </div>

      <div className="text-center pb-8">
        <p className="text-xs text-slate-400">Version 2.4.1 (Build 2046)</p>
      </div>
    </div>
  );
};
