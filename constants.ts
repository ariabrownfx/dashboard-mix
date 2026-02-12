
// ... (imports remain same)
import { ChartDataPoint, Investment, Collection, Cluster, ActivityItem, Notification, PaymentMethod, FinancialGoal, UserProfile, CollectionUpdate, MarketListing, TierLevel, ImpactMetric, TraderProfile, Loan, EsusuGroup, ViewType, AgentProfile, ManagedTrader, SavingsPlan, TaxProfile, TaxTransaction, TaxFiling } from "./types";

// --- BASE DATA ---

export const COLLECTIONS: Collection[] = [
  // Nigeria
  {
    id: 'c1',
    name: 'Computer Village Hub',
    category: 'Technology',
    location: 'Ikeja, Lagos',
    country: 'Nigeria',
    description: 'Wholesale import and distribution of smartphones, laptops, and accessories in the largest ICT hub.',
    maxReturn: 15.5,
    minInvestment: 5000,
    riskLevel: 'Medium',
    iconName: 'devices',
    totalInvestors: 342,
    securityType: 'Inventory Backed'
  },
  {
    id: 'c2',
    name: 'Alaba Electronics Syndicate',
    category: 'Electronics',
    location: 'Ojo, Lagos',
    country: 'Nigeria',
    description: 'Partnership with major electronics importers sourcing direct from Asian manufacturers.',
    maxReturn: 12.8,
    minInvestment: 2500,
    riskLevel: 'Low',
    iconName: 'tv',
    totalInvestors: 520,
    securityType: 'Trade Credit'
  },
  {
    id: 'c3',
    name: 'Ariaria Manufacturers',
    category: 'Manufacturing',
    location: 'Aba, Abia',
    country: 'Nigeria',
    description: '"Made in Aba" leather works, shoe production, and textile export expansion.',
    maxReturn: 18.0,
    minInvestment: 1500,
    riskLevel: 'High',
    iconName: 'factory',
    totalInvestors: 128,
    securityType: 'Equipment Lien'
  },
  {
    id: 'c4',
    name: 'Wuse Trade Partners',
    category: 'Retail',
    location: 'Abuja, FCT',
    country: 'Nigeria',
    description: 'High-end textile and fashion retail expansion in the capital city center.',
    maxReturn: 10.5,
    minInvestment: 10000,
    riskLevel: 'Low',
    iconName: 'storefront',
    totalInvestors: 85,
    securityType: 'Corporate Guarantee'
  },
  // Kenya
  {
    id: 'c9',
    name: 'Silicon Savannah Startups',
    category: 'Technology',
    location: 'Nairobi',
    country: 'Kenya',
    description: 'Funding early-stage fintech and agrotech startups in the kilimani tech ecosystem.',
    maxReturn: 16.2,
    minInvestment: 4000,
    riskLevel: 'High',
    iconName: 'rocket_launch',
    totalInvestors: 210,
    securityType: 'Convertible Notes'
  },
  {
    id: 'c10',
    name: 'Mombasa Logistics',
    category: 'Logistics',
    location: 'Mombasa',
    country: 'Kenya',
    description: 'Port operations and cargo transport fleet expansion for East African trade routes.',
    maxReturn: 13.8,
    minInvestment: 3500,
    riskLevel: 'Medium',
    iconName: 'local_shipping',
    totalInvestors: 156,
    securityType: 'Vehicle Lien'
  },
  // Ghana
  {
    id: 'c11',
    name: 'Accra Cocoa Exchange',
    category: 'Agriculture',
    location: 'Accra',
    country: 'Ghana',
    description: 'Direct financing for cocoa cooperatives to modernize processing and export.',
    maxReturn: 14.5,
    minInvestment: 2000,
    riskLevel: 'Medium',
    iconName: 'coffee',
    totalInvestors: 305,
    securityType: 'Commodity Backed'
  },
  {
    id: 'c12',
    name: 'Kumasi Market Traders',
    category: 'Commerce',
    location: 'Kumasi',
    country: 'Ghana',
    description: 'Working capital for textile and artifact traders in the historic Kejetia Market.',
    maxReturn: 12.0,
    minInvestment: 1000,
    riskLevel: 'Low',
    iconName: 'store',
    totalInvestors: 422,
    securityType: 'Group Guarantee'
  },
  // South Africa
  {
    id: 'c13',
    name: 'Cape Vineyards Estate',
    category: 'Agriculture',
    location: 'Stellenbosch',
    country: 'South Africa',
    description: 'Seasonal harvest funding for premium wine export to European markets.',
    maxReturn: 11.5,
    minInvestment: 8000,
    riskLevel: 'Low',
    iconName: 'wine_bar',
    totalInvestors: 180,
    securityType: 'Crop Insurance'
  },
  {
    id: 'c14',
    name: 'Jozi Mining Support',
    category: 'Energy',
    location: 'Johannesburg',
    country: 'South Africa',
    description: 'Heavy machinery leasing for mineral extraction support services.',
    maxReturn: 19.5,
    minInvestment: 15000,
    riskLevel: 'High',
    iconName: 'construction',
    totalInvestors: 95,
    securityType: 'Asset Backed'
  },
  // Rwanda
  {
    id: 'c15',
    name: 'Kigali Innovation City',
    category: 'Real Estate',
    location: 'Kigali',
    country: 'Rwanda',
    description: 'Development of smart office spaces for international tech firms.',
    maxReturn: 13.0,
    minInvestment: 6000,
    riskLevel: 'Medium',
    iconName: 'apartment',
    totalInvestors: 140,
    securityType: 'Property Deed'
  }
];

