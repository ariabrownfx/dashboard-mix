
export interface Investment {
  id: string;
  name: string;
  category: string;
  status: 'Pending' | 'Active';
  investedAmount: number;
  currentReturn: number;
  progress: number;
  iconName: string;
  cycleDuration: string;
  startDate?: string;
  maturityDate?: string;
  payoutDate?: string;
}

export interface Collection {
  id: string;
  name: string;
  category: string;
  location: string;
  country: string; // Added country field
  description: string;
  maxReturn: number; // Changed from maxApy
  minInvestment: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  iconName: string;
  totalInvestors: number;
  securityType: string;
}

export interface CollectionUpdate {
    id: string;
    collectionId: string;
    title: string;
    date: string;
    content: string;
    type: 'news' | 'impact' | 'milestone';
    imageUrl?: string;
}

export interface Cluster {
  id: string;
  collectionId: string;
  durationDays: number; // 30, 60, 90
  fixedReturn: number; // Changed from targetApy
  minInvestment: number;
  fundingProgress: number;
  status: 'Open' | 'Filling Fast' | 'Sold Out';
  description: string;
  startDate: string;
  maturityDate: string;
  payoutDate: string;
}

export interface ChartDataPoint {
  day: string;
  value: number;
}

export enum ViewType {
  // Common
  DASHBOARD = 'Dashboard',
  PROFILE = 'Profile',
  PAYMENT_METHODS = 'PaymentMethods',
  KYC = 'KYC',
  SECURITY = 'Security',
  HELP = 'Help',
  NOTIFICATIONS_SETTINGS = 'NotificationsSettings',
  
  // Investor Specific
  EXPLORE = 'Explore',
  ACTIVITY = 'Activity',
  ANALYTICS = 'Analytics',
  REFERRAL = 'Referral',
  LEARN = 'Learn',
  INVESTMENT_DETAIL = 'InvestmentDetail',
  AUTO_INVEST = 'AutoInvest',
  TRANSACTION_DETAIL = 'TransactionDetail',
  SECONDARY_MARKET = 'SecondaryMarket',
  TIERS = 'Tiers',
  IMPACT = 'Impact',
  INVESTOR_SAVINGS = 'InvestorSavings',
  INVESTOR_SAVINGS_CREATE = 'InvestorSavingsCreate',
  INVESTOR_SAVINGS_DETAIL = 'InvestorSavingsDetail',

  // Trader Specific
  TRADER_LOAN_APPLY = 'TraderLoanApply',
  TRADER_ESUSU = 'TraderEsusu',
  TRADER_LOAN_DETAIL = 'TraderLoanDetail',
  TRADER_SAVINGS = 'TraderSavings',
  TRADER_SAVINGS_CREATE = 'TraderSavingsCreate',
  TRADER_SAVINGS_PLAN_DETAIL = 'TraderSavingsPlanDetail',

  // Agent Specific
  AGENT_TRADERS = 'AgentTraders',
  AGENT_REPORTS = 'AgentReports',
  AGENT_WALLET = 'AgentWallet',

  // TaxDesk
  TAX_PROFILE = 'TaxProfile',
  TAX_DASHBOARD = 'TaxDashboard',
  TAX_FILING = 'TaxFiling',
  TAX_ADMIN = 'TaxAdmin',
}

export type ActivityType = 'deposit' | 'withdrawal' | 'investment' | 'payout' | 'yield' | 'repayment' | 'esusu_contribution' | 'commission' | 'savings_deposit';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}

export interface PaymentMethod {
  id: string;
  type: 'bank' | 'card';
  name: string;
  mask: string; // e.g., "**** 1234"
  status: 'active' | 'expired' | 'requires_verification';
  icon: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  color: string;
  deadline: string;
}

export interface OnboardingStep {
    id: string;
    label: string;
    isCompleted: boolean;
    action: ViewType;
    icon: string;
}

export interface MarketListing {
    id: string;
    investmentName: string;
    originalAmount: number;
    currentValue: number;
    askingPrice: number;
    discount: number; // percentage
    daysRemaining: number;
    returnRate: number; // Changed from apy
    sellerName: string;
    category: string;
    iconName: string;
}

