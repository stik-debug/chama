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

export interface PayoutRotation {
  position: number;
  memberId: string;
  memberName: string;
  scheduledDate: string;
  status: 'completed' | 'upcoming' | 'current';
  amount: number;
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

export const currentUser: Member = {
  id: 'm1',
  name: 'James Mwangi',
  phone: '+254712345678',
  role: 'member',
  joinDate: '2024-01-15',
  totalContributed: 145000,
  totalLoans: 50000,
  loanBalance: 25000,
  payoutPosition: 4,
  status: 'active',
};

export const groupInfo = {
  name: 'Umoja Welfare Group',
  type: 'merry-go-round',
  contributionAmount: 5000,
  frequency: 'monthly',
  totalMembers: 15,
  totalAssets: 2250000,
  defaultRate: 3.2,
  healthScore: 92,
  paybill: '247247',
  account: 'UMOJA001',
  createdDate: '2023-06-01',
  constitution: 'Uploaded',
};

export const members: Member[] = [
  { id: 'm1', name: 'James Mwangi', phone: '+254712345678', role: 'member', joinDate: '2024-01-15', totalContributed: 145000, totalLoans: 50000, loanBalance: 25000, payoutPosition: 4, status: 'active' },
  { id: 'm2', name: 'Mary Wanjiku', phone: '+254723456789', role: 'chairperson', joinDate: '2023-06-01', totalContributed: 300000, totalLoans: 100000, loanBalance: 0, payoutPosition: 1, status: 'active' },
  { id: 'm3', name: 'Peter Ochieng', phone: '+254734567890', role: 'treasurer', joinDate: '2023-06-01', totalContributed: 295000, totalLoans: 75000, loanBalance: 37500, payoutPosition: 2, status: 'active' },
  { id: 'm4', name: 'Grace Akinyi', phone: '+254745678901', role: 'secretary', joinDate: '2023-07-15', totalContributed: 275000, totalLoans: 0, loanBalance: 0, payoutPosition: 3, status: 'active' },
  { id: 'm5', name: 'David Kamau', phone: '+254756789012', role: 'member', joinDate: '2023-08-01', totalContributed: 250000, totalLoans: 30000, loanBalance: 0, payoutPosition: 5, status: 'active' },
  { id: 'm6', name: 'Faith Njeri', phone: '+254767890123', role: 'member', joinDate: '2023-09-01', totalContributed: 225000, totalLoans: 0, loanBalance: 0, payoutPosition: 6, status: 'active' },
  { id: 'm7', name: 'Samuel Kipchoge', phone: '+254778901234', role: 'member', joinDate: '2023-10-01', totalContributed: 200000, totalLoans: 60000, loanBalance: 60000, payoutPosition: 7, status: 'active' },
  { id: 'm8', name: 'Agnes Wambui', phone: '+254789012345', role: 'member', joinDate: '2023-11-01', totalContributed: 175000, totalLoans: 0, loanBalance: 0, payoutPosition: 8, status: 'active' },
  { id: 'm9', name: 'John Mutua', phone: '+254790123456', role: 'member', joinDate: '2024-01-01', totalContributed: 150000, totalLoans: 45000, loanBalance: 45000, payoutPosition: 9, status: 'active' },
  { id: 'm10', name: 'Lucy Adhiambo', phone: '+254701234567', role: 'member', joinDate: '2024-02-01', totalContributed: 125000, totalLoans: 0, loanBalance: 0, payoutPosition: 10, status: 'active' },
  { id: 'm11', name: 'Robert Njoroge', phone: '+254712345670', role: 'member', joinDate: '2024-03-01', totalContributed: 100000, totalLoans: 0, loanBalance: 0, payoutPosition: 11, status: 'active' },
  { id: 'm12', name: 'Esther Chebet', phone: '+254723456780', role: 'member', joinDate: '2024-04-01', totalContributed: 75000, totalLoans: 0, loanBalance: 0, payoutPosition: 12, status: 'active' },
];

export const contributions: Contribution[] = [
  { id: 'c1', memberId: 'm1', memberName: 'James Mwangi', amount: 5000, date: '2025-01-05', status: 'paid', method: 'M-Pesa', reference: 'SDG8X2K4L5' },
  { id: 'c2', memberId: 'm1', memberName: 'James Mwangi', amount: 5000, date: '2024-12-05', status: 'paid', method: 'M-Pesa', reference: 'SDF7X1K3L4' },
  { id: 'c3', memberId: 'm1', memberName: 'James Mwangi', amount: 5000, date: '2024-11-05', status: 'paid', method: 'M-Pesa', reference: 'SDE6X0K2L3' },
  { id: 'c4', memberId: 'm1', memberName: 'James Mwangi', amount: 5000, date: '2025-02-05', status: 'pending', method: '' },
  { id: 'c5', memberId: 'm2', memberName: 'Mary Wanjiku', amount: 5000, date: '2025-02-05', status: 'paid', method: 'M-Pesa', reference: 'SDH9X3K5L6' },
  { id: 'c6', memberId: 'm3', memberName: 'Peter Ochieng', amount: 5000, date: '2025-02-05', status: 'paid', method: 'M-Pesa', reference: 'SDI0X4K6L7' },
  { id: 'c7', memberId: 'm4', memberName: 'Grace Akinyi', amount: 5000, date: '2025-02-05', status: 'late', method: '' },
  { id: 'c8', memberId: 'm5', memberName: 'David Kamau', amount: 5000, date: '2025-02-05', status: 'paid', method: 'M-Pesa', reference: 'SDJ1X5K7L8' },
  { id: 'c9', memberId: 'm6', memberName: 'Faith Njeri', amount: 5000, date: '2025-02-05', status: 'pending', method: '' },
  { id: 'c10', memberId: 'm7', memberName: 'Samuel Kipchoge', amount: 5000, date: '2025-02-05', status: 'paid', method: 'M-Pesa', reference: 'SDK2X6K8L9' },
];

export const loans: Loan[] = [
  { id: 'l1', memberId: 'm1', memberName: 'James Mwangi', amount: 50000, purpose: 'School Fees', interestRate: 10, status: 'repaying', applicationDate: '2024-10-15', repaymentPeriod: 6, monthlyPayment: 9167, guarantors: ['Mary Wanjiku', 'Peter Ochieng'], balance: 25000 },
  { id: 'l2', memberId: 'm3', memberName: 'Peter Ochieng', amount: 75000, purpose: 'Business Capital', interestRate: 10, status: 'repaying', applicationDate: '2024-11-20', repaymentPeriod: 8, monthlyPayment: 10313, guarantors: ['James Mwangi', 'David Kamau'], balance: 37500 },
  { id: 'l3', memberId: 'm7', memberName: 'Samuel Kipchoge', amount: 60000, purpose: 'Medical', interestRate: 10, status: 'disbursed', applicationDate: '2025-01-10', repaymentPeriod: 6, monthlyPayment: 11000, guarantors: ['Mary Wanjiku', 'Grace Akinyi'], balance: 60000 },
  { id: 'l4', memberId: 'm9', memberName: 'John Mutua', amount: 45000, purpose: 'Home Improvement', interestRate: 10, status: 'pending', applicationDate: '2025-02-01', repaymentPeriod: 5, monthlyPayment: 9900, guarantors: ['James Mwangi'], balance: 45000 },
];

export const meetings: Meeting[] = [
  { id: 'mt1', title: 'February Monthly Meeting', date: '2025-02-15', time: '14:00', location: 'Mary\'s House, Kasarani', notes: 'Monthly contribution collection, loan applications review, AGM planning', attendees: 12, votes: [{ id: 'v1', question: 'Increase monthly contribution to KSh 7,000?', yes: 8, no: 4, abstain: 2, status: 'failed', deadline: '2025-02-15' }] },
  { id: 'mt2', title: 'Annual General Meeting', date: '2025-03-01', time: '10:00', location: 'Community Hall, Nairobi', notes: 'Annual report presentation, election of new officials, investment review', attendees: 0 },
  { id: 'mt3', title: 'Emergency Meeting', date: '2025-01-20', time: '18:00', location: 'Zoom Call', notes: 'Discussion on late contributions and new member onboarding', attendees: 14 },
];

export const payoutRotation: PayoutRotation[] = [
  { position: 1, memberId: 'm2', memberName: 'Mary Wanjiku', scheduledDate: '2024-12-15', status: 'completed', amount: 75000 },
  { position: 2, memberId: 'm3', memberName: 'Peter Ochieng', scheduledDate: '2025-01-15', status: 'completed', amount: 75000 },
  { position: 3, memberId: 'm4', memberName: 'Grace Akinyi', scheduledDate: '2025-02-15', status: 'current', amount: 75000 },
  { position: 4, memberId: 'm1', memberName: 'James Mwangi', scheduledDate: '2025-03-15', status: 'upcoming', amount: 75000 },
  { position: 5, memberId: 'm5', memberName: 'David Kamau', scheduledDate: '2025-04-15', status: 'upcoming', amount: 75000 },
  { position: 6, memberId: 'm6', memberName: 'Faith Njeri', scheduledDate: '2025-05-15', status: 'upcoming', amount: 75000 },
  { position: 7, memberId: 'm7', memberName: 'Samuel Kipchoge', scheduledDate: '2025-06-15', status: 'upcoming', amount: 75000 },
  { position: 8, memberId: 'm8', memberName: 'Agnes Wambui', scheduledDate: '2025-07-15', status: 'upcoming', amount: 75000 },
];

export const chatMessages: ChatMessage[] = [
  { id: 'ch1', senderId: 'm2', senderName: 'Mary Wanjiku', message: 'Karibuni sana kwa meeting ya mwezi huu! Contribution ya Februari inatakiwa kufika ifikapo tarehe 5.', timestamp: '2025-02-01 09:00', isAnnouncement: true },
  { id: 'ch2', senderId: 'm3', senderName: 'Peter Ochieng', message: 'Asante chairperson. Kumbuka tumeongeza fine ya late contribution hadi KSh 500.', timestamp: '2025-02-01 09:15', isAnnouncement: false },
  { id: 'ch3', senderId: 'm5', senderName: 'David Kamau', message: 'Nimeshalipa contribution yangu. M-Pesa confirmation: SDB7X9K2L1', timestamp: '2025-02-03 14:30', isAnnouncement: false },
  { id: 'ch4', senderId: 'm1', senderName: 'James Mwangi', message: 'Niko sawa, contribution yangu itafika leo jioni insha Allah', timestamp: '2025-02-03 15:00', isAnnouncement: false },
  { id: 'ch5', senderId: 'm2', senderName: 'Mary Wanjiku', message: 'Kumbuka: Meeting ya March 1st itakuwa Community Hall. Tafadhali confirm attendance yako.', timestamp: '2025-02-10 08:00', isAnnouncement: true },
];

export const fines: Fine[] = [
  { id: 'f1', memberId: 'm4', memberName: 'Grace Akinyi', reason: 'Late contribution - January', amount: 500, date: '2025-01-10', status: 'unpaid' },
  { id: 'f2', memberId: 'm9', memberName: 'John Mutua', reason: 'Absent from January meeting', amount: 300, date: '2025-01-20', status: 'paid' },
  { id: 'f3', memberId: 'm7', memberName: 'Samuel Kipchoge', reason: 'Late contribution - December', amount: 500, date: '2024-12-10', status: 'paid' },
];

export const auditTrail: AuditEntry[] = [
  { id: 'a1', type: 'contribution', description: 'James Mwangi contributed KSh 5,000', amount: 5000, timestamp: '2025-01-05 14:23', initiatedBy: 'James Mwangi' },
  { id: 'a2', type: 'loan', description: 'John Mutua applied for KSh 45,000 loan', amount: 45000, timestamp: '2025-02-01 10:15', initiatedBy: 'John Mutua' },
  { id: 'a3', type: 'payout', description: 'Peter Ochieng received payout of KSh 75,000', amount: 75000, timestamp: '2025-01-15 16:00', initiatedBy: 'Mary Wanjiku' },
  { id: 'a4', type: 'fine', description: 'Grace Akinyi fined KSh 500 for late contribution', amount: 500, timestamp: '2025-01-10 09:30', initiatedBy: 'Peter Ochieng' },
  { id: 'a5', type: 'vote', description: 'Vote: Increase contribution to KSh 7,000 - Failed', timestamp: '2025-02-15 15:00', initiatedBy: 'Mary Wanjiku' },
  { id: 'a6', type: 'member', description: 'Esther Chebet joined the group', timestamp: '2024-04-01 11:00', initiatedBy: 'Grace Akinyi' },
];