export const COLLECTION_UPDATES: CollectionUpdate[] = [
    {
        id: 'u1',
        collectionId: 'c1',
        title: 'New Shipment Arrived',
        date: '2 hours ago',
        content: 'A major consignment of high-end laptops from Shenzhen has successfully cleared customs and arrived at the Ikeja warehouse. Distribution to retailers begins tomorrow.',
        type: 'news',
        imageUrl: 'https://picsum.photos/seed/tech1/400/200'
    },
    {
        id: 'u2',
        collectionId: 'c1',
        title: 'Q3 Sales Record Broken',
        date: '3 days ago',
        content: 'The Computer Village Hub has recorded its highest quarterly turnover in history, driven by increased demand for remote work equipment.',
        type: 'milestone'
    },
    {
        id: 'u3',
        collectionId: 'c3',
        title: 'Factory Expansion Complete',
        date: '1 week ago',
        content: 'The new automated shoe production line in Aba is now fully operational, increasing daily output capacity by 40%.',
        type: 'impact',
        imageUrl: 'https://picsum.photos/seed/factory1/400/200'
    },
    {
        id: 'u4',
        collectionId: 'c11',
        title: 'Harvest Season Begins',
        date: 'Yesterday',
        content: 'Cocoa harvesting has officially begun in the Eastern Region. Early yield indicators suggest a bumper crop this season due to favorable weather.',
        type: 'news',
        imageUrl: 'https://picsum.photos/seed/cocoa/400/200'
    },
    {
        id: 'u5',
        collectionId: 'c11',
        title: 'Sustainability Certification',
        date: '2 weeks ago',
        content: 'Our partner cooperative has received Fair Trade certification, ensuring premium pricing for this season\'s export.',
        type: 'impact'
    }
];

// Helper to get date string
const getDateAfterDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const CLUSTERS: Cluster[] = COLLECTIONS.flatMap(col => [
  {
    id: `${col.id}-30`,
    collectionId: col.id,
    durationDays: 30,
    fixedReturn: Number((col.maxReturn * 0.7).toFixed(1)),
    minInvestment: col.minInvestment,
    fundingProgress: Math.floor(Math.random() * 40) + 50,
    status: 'Open',
    description: `Short-term liquidity cycle for fast-moving consumer goods in ${col.location}, ${col.country}.`,
    startDate: getDateAfterDays(2),
    maturityDate: getDateAfterDays(32),
    payoutDate: getDateAfterDays(34),
  },
  {
    id: `${col.id}-60`,
    collectionId: col.id,
    durationDays: 60,
    fixedReturn: Number((col.maxReturn * 0.85).toFixed(1)),
    minInvestment: col.minInvestment * 1.5,
    fundingProgress: Math.floor(Math.random() * 60) + 20,
    status: 'Filling Fast',
    description: `Medium-term inventory restocking cycle targeting peak sales periods in ${col.location}, ${col.country}.`,
    startDate: getDateAfterDays(5),
    maturityDate: getDateAfterDays(65),
    payoutDate: getDateAfterDays(67),
  },
  {
    id: `${col.id}-90`,
    collectionId: col.id,
    durationDays: 90,
    fixedReturn: col.maxReturn,
    minInvestment: col.minInvestment * 2,
    fundingProgress: Math.floor(Math.random() * 30) + 10,
    status: 'Open',
    description: `Quarterly capital expansion cycle for infrastructure and bulk procurement in ${col.location}, ${col.country}.`,
    startDate: getDateAfterDays(7),
    maturityDate: getDateAfterDays(97),
    payoutDate: getDateAfterDays(100),
  }
]);

