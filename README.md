# ChamaConnect - Chama Management Platform 🇰🇪

A comprehensive mobile-first Chama (investment/savings group) management platform built for the Kenyan market.

![ChamaConnect](https://img.shields.io/badge/Platform-Mobile--First-emerald)
![Language](https://img.shields.io/badge/Language-EN%20%7C%20Kiswahili-blue)
![M-Pesa](https://img.shields.io/badge/Payments-M--Pesa-green)

## 🌟 Features

### Core Functionality
- **Merry-Go-Round (Chama)**: Automated rotation scheduling with payout order management
- **Table Banking**: Internal lending with guarantor system and configurable interest rates
- **M-Pesa Integration**: STK Push payments via Daraja API (Paybill/Till)
- **Real-Time Ledger**: Immutable transaction logging with full audit trail
- **Group Governance**: In-app voting, meeting management, and digital minutes

### User Experience
- **Bilingual UI**: Full English and Kiswahili support
- **Mobile-First**: Optimized for low-end Android devices on 3G/4G
- **Offline-First**: Cached balances and ledger view without connectivity
- **USSD Fallback**: `*384*22#` for feature-phone users
- **SMS Notifications**: Africa's Talking API integration for contribution reminders

### Financial Features
- Automated contribution reminders (SMS + Push)
- Fines/penalties engine for late contributions
- Loan application workflow with guarantor system
- Multi-signature approval for large withdrawals
- Downloadable financial statements (PDF)

### Trust & Security
- KYC verification via Smile ID / IPRS
- Biometric/PIN app lock
- End-to-end encrypted data
- SASRA-aligned reporting for SACCO conversion
- Full audit trail visible to all members

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Context API
- **Mobile**: Mobile-first responsive design (PWA-ready)
- **Payment**: Safaricom Daraja API (M-Pesa)
- **SMS**: Africa's Talking API
- **KYC**: Smile ID / IPRS

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## 📱 Screens

| Screen | Description |
|--------|-------------|
| Login/Register | Phone-based auth with OTP + KYC |
| Dashboard | Overview of contributions, loans, rotation |
| Contributions | Full ledger with filter and M-Pesa pay |
| Loans | Apply, track, and manage group loans |
| Meetings | Schedule meetings with voting |
| Members | View all group members and roles |
| Rotation | Merry-go-round payout schedule |
| Chat | Group announcements and messaging |
| Reports | Financial statements and exports |
| Settings | Language, security, notifications |

## 🇰🇪 Kenya-Specific Design

- **M-Pesa First**: Primary payment rail via STK Push
- **Low-Data Optimized**: Works on slow 3G connections
- **Feature Phone Support**: USSD menu for non-smartphone users
- **Kiswahili UI**: Not just translated, but culturally adapted
- **Trust Signals**: Bank-like design, not fintech-flashy
- **SASRA Ready**: Designed for future SACCO formalization

## 📋 User Roles

| Role | Permissions |
|------|-------------|
| Chairperson | Full admin, multi-sig approval |
| Treasurer | Financial management, reports |
| Secretary | Meetings, minutes, voting |
| Member | View ledger, contribute, apply loans |

## 💰 Monetization Model

- **Freemium**: Free for groups under 15 members
- **Subscription**: Per-group monthly fee for larger groups
- **Premium Tier**: SACCO conversion support, tax exports
- **Minimal Transaction Fees**: Absorbed into float interest

## 📄 License

MIT License - Built with ❤️ in Kenya
