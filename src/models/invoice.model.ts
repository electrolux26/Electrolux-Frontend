/**
 * Enterprise-grade TypeScript domain models for Invoice Processing HITL System
 * Single source of truth for all invoice-related data structures
 */

/**
 * Invoice status enumeration
 * Reflects the state of an invoice in the processing pipeline
 */
export enum InvoiceStatus {
  NEW = 'NEW',
  HITL_REQUIRED = 'HITL_REQUIRED',
  APPROVED = 'APPROVED',
}

/**
 * Line item model
 * Represents a single line item on an invoice
 */
export interface LineItem {
  id: string;
  description: string;
  glAccount: string;
  costCenter: string;
  amount: number;
}

/**
 * Invoice model
 * Represents a complete invoice with header and line items
 * Confidence score indicates AI processing confidence (0-100)
 */
export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  invoiceDate: string;
  totalAmount: number;
  status: InvoiceStatus;
  confidenceScore: number;
  lineItems: LineItem[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Partial invoice for update operations
 * Used when updating specific fields without requiring all fields
 */
export type InvoiceUpdatePayload = Partial<Omit<Invoice, 'id' | 'lineItems'>>;