export const PROFILE_IMAGE_URL = "https://picsum.photos/100/100";
export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Payout Received', message: 'You received ₦340.50 from Aba Textile Co.', time: '2h ago', read: false, type: 'success' },
  { id: 'n2', title: 'New Market Available', message: 'Bodija Agro-Allied is now open for investment.', time: '5h ago', read: false, type: 'info' },
  { id: 'n3', title: 'Security Alert', message: 'New login detected from Safari on iPhone.', time: '1d ago', read: true, type: 'alert' }
];

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm1', type: 'bank', name: 'Chase Checking', mask: '**** 8823', status: 'active', icon: 'account_balance' },
  { id: 'pm2', type: 'card', name: 'Visa Debit', mask: '**** 4242', status: 'active', icon: 'credit_card' },
  { id: 'pm3', type: 'card', name: 'Mastercard Gold', mask: '**** 8899', status: 'active', icon: 'credit_card' }
];

export const MARKET_LISTINGS: MarketListing[] = [
    {
        id: 'm1',
        investmentName: 'Kano Rice Mills - 90 Days',
        category: 'Agriculture',
        originalAmount: 5000,
        currentValue: 5200,
        askingPrice: 5100,
        discount: 1.9,
        daysRemaining: 45,
        returnRate: 16.5,
        sellerName: 'Michael B.',
        iconName: 'agriculture'
    },
    {
        id: 'm2',
        investmentName: 'Lekki Tech Hub - 60 Days',
        category: 'Technology',
        originalAmount: 10000,
        currentValue: 10400,
        askingPrice: 10250,
        discount: 1.4,
        daysRemaining: 20,
        returnRate: 14.8,
        sellerName: 'Sarah J.',
        iconName: 'computer'
    },
    {
        id: 'm3',
        investmentName: 'Aba Textile Co - 90 Days',
        category: 'Manufacturing',
        originalAmount: 2500,
        currentValue: 2650,
        askingPrice: 2550,
        discount: 3.7,
        daysRemaining: 60,
        returnRate: 18.2,
        sellerName: 'David O.',
        iconName: 'checkroom'
    }
];

export const TIER_LEVELS: TierLevel[] = [
    {
        name: 'Bronze',
        minInvestment: 0,
        color: 'bg-amber-600',
        icon: 'star_outline',
        benefits: ['Access to Standard Pools', 'Standard Support', 'Monthly Withdrawals']
    },
    {
        name: 'Silver',
        minInvestment: 5000,
        color: 'bg-slate-400',
        icon: 'star_half',
        benefits: ['Access to High-Yield Pools', 'Priority Email Support', 'Bi-Weekly Withdrawals', '0.2% Return Boost']
    },
    {
        name: 'Gold',
        minInvestment: 25000,
        color: 'bg-yellow-500',
        icon: 'star',
        benefits: ['Access to Exclusive Private Pools', '24/7 Live Agent', 'Weekly Withdrawals', '0.5% Return Boost', 'Fee-free Secondary Market']
    },
    {
        name: 'Platinum',
        minInvestment: 100000,
        color: 'bg-slate-800 dark:bg-slate-100',
        icon: 'diamond',
        benefits: ['Direct Deal Structuring', 'Dedicated Wealth Manager', 'Instant Withdrawals', '1.0% Return Boost', 'Invitation to Site Visits']
    }
];

