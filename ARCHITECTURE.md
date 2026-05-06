# Technical Architecture Document

## System Overview

The Invoice Processing & HITL System is a modern, enterprise-grade React 18 application designed for managing invoice processing workflows with AI-driven confidence scoring and Human-in-the-Loop capabilities.

## 🏗️ Architecture Pattern

### Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                       │
│  (React Components, Pages, Styling)                      │
│  ├── Pages (Home, InvoiceDetail)                        │
│  ├── Components (Table, Badge, Headers)                 │
│  └── Styling (Tailwind CSS, Ant Design)                 │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                   │
│  (React Hooks, State Management)                        │
│  ├── useEffect for data loading                         │
│  ├── useState for local state                           │
│  └── Custom hooks (if needed)                           │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                  DATA ACCESS LAYER                        │
│  (API Abstraction, Future Dataverse)                    │
│  ├── invoiceApi.ts (Promise-based)                      │
│  └── Mock data for development                          │
└─────────────────────────────────────────────────────────┘
```

## 📦 Module Responsibilities

### api/ - Data Access Layer
```typescript
// Purpose: Simulate REST API calls
// Pattern: Promise-based for universal compatibility
// Design: Can be replaced with Dataverse Web API

invoiceApi.getInvoices()           // GET /api/invoices
invoiceApi.getInvoiceById(id)      // GET /api/invoices/{id}
invoiceApi.updateInvoice(id, {})   // PATCH /api/invoices/{id}
```

**Key Principle**: UI never knows this is mocked. Dataverse integration = drop-in replacement.

### models/ - Domain Models
```typescript
// Strong TypeScript interfaces
// Single source of truth for data shapes
// Enables type-safe development
// No runtime overhead

Invoice          // Complete invoice with line items
LineItem         // Individual line item
InvoiceStatus    // Enum for status values
InvoiceUpdatePayload  // Partial updates
```

### mock/ - Development Data
```typescript
// 5 realistic enterprise invoices
// Varying confidence scores (testing HITL)
// Different statuses (testing workflows)
// Realistic GL accounts and cost centers
```

### components/ - Reusable UI Components
```
StatusBadge         → Status visualization with color coding
AppHeader          → Top navigation and branding
InvoiceTable       → Sortable/filterable table display
LineItemsTable     → Line items grid with totals
```

**Pattern**: Each component:
- Takes data as props
- Handles its own presentation logic
- Calls parent callbacks for actions
- No direct API calls

### pages/ - Page-Level Components
```
Home               → Work queue (list view)
InvoiceDetail      → Detail view (edit + approve)
```

**Pattern**: Each page:
- Manages its own data fetching
- Orchestrates components
- Handles routing logic
- Makes API calls

### App.tsx - Routing
```typescript
// React Router v6 configuration
// Two main routes:
// / → Home (work queue)
// /invoice/:id → InvoiceDetail (HITL)
```

## 🔄 Data Flow

### Scenario: Load Invoice List

```
User opens app
    ↓
Home component mounts
    ↓
useEffect() runs
    ↓
invoiceApi.getInvoices() called
    ↓
Mock data returned (simulated delay)
    ↓
setState(invoices)
    ↓
InvoiceTable re-renders with data
```

### Scenario: Approve Invoice

```
User clicks "Approve" button
    ↓
handleApprove() called
    ↓
invoiceApi.updateInvoice(id, { status: APPROVED })
    ↓
Mock update executed
    ↓
setInvoice({ ...updated })
    ↓
Component re-renders with new status
    ↓
Success message displayed
```

## 🎯 Key Architectural Decisions

### 1. API Abstraction Layer
**Decision**: Separate API calls into `invoiceApi.ts`

**Rationale**:
- UI remains agnostic to data source
- Easy to swap mock → real API
- Enables consistent error handling
- Allows centralized API logging

**Later**: Replace with Dataverse Web API without UI changes

### 2. TypeScript Strict Mode
**Decision**: Enable strict mode in `tsconfig.json`

**Rationale**:
- Catches type errors early
- Improves code reliability
- Better IDE support
- Enterprise best practice

**Trade-off**: Requires more typing, worth it for scale

### 3. Tailwind + Ant Design
**Decision**: Combine Tailwind (layout) + Ant Design (components)

**Rationale**:
- Tailwind for responsive, custom layouts
- Ant Design for enterprise components
- Professional, consistent appearance
- Preflight disabled to prevent conflicts

**Note**: Tailwind preflight disabled in config

### 4. Mock Data in Development
**Decision**: Use static mock objects, not JSON files

**Rationale**:
- No extra build artifacts
- Type-safe mock data
- Easy to modify for testing
- Simulates network delay

**Later**: Replace with real API calls

### 5. React Router v6
**Decision**: Use React Router 6 for navigation

**Rationale**:
- Modern routing API
- Built-in error handling
- Nested route support
- Standard practice

## 📊 State Management Strategy

### Current (Local State)
```typescript
// Page-level state with React hooks
const [invoices, setInvoices] = useState<Invoice[]>([]);
const [loading, setLoading] = useState(false);
```

### Future (Global State - if needed)
```typescript
// Option 1: Redux (enterprise scale)
// Option 2: Zustand (lightweight)
// Option 3: Context API (simple)