export interface TierLevel {
    name: string;
    minInvestment: number;
    color: string;
    benefits: string[];
    icon: string;
}

export interface ImpactMetric {
    id: string;
    label: string;
    value: string;
    icon: string;
    color: string;
}

export interface SavingsPlan {
    id: string;
    name: string;
    targetAmount: number;
    balance: number;
    tenorDays: number; // 30, 90, 180, 360, 0 (Flexible)
    interestRate: number; // PA
    liquidityType: 'Locked' | 'Partial' | 'Flexible';
    autoSaveEnabled: boolean;
    contributionFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Market Day' | 'Custom';
    startDate: string;
    maturityDate: string;
    nextDepositDate: string;
    status: 'Active' | 'Completed' | 'Paused';
}

// --- TAX DESK ---

export interface TaxProfile {
    countryCode: string;
    taxId: string;
    businessType: 'Individual' | 'Sole Prop' | 'Company';
    vatRegistered: boolean;
    accountingBasis: 'Cash' | 'Accrual';
    optInAutoFile: boolean;
}

export interface TaxTransaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: 'Sales' | 'Expense' | 'Asset' | 'Cost of Sales';
    taxable: boolean;
    vatAmount: number;
    status: 'Auto-Classified' | 'Review Needed' | 'Verified';
    hasInvoice: boolean;
}

export interface TaxFiling {
    id: string;
    period: string; // e.g. "Oct 2023"
    taxType: 'VAT' | 'Income' | 'WHT';
    amountDue: number;
    status: 'Draft' | 'Filed' | 'Failed';
    dateFiled?: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    tier: string;
    joinDate: string;
    walletBalance: number;
    totalInvested: number;
    totalEarnings: number;
    activeInvestmentsCount: number;
    investments: Investment[];
    activities: ActivityItem[];
    goals: FinancialGoal[];
    chartData: ChartDataPoint[];
    onboardingSteps: OnboardingStep[];
    savingsPlans: SavingsPlan[];
    taxProfile?: TaxProfile;
}

// --- TRADER SPECIFIC ---

export type UserRole = 'investor' | 'trader' | 'agent';

export interface Loan {
    id: string;
    amount: number;
    collectionName: string;
    durationDays: number;
    startDate: string;
    dueDate: string;
    totalRepayment: number;
    amountPaid: number;
    dailyRepaymentAmount: number;
    status: 'Active' | 'Completed' | 'Defaulted' | 'Pending Approval';
    progress: number;
}

export interface EsusuGroup {
    id: string;
    name: string;
    contributionAmount: number;
    frequency: 'Daily' | 'Weekly';
    membersCount: number;
    myPosition: number; // e.g., 3rd to collect
    payoutDate: string;
    totalSaved: number;
}

export interface TraderProfile {
    id: string;
    name: string;
    businessName: string;
    email: string;
    location: string;
    kycStatus: 'Verified' | 'Pending' | 'None';
    creditScore: number;
    walletBalance: number;
    activeLoan: Loan | null;
    esusuGroups: EsusuGroup[];
    savingsPlans: SavingsPlan[];
    activities: ActivityItem[];
    onboardingSteps: OnboardingStep[];
    taxProfile?: TaxProfile;
    assignedAgent?: {
        name: string;
        phone: string;
        photo: string;
    };
}

// --- AGENT SPECIFIC ---

export interface ManagedTrader {
    id: string;
    name: string;
    businessName: string;
    location: string;
    status: 'Active' | 'Pending Verification' | 'Default Risk' | 'New';
    loanStatus?: 'On Track' | 'Late' | 'No Loan';
    lastVisit?: string;
}

export interface AgentProfile {
    id: string;
    name: string;
    region: string;
    email: string;
    walletBalance: number; // Commission balance
    commissionEarned: number;
    tradersCount: number;
    repaymentRate: number; // Percentage
    managedTraders: ManagedTrader[];
    activities: ActivityItem[];
    onboardingSteps: OnboardingStep[];
}