export const IMPACT_STATS: ImpactMetric[] = [
    { id: 'i1', label: 'Farmers Funded', value: '42', icon: 'agriculture', color: 'bg-emerald-500' },
    { id: 'i2', label: 'Small Biz Supported', value: '15', icon: 'storefront', color: 'bg-blue-500' },
    { id: 'i3', label: 'Jobs Sustained', value: '128', icon: 'groups', color: 'bg-indigo-500' },
    { id: 'i4', label: 'Production Output', value: '250 Tons', icon: 'inventory_2', color: 'bg-amber-500' }
];

// --- MOCK PROFILES ---

const EXPERT_INVESTMENTS: Investment[] = [
  { id: '1', name: 'Kano Rice Mills', category: 'Agriculture', status: 'Pending', investedAmount: 15000, currentReturn: 1250, progress: 65, iconName: 'agriculture', cycleDuration: '90 Days', startDate: 'Sep 01, 2023', maturityDate: 'Nov 30, 2023', payoutDate: 'Dec 03, 2023' },
  { id: '2', name: 'Aba Textile Co.', category: 'Manufacturing', status: 'Active', investedAmount: 8500, currentReturn: 980, progress: 82, iconName: 'checkroom', cycleDuration: '30 Days', startDate: 'Oct 01, 2023', maturityDate: 'Oct 31, 2023', payoutDate: 'Nov 02, 2023' },
  { id: '3', name: 'Lekki Tech Hub', category: 'Technology', status: 'Active', investedAmount: 22000, currentReturn: 2130, progress: 45, iconName: 'computer', cycleDuration: '60 Days', startDate: 'Sep 15, 2023', maturityDate: 'Nov 14, 2023', payoutDate: 'Nov 16, 2023' },
];

const EXPERT_GOALS: FinancialGoal[] = [
  { id: 'g1', name: 'New Car Fund', targetAmount: 25000, currentAmount: 15880, icon: 'directions_car', color: 'bg-blue-500', deadline: 'Dec 2024' },
  { id: 'g2', name: 'Wedding Savings', targetAmount: 40000, currentAmount: 12500, icon: 'favorite', color: 'bg-rose-500', deadline: 'Jun 2025' }
];

const EXPERT_ACTIVITIES: ActivityItem[] = [
  { id: 'a1', type: 'deposit', title: 'Wallet Deposit', description: 'Transfer from Chase Bank', amount: 5000, date: 'Today, 10:23 AM', status: 'completed' },
  { id: 'a2', type: 'yield', title: 'Interest Payout', description: 'Aba Textile Co. - Month 1', amount: 340.50, date: 'Yesterday', status: 'completed' },
  { id: 'a3', type: 'investment', title: 'Investment', description: 'Lekki Tech Hub - 60 Days', amount: -22000, date: 'Sep 15, 2023', status: 'completed' },
];

const EXPERT_CHART_DATA: ChartDataPoint[] = [
  { day: 'Mon', value: 80 }, { day: 'Tue', value: 120 }, { day: 'Wed', value: 90 },
  { day: 'Thu', value: 140 }, { day: 'Fri', value: 70 }, { day: 'Sat', value: 180 }, { day: 'Sun', value: 130 },
];

const INVESTOR_SAVINGS_PLANS: SavingsPlan[] = [
    {
        id: 'sp1',
        name: 'Emergency Fund',
        targetAmount: 100000,
        balance: 55000,
        tenorDays: 0,
        interestRate: 8.0,
        liquidityType: 'Flexible',
        autoSaveEnabled: true,
        contributionFrequency: 'Monthly',
        startDate: 'Aug 15, 2023',
        maturityDate: 'N/A',
        nextDepositDate: 'Oct 15, 2023',
        status: 'Active'
    },
    {
        id: 'sp2',
        name: 'Fixed Deposit (90 Days)',
        targetAmount: 50000,
        balance: 50000,
        tenorDays: 90,
        interestRate: 14.5,
        liquidityType: 'Locked',
        autoSaveEnabled: false,
        contributionFrequency: 'Custom',
        startDate: 'Sep 01, 2023',
        maturityDate: 'Nov 30, 2023',
        nextDepositDate: 'N/A',
        status: 'Active'
    }
];

// --- TAX MOCK DATA ---

