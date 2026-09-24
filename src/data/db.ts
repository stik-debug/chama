// LocalStorage-based database for the app
import { Member, Contribution, Loan, Meeting, ChatMessage, Fine, AuditEntry, PayoutRotation } from './types';

const STORAGE_KEYS = {
  MEMBERS: 'chama_members',
  CONTRIBUTIONS: 'chama_contributions',
  LOANS: 'chama_loans',
  MEETINGS: 'chama_meetings',
  MESSAGES: 'chama_messages',
  FINES: 'chama_fines',
  AUDIT: 'chama_audit',
  ROTATION: 'chama_rotation',
  CURRENT_USER: 'chama_current_user',
  AUTH: 'chama_auth',
  GROUP: 'chama_group',
};

function load<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Initial seed data
const initialMembers: Member[] = [
  { id: 'm1', name: 'James Mwangi', phone: '+254712345678', role: 'member', joinDate: '2024-01-15', totalContributed: 145000, totalLoans: 50000, loanBalance: 25000, payoutPosition: 4, status: 'active', avatar: 'JM' },
  { id: 'm2', name: 'Mary Wanjiku', phone: '+254723456789', role: 'chairperson', joinDate: '2023-06-01', totalContributed: 300000, totalLoans: 100000, loanBalance: 0, payoutPosition: 1, status: 'active', avatar: 'MW' },
  { id: 'm3', name: 'Peter Ochieng', phone: '+254734567890', role: 'treasurer', joinDate: '2023-06-01', totalContributed: 295000, totalLoans: 75000, loanBalance: 37500, payoutPosition: 2, status: 'active', avatar: 'PO' },
  { id: 'm4', name: 'Grace Akinyi', phone: '+254745678901', role: 'secretary', joinDate: '2023-07-15', totalContributed: 275000, totalLoans: 0, loanBalance: 0, payoutPosition: 3, status: 'active', avatar: 'GA' },
  { id: 'm5', name: 'David Kamau', phone: '+254756789012', role: 'member', joinDate: '2023-08-01', totalContributed: 250000, totalLoans: 30000, loanBalance: 0, payoutPosition: 5, status: 'active', avatar: 'DK' },
  { id: 'm6', name: 'Faith Njeri', phone: '+254767890123', role: 'member', joinDate: '2023-09-01', totalContributed: 225000, totalLoans: 0, loanBalance: 0, payoutPosition: 6, status: 'active', avatar: 'FN' },
  { id: 'm7', name: 'Samuel Kipchoge', phone: '+254778901234', role: 'member', joinDate: '2023-10-01', totalContributed: 200000, totalLoans: 60000, loanBalance: 60000, payoutPosition: 7, status: 'active', avatar: 'SK' },
  { id: 'm8', name: 'Agnes Wambui', phone: '+254789012345', role: 'member', joinDate: '2023-11-01', totalContributed: 175000, totalLoans: 0, loanBalance: 0, payoutPosition: 8, status: 'active', avatar: 'AW' },
];

