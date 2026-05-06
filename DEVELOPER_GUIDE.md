# Developer Quick Reference

## 🎯 Common Tasks

### Task 1: Display a New Page

**Goal**: Add a new page route (e.g., `/vendors`)

**Steps**:

1. Create page file `src/pages/Vendors.tsx`:
```typescript
import React from 'react';
import { Layout } from 'antd';

const Vendors: React.FC = () => {
  return (
    <Layout.Content className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold">Vendors</h1>
      {/* Add content here */}
    </Layout.Content>
  );
};

export default Vendors;
```

2. Add route in `src/App.tsx`:
```typescript
import Vendors from './pages/Vendors';

// Inside Routes component:
<Route path="/vendors" element={<Vendors />} />
```

3. Add navigation link in `src/components/AppHeader.tsx`:
```typescript
<Link to="/vendors" className="...">Vendors</Link>
```

### Task 2: Create a Reusable Component

**Goal**: Create a reusable `VendorCard` component

**Steps**:

1. Create `src/components/VendorCard.tsx`:
```typescript
import React from 'react';
import { Card } from 'antd';

interface VendorCardProps {
  name: string;
  email: string;
  phone: string;
}

export const VendorCard: React.FC<VendorCardProps> = ({
  name,
  email,
  phone,
}) => {
  return (
    <Card className="shadow-sm">
      <h3 className="font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-sm text-gray-600">{phone}</p>
    </Card>
  );
};

export default VendorCard;
```

2. Import and use in any page:
```typescript
import VendorCard from '../components/VendorCard';

// In JSX:
<VendorCard name="Acme Inc." email="contact@acme.com" phone="555-1234" />
```

### Task 3: Add API Method

**Goal**: Add a new API endpoint (e.g., delete invoice)

**Steps**:

1. Update `src/api/invoiceApi.ts`:
```typescript
export const deleteInvoice = async (id: string): Promise<void> => {
  await simulateNetworkDelay(300);
  
  const invoiceIndex = invoiceStore.findIndex((inv) => inv.id === id);
  if (invoiceIndex === -1) {
    throw new Error(`Invoice with ID ${id} not found`);
  }
  
  invoiceStore.splice(invoiceIndex, 1);
};
```

2. Add to export:
```typescript
export const invoiceApi = {
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,  // NEW
};
```

3. Use in component:
```typescript
const handleDelete = async () => {
  await invoiceApi.deleteInvoice(invoice.id);
  message.success('Invoice deleted');
};
```

### Task 4: Extend Domain Model

**Goal**: Add a new field to Invoice (e.g., `notes`)

**Steps**:

1. Update `src/models/invoice.model.ts`:
```typescript
export interface Invoice {
  id: string;
  invoiceNumber: string;
  // ... existing fields ...
  notes?: string;  // NEW
}
```

2. Update mock data in `src/mock/invoices.ts`:
```typescript
{
  id: 'INV-001',
  // ... existing fields ...
  notes: 'Rush delivery required',  // NEW
}
```

3. Display in component:
```typescript
{invoice.notes && (
  <div className="p-3 bg-blue-50 rounded">
    <strong>Notes:</strong> {invoice.notes}
  </div>
)}
```

### Task 5: Add Styling (Tailwind)

**Goal**: Style a custom element with Tailwind

**Pattern**:
```typescript
// Spacing: p-4 (padding), m-2 (margin), gap-3 (gap)
// Colors: bg-blue-600, text-red-500, border-gray-200
// Typography: font-bold, text-lg, leading-tight
// Responsive: md:col-span-2, lg:p-8, sm:text-base

<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
  <h1 className="text-2xl font-bold text-gray-900 mb-4">Title</h1>
  <p className="text-gray-600 mb-6">Description</p>
  <button className="px-4 py-2 bg-blue-600 text-white rounded">
    Click me
  </button>
</div>
```