export const TAX_PROFILE_MOCK: TaxProfile = {
    countryCode: 'NG',
    taxId: '23894021-0001',
    businessType: 'Sole Prop',
    vatRegistered: true,
    accountingBasis: 'Cash',
    optInAutoFile: true
};

export const TAX_TRANSACTIONS_MOCK: TaxTransaction[] = [
    { id: 'tx1', date: 'Oct 12, 2023', description: 'Sales - Electronics Batch A', amount: 450000, category: 'Sales', taxable: true, vatAmount: 33750, status: 'Auto-Classified', hasInvoice: true },
    { id: 'tx2', date: 'Oct 10, 2023', description: 'Shop Rent Payment', amount: -150000, category: 'Expense', taxable: false, vatAmount: 0, status: 'Verified', hasInvoice: true },
    { id: 'tx3', date: 'Oct 08, 2023', description: 'Generator Fuel', amount: -15000, category: 'Expense', taxable: true, vatAmount: 1125, status: 'Review Needed', hasInvoice: false },
    { id: 'tx4', date: 'Oct 05, 2023', description: 'Sales - Repairs Service', amount: 25000, category: 'Sales', taxable: true, vatAmount: 1875, status: 'Auto-Classified', hasInvoice: true },
];

export const TAX_FILINGS_MOCK: TaxFiling[] = [
    { id: 'f1', period: 'Sep 2023', taxType: 'VAT', amountDue: 45200, status: 'Filed', dateFiled: 'Oct 20, 2023' },
    { id: 'f2', period: 'Aug 2023', taxType: 'VAT', amountDue: 38500, status: 'Filed', dateFiled: 'Sep 18, 2023' },
    { id: 'f3', period: 'Q3 2023', taxType: 'Income', amountDue: 125000, status: 'Draft' },
];

// 1. FRESH USER (New Signup)
export const PROFILE_FRESH: UserProfile = {
    id: 'fresh_01',
    name: 'New User',
    email: 'user@example.com',
    tier: 'Bronze',
    joinDate: 'Just now',
    walletBalance: 0,
    totalInvested: 0,
    totalEarnings: 0,
    activeInvestmentsCount: 0,
    investments: [],
    activities: [],
    goals: [],
    chartData: [],
    savingsPlans: [],
    onboardingSteps: [
        { id: 's1', label: 'Verify Identity', isCompleted: false, action: ViewType.KYC, icon: 'badge' },
        { id: 's2', label: 'Add Payment Method', isCompleted: false, action: ViewType.PAYMENT_METHODS, icon: 'credit_card' },
        { id: 's3', label: 'Make First Deposit', isCompleted: false, action: ViewType.DASHBOARD, icon: 'account_balance_wallet' },
        { id: 's4', label: 'Invest in a Cluster', isCompleted: false, action: ViewType.EXPLORE, icon: 'rocket_launch' },
    ]
};

// 2. STARTER USER (Onboarding partially done)
export const PROFILE_STARTER: UserProfile = {
    id: 'start_01',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    tier: 'Silver',
    joinDate: '2 days ago',
    walletBalance: 500,
    totalInvested: 1000,
    totalEarnings: 12.50,
    activeInvestmentsCount: 1,
    investments: [EXPERT_INVESTMENTS[1]],
    activities: [EXPERT_ACTIVITIES[0], { ...EXPERT_ACTIVITIES[2], amount: -1000, description: 'First Investment' }],
    goals: [EXPERT_GOALS[0]],
    chartData: [
        { day: 'Mon', value: 0 }, { day: 'Tue', value: 0 }, { day: 'Wed', value: 2 },
        { day: 'Thu', value: 4 }, { day: 'Fri', value: 5 }, { day: 'Sat', value: 5 }, { day: 'Sun', value: 6 },
    ],
    savingsPlans: [],
    onboardingSteps: [
        { id: 's1', label: 'Verify Identity', isCompleted: true, action: ViewType.KYC, icon: 'badge' },
        { id: 's2', label: 'Add Payment Method', isCompleted: true, action: ViewType.PAYMENT_METHODS, icon: 'credit_card' },
        { id: 's3', label: 'Make First Deposit', isCompleted: true, action: ViewType.DASHBOARD, icon: 'account_balance_wallet' },
        { id: 's4', label: 'Invest in a Cluster', isCompleted: true, action: ViewType.EXPLORE, icon: 'rocket_launch' },
    ]
};

