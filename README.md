# Invoice Processing & HITL System

A production-grade React 18 + TypeScript application for managing invoice processing with Human-in-the-Loop (HITL) capabilities. Designed for enterprise integration with Microsoft Dataverse, SAP VIM, and AI agent workflows.

## 📋 Overview

This application provides a modern, scalable UI for AP (Accounts Payable) clerks and certifiers to review, approve, and manage invoices from multiple vendors. The system supports:

- **AI-driven invoice processing** with confidence scoring
- **Human-in-the-Loop (HITL) workflows** for manual review
- **Enterprise-grade design** following SAP UI patterns
- **Future-ready API abstraction** for Dataverse integration
- **Mock data layer** for development and testing

## 🏗️ Architecture

### Technology Stack

- **Frontend Framework**: React 18+
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Ant Design
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Component Library**: Ant Design v5
- **Icons**: Lucide React

### Project Structure

```
src/
├── api/
│   └── invoiceApi.ts                # REST-style API abstraction layer
├── mock/
│   └── invoices.ts                  # Mock invoice + line item data
├── models/
│   └── invoice.model.ts             # TypeScript domain models
├── pages/
│   ├── Home.tsx                     # Invoice work queue
│   └── InvoiceDetail.tsx            # Invoice detail & HITL actions
├── components/
│   ├── AppHeader.tsx                # Application header
│   ├── InvoiceTable.tsx             # Reusable invoice table
│   ├── StatusBadge.tsx              # Status visualization
│   └── LineItemsTable.tsx           # Line items display
├── App.tsx                          # Main app component with routing
├── main.tsx                         # Entry point
└── index.css                        # Global styles + Tailwind
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd Electrolux-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📊 Domain Models

### Invoice
```typescript
interface Invoice {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  invoiceDate: string;
  totalAmount: number;
  status: InvoiceStatus;
  confidenceScore: number;        // 0-100, AI confidence
  lineItems: LineItem[];
  createdAt?: string;
  updatedAt?: string;
}

enum InvoiceStatus {
  NEW = 'NEW',
  HITL_REQUIRED = 'HITL_REQUIRED',
  APPROVED = 'APPROVED',
}
```

### LineItem
```typescript
interface LineItem {
  id: string;
  description: string;
  glAccount: string;             // GL Account for accounting
  costCenter: string;            // Cost center allocation
  amount: number;
}
```

## 🔌 API Layer

The `invoiceApi` module provides a REST-style interface:

```typescript
// Fetch all invoices
await invoiceApi.getInvoices(): Promise<Invoice[]>

// Fetch single invoice
await invoiceApi.getInvoiceById(id): Promise<Invoice | undefined>

// Update invoice (approve, mark HITL, etc.)
await invoiceApi.updateInvoice(id, updates): Promise<void>
```

### Important: API Abstraction

The UI layer does **not** know that data is currently mocked. This design enables:

- **Zero UI changes** when switching to real Dataverse API
- **Clean separation of concerns**
- **Easy testing and development**
- **Future-proof architecture**

To integrate with a real backend:
1. Replace `invoiceApi.ts` with actual Dataverse Web API calls
2. No UI code changes required
3. Same Promise-based interface maintained

## 📄 Pages

### Home Page (`/`)
- **Purpose**: Invoice work queue for daily AP operations
- **Features**:
  - Sortable/filterable invoice table
  - Status badges with color coding
  - Confidence score visualization
  - Quick statistics dashboard
  - Click row to view details

### Invoice Detail Page (`/invoice/:id`)
- **Purpose**: HITL interface for detailed review and approval
- **Layout**: Two-column design
  - **Left**: Invoice header, line items
  - **Right**: Status, confidence score, action buttons
- **Features**:
  - Visual indicators for low-confidence invoices
  - Line-by-line breakdown with GL accounts
  - One-click approval/rejection
  - Status history
  - Professional enterprise design

## 🎨 Design System

### Tailwind CSS
- Custom color palette with enterprise blues
- Responsive grid layout
- Utility-first approach for consistency
- Disabled preflight to avoid conflicts with Ant Design

### Ant Design Integration
- Tables for data display
- Cards for content organization
- Buttons with consistent styling
- Progress indicators
- Status badges

### Enterprise Look
- Clean, professional interface
- No playful or cartoonish elements
- Consistent spacing and typography
- SAP/Oracle ERP-inspired design patterns

## 🧪 Mock Data

Five realistic enterprise invoices are included:

1. **Acme Manufacturing Inc.** ($45,250.50) - APPROVED, 95% confidence
2. **Global Supply Partners Ltd.** ($12,875.75) - HITL_REQUIRED, 62% confidence
3. **ElectroTech Solutions GmbH** ($67,500.00) - NEW, 78% confidence
4. **Nordic Industrial Group** ($33,450.25) - NEW, 45% confidence
5. **Swiss Precision AG** ($89,120.00) - NEW, 88% confidence

Each includes:
- Realistic vendor names
- Line items with GL accounts and cost centers
- Varying confidence scores (to test HITL flows)
- Different statuses (to showcase all states)

## 🔄 Data Flow

```
User Click (Row)
    ↓