**Responsive Grid**:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 1 col mobile, 2 col tablet, 4 col desktop */}
</div>
```

### Task 6: Fetch and Display Data

**Goal**: Load invoices and display in a table

**Pattern**:
```typescript
const [invoices, setInvoices] = useState<Invoice[]>([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const load = async () => {
    setLoading(true);
    try {
      const data = await invoiceApi.getInvoices();
      setInvoices(data);
    } catch (error) {
      message.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };
  
  load();
}, []);

return (
  <InvoiceTable 
    invoices={invoices} 
    loading={loading}
    onRowClick={(invoice) => navigate(`/invoice/${invoice.id}`)}
  />
);
```

### Task 7: Handle Form Input

**Goal**: Create a form with input handling

**Pattern**:
```typescript
const [formData, setFormData] = useState({ name: '', email: '' });

const handleChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

const handleSubmit = async () => {
  if (!formData.name) {
    message.error('Name required');
    return;
  }
  // Submit logic
};

// In JSX:
<Input 
  placeholder="Name"
  value={formData.name}
  onChange={(e) => handleChange('name', e.target.value)}
/>
```

## 🏗️ Project Structure Reference

```
src/
├── api/
│   └── invoiceApi.ts           ← API calls (no UI logic)
├── mock/
│   └── invoices.ts             ← Mock data (development)
├── models/
│   └── invoice.model.ts        ← TypeScript interfaces
├── pages/
│   ├── Home.tsx                ← Page: work queue
│   └── InvoiceDetail.tsx       ← Page: detail view
├── components/
│   ├── AppHeader.tsx           ← Reusable: header
│   ├── InvoiceTable.tsx        ← Reusable: table
│   ├── LineItemsTable.tsx      ← Reusable: table
│   └── StatusBadge.tsx         ← Reusable: badge
├── App.tsx                     ← Main app + routing
├── main.tsx                    ← Entry point
└── index.css                   ← Global styles
```

## 📦 Import Patterns

### Import React Hooks
```typescript
import React, { useEffect, useState } from 'react';
```

### Import Components from Ant Design
```typescript
import { Button, Table, Card, Badge, Layout, message } from 'antd';
```

### Import Icons from Lucide
```typescript
import { ChevronDown, Plus, Edit, Trash2 } from 'lucide-react';
```

### Import Router
```typescript
import { useNavigate, useParams, Link } from 'react-router-dom';
```

### Import API
```typescript
import { invoiceApi } from '../api/invoiceApi';
```

### Import Models
```typescript
import { Invoice, InvoiceStatus, LineItem } from '../models/invoice.model';
```

## 🎨 Styling Patterns

### Button Styles
```typescript
<Button type="primary">Primary</Button>           {/* Blue */}
<Button type="default">Default</Button>          {/* White */}
<Button type="dashed">Dashed</Button>            {/* Dashed */}
<Button danger>Danger</Button>                   {/* Red */}
<Button disabled>Disabled</Button>               {/* Grayed */}
```

### Card Styles
```typescript
<Card className="shadow-sm border border-gray-200">
  {/* Content */}
</Card>
```

### Color Usage
```typescript
// Status colors
bg-green-600    // Success/Approved
bg-yellow-600   // Warning/HITL Required  
bg-blue-600     // Primary/New
bg-red-600      // Danger/Error
bg-gray-600     // Default

// Text colors
text-gray-900   // Primary text
text-gray-600   // Secondary text
text-gray-400   // Tertiary text
```

## 🐛 Debugging Tips

### Check TypeScript Errors
```bash
npx tsc --noEmit
```

### Check Linting Issues
```bash
npm run lint
```

### Debug in Browser
```typescript
// Console logging
console.log('Invoice:', invoice);

// React DevTools Extension
// Redux DevTools (future)

// Network tab (check API calls)
```

### Common Errors

| Error | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| "Property does not exist" | Check interface in `.model.ts` |
| "undefined is not an object" | Add null check or optional chaining |
| "CSS not applying" | Restart dev server, check selector |
| "Port 3000 in use" | Change port in `vite.config.ts` |

## 🔄 Workflow: Adding a New Feature

### 1. Create the Model
```typescript
// src/models/yourFeature.model.ts
export interface NewFeature {
  id: string;
  name: string;
}
```

### 2. Create Mock Data
```typescript
// src/mock/yourFeature.ts
export const mockNewFeatures: NewFeature[] = [
  { id: '1', name: 'Feature 1' },
];
```

### 3. Add API Method
```typescript
// src/api/invoiceApi.ts (or new file)
export const getNewFeatures = async (): Promise<NewFeature[]> => {
  await simulateNetworkDelay();
  return mockNewFeatures;
};
```

### 4. Create Component
```typescript
// src/components/NewFeatureCard.tsx
import { NewFeature } from '../models/yourFeature.model';

export const NewFeatureCard: React.FC<{ item: NewFeature }> = ({ item }) => {
  return <Card>{item.name}</Card>;
};
```

### 5. Create Page
```typescript
// src/pages/NewFeature.tsx
import { invoiceApi } from '../api/invoiceApi';

const NewFeaturePage: React.FC = () => {
  const [items, setItems] = useState<NewFeature[]>([]);
  
  useEffect(() => {
    const load = async () => {
      const data = await invoiceApi.getNewFeatures();
      setItems(data);
    };
    load();
  }, []);
  
  return <div>{/* Render items */}</div>;
};
```

### 6. Add Route
```typescript
// src/App.tsx
<Route path="/feature" element={<NewFeaturePage />} />
```

### 7. Add Navigation Link
```typescript
// src/components/AppHeader.tsx
<Link to="/feature">New Feature</Link>
```

## 📝 Naming Conventions

### Files
```
components/     → PascalCase: MyComponent.tsx
pages/          → PascalCase: HomePage.tsx
models/         → kebab-case.model.ts: invoice.model.ts
api/            → kebab-case: invoiceApi.ts
mock/           → kebab-case: invoices.ts
```

### Variables & Functions
```typescript
// Constants: UPPER_SNAKE_CASE
const API_TIMEOUT = 5000;

// Variables: camelCase
const invoiceList = [];

// Functions: camelCase
const handleApproveInvoice = () => {};

// React Components: PascalCase
const InvoiceTable = () => {};

// Interfaces: PascalCase
interface Invoice {}

// Enums: PascalCase
enum Status {}
```

## ✅ Pre-Commit Checklist

Before committing code:

- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Comments added for complex logic
- [ ] No hardcoded values
- [ ] Proper error handling
- [ ] No `any` types used

---

**Quick Help**: Run `npm run dev` to start local development server

**Need More Help?** Check [README.md](README.md) or [ARCHITECTURE.md](ARCHITECTURE.md)