// 3. EXPERT USER (Fully loaded)
export const PROFILE_EXPERT: UserProfile = {
    id: 'expert_01',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    tier: 'Gold',
    joinDate: 'Jan 15, 2023',
    walletBalance: 3400520.00,
    totalInvested: 125430.00,
    totalEarnings: 15880.00,
    activeInvestmentsCount: 12,
    investments: EXPERT_INVESTMENTS,
    activities: EXPERT_ACTIVITIES,
    goals: EXPERT_GOALS,
    chartData: EXPERT_CHART_DATA,
    savingsPlans: INVESTOR_SAVINGS_PLANS,
    onboardingSteps: [
        { id: 's1', label: 'Verify Identity', isCompleted: true, action: ViewType.KYC, icon: 'badge' },
        { id: 's2', label: 'Add Payment Method', isCompleted: true, action: ViewType.PAYMENT_METHODS, icon: 'credit_card' },
        { id: 's3', label: 'Make First Deposit', isCompleted: true, action: ViewType.DASHBOARD, icon: 'account_balance_wallet' },
        { id: 's4', label: 'Invest in a Cluster', isCompleted: true, action: ViewType.EXPLORE, icon: 'rocket_launch' },
    ],
    taxProfile: TAX_PROFILE_MOCK // Expert has tax profile set up
};

// --- TRADER DATA ---

export const ACTIVE_LOAN: Loan = {
    id: 'l1',
    amount: 50000,
    collectionName: 'Computer Village Hub',
    durationDays: 30,
    startDate: 'Oct 01, 2023',
    dueDate: 'Oct 31, 2023',
    totalRepayment: 55000,
    amountPaid: 18330,
    dailyRepaymentAmount: 1833,
    status: 'Active',
    progress: 33.3
};

export const ESUSU_GROUPS: EsusuGroup[] = [
    {
        id: 'e1',
        name: 'Lagos Traders Circle',
        contributionAmount: 5000,
        frequency: 'Daily',
        membersCount: 10,
        myPosition: 4,
        payoutDate: 'Nov 12, 2023',
        totalSaved: 45000
    },
    {
        id: 'e2',
        name: 'Weekly Shop Owners',
        contributionAmount: 20000,
        frequency: 'Weekly',
        membersCount: 12,
        myPosition: 1,
        payoutDate: 'Oct 15, 2023',
        totalSaved: 220000
    }
];

export const SAVINGS_PLANS: SavingsPlan[] = [
    {
        id: 'sp1',
        name: 'Shop Rent 2024',
        targetAmount: 500000,
        balance: 125000,
        tenorDays: 180,
        interestRate: 12.0,
        liquidityType: 'Locked',
        autoSaveEnabled: true,
        contributionFrequency: 'Weekly',
        startDate: 'Sep 01, 2023',
        maturityDate: 'Feb 28, 2024',
        nextDepositDate: 'Oct 15, 2023',
        status: 'Active'
    },
    {
        id: 'sp2',
        name: 'New Generator',
        targetAmount: 150000,
        balance: 45000,
        tenorDays: 0,
        interestRate: 6.0,
        liquidityType: 'Flexible',
        autoSaveEnabled: false,
        contributionFrequency: 'Daily',
        startDate: 'Oct 01, 2023',
        maturityDate: 'N/A',
        nextDepositDate: 'Oct 14, 2023',
        status: 'Active'
    }
];

export const PROFILE_TRADER_NEW: TraderProfile = {
    id: 'trader_new',
    name: 'Chinedu Okeke',
    businessName: 'Okeke Electronics',
    email: 'chinedu@example.com',
    location: 'Lagos, Nigeria',
    kycStatus: 'None',
    creditScore: 0,
    walletBalance: 0,
    activeLoan: null,
    esusuGroups: [],
    savingsPlans: [],
    activities: [],
    onboardingSteps: [
        { id: 't1', label: 'Complete KYC', isCompleted: false, action: ViewType.KYC, icon: 'badge' },
        { id: 't2', label: 'Join a Collection', isCompleted: false, action: ViewType.TRADER_LOAN_APPLY, icon: 'storefront' },
        { id: 't3', label: 'Apply for First Loan', isCompleted: false, action: ViewType.TRADER_LOAN_APPLY, icon: 'request_quote' }
    ],
    assignedAgent: {
        name: "Agent Michael",
        phone: "+234 800 123 4567",
        photo: "https://picsum.photos/seed/agent1/200/200"
    }
};

