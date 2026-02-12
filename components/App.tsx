
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
// Investor Views
import { DashboardView } from './components/DashboardView';
import { ExploreView } from './components/ExploreView';
import { ProfileView } from './components/ProfileView';
import { ActivityView } from './components/ActivityView';
import { PortfolioAnalyticsView } from './components/PortfolioAnalyticsView';
import { ActiveInvestmentDetailView } from './components/ActiveInvestmentDetailView';
import { AutoInvestView } from './components/AutoInvestView';
import { TransactionDetailView } from './components/TransactionDetailView';
import { SecondaryMarketView } from './components/SecondaryMarketView';
import { TiersView } from './components/TiersView';
import { ImpactProfileView } from './components/ImpactProfileView';
// Common Views
import { LoginView } from './components/LoginView';
import { SignupView } from './components/SignupView';
import { PaymentMethodsView } from './components/PaymentMethodsView';
import { KYCVerificationView } from './components/KYCVerificationView';
import { SecuritySettingsView } from './components/SecuritySettingsView';
import { HelpSupportView } from './components/HelpSupportView';
import { ReferralProgramView } from './components/ReferralProgramView';
import { LearnView } from './components/LearnView';
import { NotificationSettingsView } from './components/NotificationSettingsView';
// Trader Views
import { RoleSelectionView } from './components/RoleSelectionView';
import { TraderDashboardView } from './components/TraderDashboardView';
import { LoanApplicationView } from './components/LoanApplicationView';
import { EsusuView } from './components/EsusuView';

