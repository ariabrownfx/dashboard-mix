
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
import { InvestorSavingsView } from './components/InvestorSavingsView';
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
import { TraderSavingsView } from './components/TraderSavingsView';
import { CreateSavingsPlanView } from './components/CreateSavingsPlanView';
import { SavingsPlanDetailView } from './components/SavingsPlanDetailView';
import { LoanDetailView } from './components/LoanDetailView';
// Agent Views
import { AgentDashboardView } from './components/AgentDashboardView';
import { AgentTraderManagementView } from './components/AgentTraderManagementView';
import { AgentFieldReportView } from './components/AgentFieldReportView';
// TaxDesk Views
import { TaxProfileView } from './components/TaxProfileView';
import { TaxDashboardView } from './components/TaxDashboardView';
import { TaxFilingView } from './components/TaxFilingView';
import { TaxAdminView } from './components/TaxAdminView';

import { ViewType, UserProfile, UserRole, TraderProfile, AgentProfile } from './types';
import { Icon } from './components/Icon';
import { PROFILE_FRESH, PROFILE_STARTER, PROFILE_EXPERT, PROFILE_TRADER_NEW, PROFILE_TRADER_ACTIVE, PROFILE_AGENT, SAVINGS_PLANS } from './constants';

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
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // User State - Simulating Data Context
  const [userProfile, setUserProfile] = useState<UserProfile>(PROFILE_EXPERT);
  const [traderProfile, setTraderProfile] = useState<TraderProfile>(PROFILE_TRADER_ACTIVE);
  const [agentProfile, setAgentProfile] = useState<AgentProfile>(PROFILE_AGENT);

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
    if ((view === ViewType.TRADER_SAVINGS_PLAN_DETAIL || view === ViewType.INVESTOR_SAVINGS_DETAIL) && id) {
        setSelectedPlanId(id);
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
            case ViewType.INVESTOR_SAVINGS:
                return <InvestorSavingsView onNavigate={navigateTo} userProfile={userProfile} />;
            case ViewType.INVESTOR_SAVINGS_CREATE:
                return <CreateSavingsPlanView onBack={handleBack} />;
            case ViewType.INVESTOR_SAVINGS_DETAIL:
                const plan = userProfile.savingsPlans.find(p => p.id === selectedPlanId);
                return plan ? (
                    <SavingsPlanDetailView plan={plan} onBack={handleBack} />
                ) : (
                    <InvestorSavingsView onNavigate={navigateTo} userProfile={userProfile} />
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
            case ViewType.TRADER_LOAN_DETAIL:
                return traderProfile.activeLoan ? (
                    <LoanDetailView loan={traderProfile.activeLoan} onBack={handleBack} />
                ) : (
                    <TraderDashboardView onNavigate={navigateTo} traderProfile={traderProfile} />
                );
            case ViewType.TRADER_ESUSU:
                return <EsusuView onBack={handleBack} />;
            case ViewType.TRADER_SAVINGS:
                return <TraderSavingsView onNavigate={navigateTo} traderProfile={traderProfile} />;
            case ViewType.TRADER_SAVINGS_CREATE:
                return <CreateSavingsPlanView onBack={handleBack} />;
            case ViewType.TRADER_SAVINGS_PLAN_DETAIL:
                const plan = traderProfile.savingsPlans.find(p => p.id === selectedPlanId);
                return plan ? (
                  <SavingsPlanDetailView plan={plan} onBack={handleBack} />
                ) : (
                  <TraderSavingsView onNavigate={navigateTo} traderProfile={traderProfile} />
                );
            case ViewType.PROFILE:
                // Reuse Profile View but adapted logic inside or pass trader props
                const mappedProfile: UserProfile = {
                    ...userProfile,
                    name: traderProfile.name,
                    email: traderProfile.email,
                    walletBalance: traderProfile.walletBalance,
                    tier: 'Trader', // Override
                    taxProfile: traderProfile.taxProfile
                };
                return (
                     <ProfileView 
                        onLogout={() => { setIsAuthenticated(false); setUserRole(null); }} 
                        onNavigate={navigateTo} 
                        userProfile={mappedProfile}
                        onSimulateProfile={simulateProfile}
                        assignedAgent={traderProfile.assignedAgent}
                    />
                );
        }
    }

    // --- AGENT FLOW ---
    else if (userRole === 'agent') {
        switch (currentView) {
            case ViewType.DASHBOARD:
                return <AgentDashboardView onNavigate={navigateTo} agentProfile={agentProfile} />;
            case ViewType.AGENT_TRADERS:
                return <AgentTraderManagementView onBack={() => navigateTo(ViewType.DASHBOARD)} agentProfile={agentProfile} />;
            case ViewType.AGENT_REPORTS:
                return <AgentFieldReportView onBack={() => navigateTo(ViewType.DASHBOARD)} />;
            case ViewType.AGENT_WALLET:
                // Reusing Activity View for now, could be specific Agent Wallet
                return <ActivityView onNavigate={navigateTo} />;
            case ViewType.PROFILE:
                const mappedProfile: UserProfile = {
                    ...userProfile,
                    name: agentProfile.name,
                    email: agentProfile.email,
                    walletBalance: agentProfile.walletBalance,
                    tier: 'Agent', // Override
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
            // Find in any profile
            const activity = userProfile.activities.find(t => t.id === selectedTransactionId) || 
                             traderProfile.activities.find(t => t.id === selectedTransactionId) ||
                             agentProfile.activities.find(t => t.id === selectedTransactionId);
            return activity ? (
                <TransactionDetailView transaction={activity} onBack={handleBack} />
            ) : (
                <ActivityView onNavigate={navigateTo} />
            );
        case ViewType.TAX_PROFILE:
            return <TaxProfileView onBack={handleBack} onNavigate={navigateTo} />;
        case ViewType.TAX_DASHBOARD:
            return <TaxDashboardView onBack={handleBack} onNavigate={navigateTo} />;
        case ViewType.TAX_FILING:
            return <TaxFilingView onBack={handleBack} onNavigate={navigateTo} />;
        case ViewType.TAX_ADMIN:
            return <TaxAdminView onBack={handleBack} />;
        default:
             // Fallback default
             if (userRole === 'agent') return <AgentDashboardView onNavigate={navigateTo} agentProfile={agentProfile} />;
             if (userRole === 'trader') return <TraderDashboardView onNavigate={navigateTo} traderProfile={traderProfile} />;
             return <DashboardView onNavigate={navigateTo} userProfile={userProfile} />;
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
    ViewType.TRADER_LOAN_DETAIL,
    ViewType.TRADER_ESUSU,
    ViewType.TRADER_SAVINGS_CREATE,
    ViewType.TRADER_SAVINGS_PLAN_DETAIL,
    ViewType.INVESTOR_SAVINGS_CREATE,
    ViewType.INVESTOR_SAVINGS_DETAIL,
    ViewType.AGENT_TRADERS,
    ViewType.AGENT_REPORTS,
    ViewType.TAX_PROFILE,
    ViewType.TAX_DASHBOARD,
    ViewType.TAX_FILING,
    ViewType.TAX_ADMIN
  ];

  const showBottomNav = !fullScreenViews.includes(currentView);

  // Define tabs based on role
  let navTabs;
  if (userRole === 'investor') {
      navTabs = [
        { id: ViewType.DASHBOARD, label: 'Home', icon: 'home' },
        { id: ViewType.EXPLORE, label: 'Explore', icon: 'travel_explore' },
        { id: ViewType.INVESTOR_SAVINGS, label: 'Savings', icon: 'savings' },
        { id: ViewType.ACTIVITY, label: 'Activity', icon: 'history' },
        { id: ViewType.PROFILE, label: 'Profile', icon: 'person' },
      ];
  } else if (userRole === 'trader') {
      navTabs = [
        { id: ViewType.DASHBOARD, label: 'Home', icon: 'home' },
        { id: ViewType.TRADER_SAVINGS, label: 'Savings', icon: 'savings' },
        { id: ViewType.TRADER_LOAN_APPLY, label: 'Loans', icon: 'request_quote' },
        { id: ViewType.ACTIVITY, label: 'Activity', icon: 'history' },
        { id: ViewType.PROFILE, label: 'Profile', icon: 'person' },
      ];
  } else if (userRole === 'agent') {
      navTabs = [
        { id: ViewType.DASHBOARD, label: 'Home', icon: 'home' },
        { id: ViewType.AGENT_TRADERS, label: 'Traders', icon: 'groups' },
        { id: ViewType.AGENT_REPORTS, label: 'Reports', icon: 'post_add' },
        { id: ViewType.PROFILE, label: 'Profile', icon: 'person' },
      ];
  }

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col min-h-screen bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden transition-colors duration-300">
      {showBottomNav && (
        <Header onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      )}
      
      <main className={`flex-1 flex flex-col gap-6 px-4 ${showBottomNav ? 'pb-28' : 'pb-6'} pt-2`}>
        {renderContent()}
      </main>

      {showBottomNav && (
        <BottomNavigation 
            currentView={currentView} 
            onChange={navigateTo} 
            tabs={navTabs}
        />
      )}
    </div>
  );
};

export default App;