export const PROFILE_TRADER_ACTIVE: TraderProfile = {
    id: 'trader_active',
    name: 'Bisi Adebayo',
    businessName: 'Bisi Textiles',
    email: 'bisi@example.com',
    location: 'Lagos, Nigeria',
    kycStatus: 'Verified',
    creditScore: 720,
    walletBalance: 12500,
    activeLoan: ACTIVE_LOAN,
    esusuGroups: ESUSU_GROUPS,
    savingsPlans: SAVINGS_PLANS,
    activities: [
        { id: 'ta1', type: 'repayment', title: 'Daily Loan Repayment', description: 'Computer Village Hub', amount: -1833, date: 'Today, 9:00 AM', status: 'completed' },
        { id: 'ta2', type: 'esusu_contribution', title: 'Esusu Contribution', description: 'Lagos Traders Circle', amount: -5000, date: 'Today, 8:30 AM', status: 'completed' },
        { id: 'ta3', type: 'savings_deposit', title: 'Savings Deposit', description: 'Shop Rent 2024', amount: -2500, date: 'Yesterday', status: 'completed' }
    ],
    onboardingSteps: [
         { id: 't1', label: 'Complete KYC', isCompleted: true, action: ViewType.KYC, icon: 'badge' },
         { id: 't2', label: 'Join a Collection', isCompleted: true, action: ViewType.TRADER_LOAN_APPLY, icon: 'storefront' },
         { id: 't3', label: 'Apply for First Loan', isCompleted: true, action: ViewType.TRADER_LOAN_APPLY, icon: 'request_quote' }
    ],
    taxProfile: TAX_PROFILE_MOCK, // Trader also has tax profile
    assignedAgent: {
        name: "Agent Michael",
        phone: "+234 800 123 4567",
        photo: "https://picsum.photos/seed/agent1/200/200"
    }
};

// --- AGENT DATA ---

export const MANAGED_TRADERS: ManagedTrader[] = [
    { id: 't1', name: 'Bisi Adebayo', businessName: 'Bisi Textiles', location: 'Lagos, Nigeria', status: 'Active', loanStatus: 'On Track', lastVisit: '2 days ago' },
    { id: 't2', name: 'Chinedu Okeke', businessName: 'Okeke Electronics', location: 'Lagos, Nigeria', status: 'Pending Verification', lastVisit: 'Today' },
    { id: 't3', name: 'Emmanuel Eze', businessName: 'Eze Hardware', location: 'Ojo, Lagos', status: 'Active', loanStatus: 'Late', lastVisit: '5 days ago' },
    { id: 't4', name: 'Grace Ojo', businessName: 'Grace Foods', location: 'Ikeja, Lagos', status: 'Active', loanStatus: 'On Track', lastVisit: '1 week ago' },
];

export const PROFILE_AGENT: AgentProfile = {
    id: 'agent_01',
    name: 'Agent Michael',
    region: 'Lagos Mainland',
    email: 'agent.michael@mix.com',
    walletBalance: 45000,
    commissionEarned: 125000,
    tradersCount: 15,
    repaymentRate: 94.5,
    managedTraders: MANAGED_TRADERS,
    activities: [
        { id: 'aa1', type: 'commission', title: 'Verification Bonus', description: 'Verified Chinedu Okeke', amount: 5000, date: 'Today, 11:30 AM', status: 'completed' },
        { id: 'aa2', type: 'commission', title: 'Repayment Commission', description: 'Bisi Textiles - Weekly', amount: 450, date: 'Yesterday', status: 'completed' }
    ],
    onboardingSteps: []
};

export const INVESTMENTS = EXPERT_INVESTMENTS; 
export const GOALS = EXPERT_GOALS;
export const ACTIVITIES = EXPERT_ACTIVITIES;
export const CHART_DATA = EXPERT_CHART_DATA;