const initialContributions: Contribution[] = [
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

const initialLoans: Loan[] = [
  { id: 'l1', memberId: 'm1', memberName: 'James Mwangi', amount: 50000, purpose: 'School Fees', interestRate: 10, status: 'repaying', applicationDate: '2024-10-15', repaymentPeriod: 6, monthlyPayment: 9167, guarantors: ['Mary Wanjiku', 'Peter Ochieng'], balance: 25000 },
  { id: 'l2', memberId: 'm3', memberName: 'Peter Ochieng', amount: 75000, purpose: 'Business Capital', interestRate: 10, status: 'repaying', applicationDate: '2024-11-20', repaymentPeriod: 8, monthlyPayment: 10313, guarantors: ['James Mwangi', 'David Kamau'], balance: 37500 },
  { id: 'l3', memberId: 'm7', memberName: 'Samuel Kipchoge', amount: 60000, purpose: 'Medical', interestRate: 10, status: 'disbursed', applicationDate: '2025-01-10', repaymentPeriod: 6, monthlyPayment: 11000, guarantors: ['Mary Wanjiku', 'Grace Akinyi'], balance: 60000 },
  { id: 'l4', memberId: 'm5', memberName: 'David Kamau', amount: 45000, purpose: 'Home Improvement', interestRate: 10, status: 'pending', applicationDate: '2025-02-01', repaymentPeriod: 5, monthlyPayment: 9900, guarantors: ['James Mwangi'], balance: 45000 },
];

const initialMeetings: Meeting[] = [
  { id: 'mt1', title: 'February Monthly Meeting', date: '2025-02-15', time: '14:00', location: "Mary's House, Kasarani", notes: 'Monthly contribution collection, loan applications review, AGM planning', attendees: 12, votes: [{ id: 'v1', question: 'Increase monthly contribution to KSh 7,000?', yes: 8, no: 4, abstain: 2, status: 'failed', deadline: '2025-02-15' }] },
  { id: 'mt2', title: 'Annual General Meeting', date: '2025-03-01', time: '10:00', location: 'Community Hall, Nairobi', notes: 'Annual report presentation, election of new officials, investment review', attendees: 0 },
];

const initialMessages: ChatMessage[] = [
  { id: 'ch1', senderId: 'm2', senderName: 'Mary Wanjiku', message: 'Karibuni sana kwa meeting ya mwezi huu! Contribution ya Februari inatakiwa kufika ifikapo tarehe 5.', timestamp: '2025-02-01 09:00', isAnnouncement: true },
  { id: 'ch2', senderId: 'm3', senderName: 'Peter Ochieng', message: 'Asante chairperson. Kumbuka tumeongeza fine ya late contribution hadi KSh 500.', timestamp: '2025-02-01 09:15', isAnnouncement: false },
  { id: 'ch3', senderId: 'm5', senderName: 'David Kamau', message: 'Nimeshalipa contribution yangu. M-Pesa confirmation: SDB7X9K2L1', timestamp: '2025-02-03 14:30', isAnnouncement: false },
  { id: 'ch4', senderId: 'm1', senderName: 'James Mwangi', message: 'Niko sawa, contribution yangu itafika leo jioni insha Allah', timestamp: '2025-02-03 15:00', isAnnouncement: false },
  { id: 'ch5', senderId: 'm2', senderName: 'Mary Wanjiku', message: 'Kumbuka: Meeting ya March 1st itakuwa Community Hall. Tafadhali confirm attendance yako.', timestamp: '2025-02-10 08:00', isAnnouncement: true },
];

const initialFines: Fine[] = [
  { id: 'f1', memberId: 'm4', memberName: 'Grace Akinyi', reason: 'Late contribution - January', amount: 500, date: '2025-01-10', status: 'unpaid' },
  { id: 'f2', memberId: 'm5', memberName: 'David Kamau', reason: 'Absent from January meeting', amount: 300, date: '2025-01-20', status: 'paid' },
];

const initialRotation: PayoutRotation[] = [
  { position: 1, memberId: 'm2', memberName: 'Mary Wanjiku', scheduledDate: '2024-12-15', status: 'completed', amount: 40000 },
  { position: 2, memberId: 'm3', memberName: 'Peter Ochieng', scheduledDate: '2025-01-15', status: 'completed', amount: 40000 },
  { position: 3, memberId: 'm4', memberName: 'Grace Akinyi', scheduledDate: '2025-02-15', status: 'current', amount: 40000 },
  { position: 4, memberId: 'm1', memberName: 'James Mwangi', scheduledDate: '2025-03-15', status: 'upcoming', amount: 40000 },
  { position: 5, memberId: 'm5', memberName: 'David Kamau', scheduledDate: '2025-04-15', status: 'upcoming', amount: 40000 },
  { position: 6, memberId: 'm6', memberName: 'Faith Njeri', scheduledDate: '2025-05-15', status: 'upcoming', amount: 40000 },
  { position: 7, memberId: 'm7', memberName: 'Samuel Kipchoge', scheduledDate: '2025-06-15', status: 'upcoming', amount: 40000 },
  { position: 8, memberId: 'm8', memberName: 'Agnes Wambui', scheduledDate: '2025-07-15', status: 'upcoming', amount: 40000 },
];

const initialAudit: AuditEntry[] = [
  { id: 'a1', type: 'contribution', description: 'James Mwangi contributed KSh 5,000', amount: 5000, timestamp: '2025-01-05 14:23', initiatedBy: 'James Mwangi' },
  { id: 'a2', type: 'loan', description: 'David Kamau applied for KSh 45,000 loan', amount: 45000, timestamp: '2025-02-01 10:15', initiatedBy: 'David Kamau' },
  { id: 'a3', type: 'payout', description: 'Peter Ochieng received payout of KSh 40,000', amount: 40000, timestamp: '2025-01-15 16:00', initiatedBy: 'Mary Wanjiku' },
  { id: 'a4', type: 'fine', description: 'Grace Akinyi fined KSh 500 for late contribution', amount: 500, timestamp: '2025-01-10 09:30', initiatedBy: 'Peter Ochieng' },
  { id: 'a5', type: 'vote', description: 'Vote: Increase contribution to KSh 7,000 - Failed', timestamp: '2025-02-15 15:00', initiatedBy: 'Mary Wanjiku' },
];

// Initialize database with seed data if empty
export function initDatabase() {
  if (!localStorage.getItem(STORAGE_KEYS.MEMBERS)) {
    save(STORAGE_KEYS.MEMBERS, initialMembers);
    save(STORAGE_KEYS.CONTRIBUTIONS, initialContributions);
    save(STORAGE_KEYS.LOANS, initialLoans);
    save(STORAGE_KEYS.MEETINGS, initialMeetings);
    save(STORAGE_KEYS.MESSAGES, initialMessages);
    save(STORAGE_KEYS.FINES, initialFines);
    save(STORAGE_KEYS.ROTATION, initialRotation);
    save(STORAGE_KEYS.AUDIT, initialAudit);
    save(STORAGE_KEYS.GROUP, {
      name: 'Umoja Welfare Group',
      type: 'merry-go-round',
      contributionAmount: 5000,
      frequency: 'monthly',
      paybill: '247247',
      account: 'UMOJA001',
      healthScore: 92,
      defaultRate: 3.2,
    });
  }
}

// CRUD Operations
export const db = {
  // Members
  getMembers: (): Member[] => load(STORAGE_KEYS.MEMBERS, initialMembers),
  getMember: (id: string): Member | undefined => db.getMembers().find(m => m.id === id),
  updateMember: (id: string, updates: Partial<Member>) => {
    const members = db.getMembers();
    const idx = members.findIndex(m => m.id === id);
    if (idx >= 0) {
      members[idx] = { ...members[idx], ...updates };
      save(STORAGE_KEYS.MEMBERS, members);
    }
  },
  
  // Contributions
  getContributions: (): Contribution[] => load(STORAGE_KEYS.CONTRIBUTIONS, initialContributions),
  addContribution: (c: Contribution) => {
    const contributions = db.getContributions();
    contributions.unshift(c);
    save(STORAGE_KEYS.CONTRIBUTIONS, contributions);
    // Update member total
    const member = db.getMember(c.memberId);
    if (member) {
      db.updateMember(c.memberId, { totalContributed: member.totalContributed + c.amount });
    }
    // Add audit entry
    db.addAudit({
      id: 'a' + Date.now(),
      type: 'contribution',
      description: `${c.memberName} contributed KSh ${c.amount.toLocaleString()}`,
      amount: c.amount,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      initiatedBy: c.memberName,
    });
  },
  
  // Loans
  getLoans: (): Loan[] => load(STORAGE_KEYS.LOANS, initialLoans),
  addLoan: (loan: Loan) => {
    const loans = db.getLoans();
    loans.unshift(loan);
    save(STORAGE_KEYS.LOANS, loans);
    db.addAudit({
      id: 'a' + Date.now(),
      type: 'loan',
      description: `${loan.memberName} applied for KSh ${loan.amount.toLocaleString()} loan`,
      amount: loan.amount,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      initiatedBy: loan.memberName,
    });
  },
  updateLoan: (id: string, updates: Partial<Loan>) => {
    const loans = db.getLoans();
    const idx = loans.findIndex(l => l.id === id);
    if (idx >= 0) {
      loans[idx] = { ...loans[idx], ...updates };
      save(STORAGE_KEYS.LOANS, loans);
    }
  },
  
  // Meetings
  getMeetings: (): Meeting[] => load(STORAGE_KEYS.MEETINGS, initialMeetings),
  addMeeting: (m: Meeting) => {
    const meetings = db.getMeetings();
    meetings.unshift(m);
    save(STORAGE_KEYS.MEETINGS, meetings);
  },
  
  // Messages
  getMessages: (): ChatMessage[] => load(STORAGE_KEYS.MESSAGES, initialMessages),
  addMessage: (msg: ChatMessage) => {
    const messages = db.getMessages();
    messages.push(msg);
    save(STORAGE_KEYS.MESSAGES, messages);
  },
  
  // Fines
  getFines: (): Fine[] => load(STORAGE_KEYS.FINES, initialFines),
  addFine: (f: Fine) => {
    const fines = db.getFines();
    fines.unshift(f);
    save(STORAGE_KEYS.FINES, fines);
  },
  
  // Rotation
  getRotation: (): PayoutRotation[] => load(STORAGE_KEYS.ROTATION, initialRotation),
  
  // Audit
  getAudit: (): AuditEntry[] => load(STORAGE_KEYS.AUDIT, initialAudit),
  addAudit: (entry: AuditEntry) => {
    const audit = db.getAudit();
    audit.unshift(entry);
    save(STORAGE_KEYS.AUDIT, audit);
  },
  
  // Group
  getGroup: () => load(STORAGE_KEYS.GROUP, {
    name: 'Umoja Welfare Group',
    type: 'merry-go-round',
    contributionAmount: 5000,
    frequency: 'monthly',
    paybill: '247247',
    account: 'UMOJA001',
    healthScore: 92,
    defaultRate: 3.2,
  }),
  
  // Auth
  isAuthenticated: (): boolean => load(STORAGE_KEYS.AUTH, false),
  setAuth: (val: boolean) => save(STORAGE_KEYS.AUTH, val),
  getCurrentUser: (): Member | null => load(STORAGE_KEYS.CURRENT_USER, null),
  setCurrentUser: (user: Member) => save(STORAGE_KEYS.CURRENT_USER, user),
  
  // Reset (for demo)
  reset: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    initDatabase();
  },
};
