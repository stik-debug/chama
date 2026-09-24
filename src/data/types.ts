export interface Member {
  id: string;
  name: string;
  phone: string;
  role: 'chairperson' | 'treasurer' | 'secretary' | 'member';
  joinDate: string;
  totalContributed: number;
  totalLoans: number;
  loanBalance: number;
  payoutPosition: number;
  status: 'active' | 'inactive';
  avatar: string;
}

export interface Contribution {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'late';
  method: string;
  reference?: string;
}

export interface Loan {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  purpose: string;
  interestRate: number;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'repaying' | 'completed';
  applicationDate: string;
  repaymentPeriod: number;
  monthlyPayment: number;
  guarantors: string[];
  balance: number;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  attendees: number;
  votes?: Vote[];
}

export interface Vote {
  id: string;
  question: string;
  yes: number;
  no: number;
  abstain: number;
  status: 'active' | 'passed' | 'failed';
  deadline: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isAnnouncement: boolean;
}

export interface Fine {
  id: string;
  memberId: string;
  memberName: string;
  reason: string;
  amount: number;
  date: string;
  status: 'paid' | 'unpaid';
}

export interface AuditEntry {
  id: string;
  type: 'contribution' | 'loan' | 'payout' | 'fine' | 'vote' | 'member';
  description: string;
  amount?: number;
  timestamp: string;
  initiatedBy: string;
}

export interface PayoutRotation {
  position: number;
  memberId: string;
  memberName: string;
  scheduledDate: string;
  status: 'completed' | 'upcoming' | 'current';
  amount: number;
}

export interface GroupInfo {
  name: string;
  type: string;
  contributionAmount: number;
  frequency: string;
  paybill: string;
  account: string;
  healthScore: number;
  defaultRate: number;
}
