
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

  // Trader Specific
  TRADER_LOAN_APPLY = 'TraderLoanApply',
  TRADER_ESUSU = 'TraderEsusu',
  TRADER_LOAN_DETAIL = 'TraderLoanDetail',
}

export type ActivityType = 'deposit' | 'withdrawal' | 'investment' | 'payout' | 'yield' | 'repayment' | 'esusu_contribution';

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
}

// --- TRADER SPECIFIC ---

export type UserRole = 'investor' | 'trader';

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
    activities: ActivityItem[];
    onboardingSteps: OnboardingStep[];
}