import { ViewType, UserProfile, UserRole, TraderProfile } from './types';
import { Icon } from './components/Icon';
import { PROFILE_FRESH, PROFILE_STARTER, PROFILE_EXPERT, PROFILE_TRADER_NEW, PROFILE_TRADER_ACTIVE } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.DASHBOARD);
  const [previousView, setPreviousView] = useState<ViewType>(ViewType.DASHBOARD);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Auth & Role State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  
  // Selection State
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<string | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  // User State - Simulating Data Context
  const [userProfile, setUserProfile] = useState<UserProfile>(PROFILE_EXPERT);
  const [traderProfile, setTraderProfile] = useState<TraderProfile>(PROFILE_TRADER_ACTIVE);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateTo = (view: ViewType, id?: string) => {
    setPreviousView(currentView);
    setCurrentView(view);
    if (view === ViewType.INVESTMENT_DETAIL && id) {
        setSelectedInvestmentId(id);
    }
    if (view === ViewType.TRANSACTION_DETAIL && id) {
        setSelectedTransactionId(id);
    }
  };

  const handleBack = () => {
    setCurrentView(previousView);
  };

  // Function to simulate switching user states
  const simulateProfile = (type: 'fresh' | 'starter' | 'expert') => {
      switch(type) {
          case 'fresh': 
              setUserProfile(PROFILE_FRESH); 
              setTraderProfile(PROFILE_TRADER_NEW);
              break;
          case 'starter': 
              setUserProfile(PROFILE_STARTER); 
              // Mock intermediate trader if needed
              setTraderProfile(PROFILE_TRADER_NEW);
              break;
          case 'expert': 
              setUserProfile(PROFILE_EXPERT); 
              setTraderProfile(PROFILE_TRADER_ACTIVE);
              break;
      }
      navigateTo(ViewType.DASHBOARD);
  };

  // 1. Role Selection
  if (!userRole) {
      return <RoleSelectionView onSelectRole={setUserRole} />;
  }

  // 2. Authentication
  if (!isAuthenticated) {
    return (
      <div className="relative w-full max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden transition-colors duration-300">
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full size-10 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Theme"
          >
            <Icon 
              name={isDarkMode ? "light_mode" : "dark_mode"} 
              className="text-xl" 
            />
          </button>
        </div>

        {authView === 'login' ? (
          <LoginView 
            onLogin={() => setIsAuthenticated(true)} 
            onNavigateToSignup={() => setAuthView('signup')} 
            role={userRole}
            onChangeRole={() => setUserRole(null)}
          />
        ) : (
          <SignupView 
            onSignup={() => setIsAuthenticated(true)} 
            onNavigateToLogin={() => setAuthView('login')} 
            role={userRole}
          />
        )}
      </div>
    );
  }

  // 3. Authenticated App Flow
  const renderContent = () => {
    
    // --- INVESTOR FLOW ---
    if (userRole === 'investor') {
        switch (currentView) {
            case ViewType.DASHBOARD:
                return <DashboardView onNavigate={navigateTo} userProfile={userProfile} />;
            case ViewType.EXPLORE:
                return <ExploreView onNavigate={navigateTo} />;
            case ViewType.ACTIVITY:
                return <ActivityView onNavigate={navigateTo} />; 
            case ViewType.PROFILE:
                return (
                    <ProfileView 
                        onLogout={() => { setIsAuthenticated(false); setUserRole(null); }} 
                        onNavigate={navigateTo} 
                        userProfile={userProfile}
                        onSimulateProfile={simulateProfile}
                    />
                );
            case ViewType.ANALYTICS:
                return <PortfolioAnalyticsView onBack={handleBack} />;
            case ViewType.AUTO_INVEST:
                return <AutoInvestView onBack={handleBack} />;
            case ViewType.SECONDARY_MARKET:
                return <SecondaryMarketView onBack={handleBack} userTier={userProfile.tier} />;
            case ViewType.TIERS:
                return <TiersView onBack={handleBack} currentTier={userProfile.tier} totalInvested={userProfile.totalInvested} />;
            case ViewType.IMPACT:
                return <ImpactProfileView onBack={handleBack} />;
            case ViewType.INVESTMENT_DETAIL:
                const investment = userProfile.investments.find(i => i.id === selectedInvestmentId);
                return investment ? (
                    <ActiveInvestmentDetailView investment={investment} onBack={handleBack} />
                ) : (
                    <DashboardView onNavigate={navigateTo} userProfile={userProfile} />
                );
            // ... Common views shared below
        }
    } 
    
    // --- TRADER FLOW ---
    else if (userRole === 'trader') {
        switch (currentView) {
            case ViewType.DASHBOARD:
                return <TraderDashboardView onNavigate={navigateTo} traderProfile={traderProfile} />;
            case ViewType.ACTIVITY:
                // Reuse Activity View but could filter for trader specific types
                return <ActivityView onNavigate={navigateTo} />;
            case ViewType.TRADER_LOAN_APPLY:
                return <LoanApplicationView onBack={handleBack} />;
            case ViewType.TRADER_ESUSU:
                return <EsusuView onBack={handleBack} />;
            case ViewType.PROFILE:
                // Reuse Profile View but adapted logic inside or pass trader props
                // For MVP we reuse but ideally split. Using userProfile struct for compatibility for now
                // Mapping traderProfile to userProfile shape for visual compatibility
                const mappedProfile: UserProfile = {
                    ...userProfile,
                    name: traderProfile.name,
                    email: traderProfile.email,
                    walletBalance: traderProfile.walletBalance,
                    tier: 'Trader', // Override
                };
                return (
                     <ProfileView 
                        onLogout={() => { setIsAuthenticated(false); setUserRole(null); }} 
                        onNavigate={navigateTo} 
                        userProfile={mappedProfile}
                        onSimulateProfile={simulateProfile}
                    />
                );
        }
    }

    // --- SHARED VIEWS ---
    switch(currentView) {
        case ViewType.PAYMENT_METHODS:
            return <PaymentMethodsView onBack={handleBack} />;
        case ViewType.KYC:
            return <KYCVerificationView onBack={handleBack} />;
        case ViewType.SECURITY:
            return <SecuritySettingsView onBack={handleBack} />;
        case ViewType.NOTIFICATIONS_SETTINGS:
            return <NotificationSettingsView onBack={handleBack} />;
        case ViewType.HELP:
            return <HelpSupportView onBack={handleBack} />;
        case ViewType.REFERRAL:
            return <ReferralProgramView onBack={handleBack} />;
        case ViewType.LEARN:
            return <LearnView onBack={handleBack} />;
        case ViewType.TRANSACTION_DETAIL:
            // Find in either profile
            const activity = userProfile.activities.find(t => t.id === selectedTransactionId) || traderProfile.activities.find(t => t.id === selectedTransactionId);
            return activity ? (
                <TransactionDetailView transaction={activity} onBack={handleBack} />
            ) : (
                <ActivityView onNavigate={navigateTo} />
            );
        default:
             return userRole === 'investor' 
                ? <DashboardView onNavigate={navigateTo} userProfile={userProfile} />
                : <TraderDashboardView onNavigate={navigateTo} traderProfile={traderProfile} />;
    }
  };

  // Define Full Screen Views to hide bottom nav
  const fullScreenViews = [
    ViewType.ANALYTICS, 
    ViewType.PAYMENT_METHODS, 
    ViewType.KYC, 
    ViewType.SECURITY, 
    ViewType.NOTIFICATIONS_SETTINGS,
    ViewType.HELP, 
    ViewType.REFERRAL,
    ViewType.LEARN,
    ViewType.INVESTMENT_DETAIL,
    ViewType.AUTO_INVEST,
    ViewType.TRANSACTION_DETAIL,
    ViewType.SECONDARY_MARKET,
    ViewType.TIERS,
    ViewType.IMPACT,
    ViewType.TRADER_LOAN_APPLY,
    ViewType.TRADER_ESUSU
  ];

  const showBottomNav = !fullScreenViews.includes(currentView);

  // Customize Bottom Nav for Trader
  // We can pass different tabs based on role if we refactor BottomNavigation
  // For now, we reuse it, but 'Explore' is Investor only. 
  // TODO: Refactor BottomNavigation to accept tabs prop

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col min-h-screen bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden transition-colors duration-300">
      {showBottomNav && (
        <Header onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      )}
      
      <main className={`flex-1 flex flex-col gap-6 px-4 ${showBottomNav ? 'pb-28' : 'pb-6'} pt-2`}>
        {renderContent()}
      </main>

      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 pb-safe pt-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center max-w-md mx-auto h-14">
                {/* Home */}
                <button
                    onClick={() => navigateTo(ViewType.DASHBOARD)}
                    className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 ${currentView === ViewType.DASHBOARD ? 'text-primary' : 'text-slate-400'}`}
                >
                    <Icon name="home" className="text-[26px]" />
                    <span className="text-[10px] font-medium">Home</span>
                </button>

                {/* Explore (Investor Only) / Loan (Trader Only) */}
                {userRole === 'investor' ? (
                     <button
                        onClick={() => navigateTo(ViewType.EXPLORE)}
                        className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 ${currentView === ViewType.EXPLORE ? 'text-primary' : 'text-slate-400'}`}
                    >
                        <Icon name="travel_explore" className="text-[26px]" />
                        <span className="text-[10px] font-medium">Explore</span>
                    </button>
                ) : (
                    <button
                        onClick={() => navigateTo(ViewType.TRADER_LOAN_APPLY)}
                        className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 ${currentView === ViewType.TRADER_LOAN_APPLY ? 'text-primary' : 'text-slate-400'}`}
                    >
                        <Icon name="request_quote" className="text-[26px]" />
                        <span className="text-[10px] font-medium">Loans</span>
                    </button>
                )}

                {/* Activity */}
                <button
                    onClick={() => navigateTo(ViewType.ACTIVITY)}
                    className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 ${currentView === ViewType.ACTIVITY ? 'text-primary' : 'text-slate-400'}`}
                >
                    <Icon name="history" className="text-[26px]" />
                    <span className="text-[10px] font-medium">Activity</span>
                </button>

                {/* Profile */}
                <button
                    onClick={() => navigateTo(ViewType.PROFILE)}
                    className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 ${currentView === ViewType.PROFILE ? 'text-primary' : 'text-slate-400'}`}
                >
                    <Icon name="person" className="text-[26px]" />
                    <span className="text-[10px] font-medium">Profile</span>
                </button>
            </div>
            <div className="h-4 w-full" /> 
        </div>
      )}
    </div>
  );
};

export default App;