// Choose when needed, not prematurely
```

**Current design** supports easy migration to global state without refactoring.

## 🔌 Integration Points

### 1. Dataverse Web API (Future)
Replace `invoiceApi.ts`:
```typescript
// Old: Mock API
// New: Dataverse REST calls
const response = await fetch(
  `${DATAVERSE_URL}/api/data/v9.2/invoices`,
  { headers: { Authorization: `Bearer ${token}` } }
);
```

### 2. Authentication (Future)
Add to `App.tsx`:
```typescript
// Azure AD or OAuth 2.0
// Route protection
// Token management
```

### 3. Error Handling (Future)
Enhance in `invoiceApi.ts`:
```typescript
// Standardized error responses
// Retry logic
// Error logging/monitoring
```

## 📈 Performance Considerations

### Current Optimizations
- ✅ Functional components (React fiber)
- ✅ Memoized callbacks (if needed)
- ✅ Lazy loading not needed (small app)
- ✅ Vite for fast builds

### Scalability Strategy
```
Dev          → Current setup (5 invoices)
               ↓
QA/Staging   → 100+ invoices
               • Pagination (handled by Ant Design)
               • Search/filter
               ↓
Production   → Thousands of invoices
               • Virtual scrolling (react-window)
               • Pagination required
               • Caching strategy
               • API request optimization
```

## 🛡️ Security Posture

### Current State
```
✅ No authentication required (development)
✅ No authorization checks (development)
✅ TypeScript type safety
✅ No hardcoded secrets
```

### Production Requirements
```
🔒 Add Azure AD / OAuth 2.0
🔒 Implement role-based access control
🔒 Validate all inputs
🔒 Implement CORS properly
🔒 Add API rate limiting
🔒 Encrypt sensitive data in transit
🔒 Content Security Policy headers
```

## 📋 Component Hierarchy

```
App (routing)
├── AppHeader (static)
│   └── Links to Home, Status indicator
│
├── Home page
│   ├── Statistics cards
│   └── InvoiceTable
│       └── StatusBadge components
│
└── InvoiceDetail page
    ├── Invoice header info
    ├── LineItemsTable
    │   └── GL account display
    └── HITL Actions panel
        ├── Confidence score
        ├── Approve button
        └── Mark HITL button
```

## 🚀 Deployment Architecture

### Development
```
npm run dev → Vite dev server → http://localhost:3000
```

### Production Build
```
npm run build → dist/ folder → Ready for deployment
```

### Hosting Options
```
1. Static Hosting (recommended)
   • AWS S3 + CloudFront
   • Azure Static Web Apps
   • Netlify
   • Vercel

2. Traditional Hosting
   • Apache / Nginx
   • Docker container
   • Azure App Service
```

## 📚 Technology Rationale

| Decision | Why | Alternatives | Trade-off |
|----------|-----|--------------|-----------|
| React 18 | Modern, component-based | Vue, Svelte | Learning curve |
| TypeScript | Type safety, scale | JavaScript | Setup complexity |
| Tailwind | Utility-first, responsive | Bootstrap, Material | CSS knowledge |
| Ant Design | Enterprise components | MUI, Chakra | Bundle size |
| Vite | Fast builds, HMR | CRA, Webpack | Ecosystem |
| React Router | Standard routing | TanStack Router | Community |

## 🔮 Future Architecture Evolution

### Phase 1: Current (MVP)
- Mock data
- Single-user
- Browser-based

### Phase 2: Real Backend (3-6 months)
- Dataverse integration
- Authentication
- Real-time sync

### Phase 3: Scale (6-12 months)
- Global state management (Redux/Zustand)
- Advanced search/filtering
- Workflow engine
- Multi-user collaboration

### Phase 4: Enterprise (12+ months)
- Mobile app
- Offline support
- Analytics
- AI agent integration
- Custom workflows

---

**Document Status**: ✅ Current  
**Last Updated**: 2024-01-22  
**Architecture Maturity**: Production-Ready