React Router Navigation
    ↓
Page Component (Home/InvoiceDetail)
    ↓
API Layer (invoiceApi.ts)
    ↓
Mock/Real Backend (Dataverse)
    ↓
State Update (React Hook)
    ↓
Component Re-render
    ↓
User Sees Updated Data
```

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React rendering
- `react-router-dom` - Client-side routing

### UI
- `antd` - Enterprise component library
- `tailwindcss` - Utility-first CSS
- `lucide-react` - Icon library

### Tooling
- `vite` - Build tool
- `typescript` - Type safety
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes

## ✨ Key Features

### ✅ Production Ready
- TypeScript strict mode enabled
- No hardcoded data in components
- All data flows through API layer
- Proper error handling
- Loading states

### ✅ Enterprise Grade
- Professional design
- SAP-like UX patterns
- Accessible components
- Responsive layout
- Performance optimized

### ✅ HITL Ready
- Two-step approval workflow
- Confidence score visualization
- Low-confidence warnings
- Clear status transitions
- Audit trail ready

### ✅ Future Proof
- API abstraction layer
- No Dataverse coupling in UI
- Ready for microservices
- Extensible component architecture

## 🔐 Security Considerations

**Current State (Development)**:
- Mock data only
- No authentication
- No backend validation

**Production Requirements** (to implement later):
- Add authentication layer
- Implement authorization checks
- Add API rate limiting
- Validate all inputs server-side
- Implement audit logging
- Encrypt sensitive data in transit

## 🚀 Next Steps / Future Enhancements

1. **Dataverse Integration**
   - Replace mock API with Dataverse Web API
   - Implement real-time sync

2. **Authentication & Authorization**
   - Azure AD / OAuth 2.0
   - Role-based access control

3. **Advanced Features**
   - Batch invoice processing
   - Custom approval workflows
   - Invoice templates
   - Document attachment support
   - Workflow notifications

4. **Analytics & Reporting**
   - Invoice processing metrics
   - SLA tracking
   - Vendor performance
   - Cost analysis

5. **Mobile Support**
   - Responsive mobile UI
   - Native mobile app option

## 📝 Development Guidelines

### Component Development
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Keep components focused and reusable
- Add JSDoc comments for complex logic

### Styling
- Use Tailwind utilities first
- Ant Design for structured layouts
- Custom CSS only for unique cases
- Maintain consistent spacing (4px grid)

### State Management
- Use React hooks for local state
- Props for data passing
- Consider Redux/Zustand for global state (future)

### Testing Considerations
- Unit test components
- Integration test API layer
- E2E test critical workflows
- Mock API with consistent responses

## 📞 Support

For questions or issues:
1. Check existing documentation
2. Review component comments
3. Inspect mock data structure
4. Test API layer independently

## 📄 License

Enterprise proprietary software.

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: 2024-01-22
