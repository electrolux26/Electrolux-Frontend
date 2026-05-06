/**
 * Invoice API abstraction layer
 * Simulates REST-style API calls using Promises
 * UI does NOT know this is mocked - later replaced with Dataverse Web API
 * 
 * Pattern:
 * - getInvoices(): Promise<Invoice[]>
 * - getInvoiceById(id: string): Promise<Invoice | undefined>
 * - updateInvoice(id: string, updates: Partial<Invoice>): Promise<void>
 */

import { Invoice, InvoiceUpdatePayload } from '../models/invoice.model';
import { mockInvoices } from '../mock/invoices';

/**
 * Simulated in-memory invoice store
 * In production, this would be Dataverse or SAP VIM
 */
let invoiceStore: Invoice[] = JSON.parse(JSON.stringify(mockInvoices));

/**
 * Simulates network delay for realistic API behavior
 */
const simulateNetworkDelay = (delayMs: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
};

/**
 * Fetches all invoices from the store
 * GET /api/invoices
 */
export const getInvoices = async (): Promise<Invoice[]> => {
  await simulateNetworkDelay();
  return JSON.parse(JSON.stringify(invoiceStore));
};

/**
 * Fetches a single invoice by ID
 * GET /api/invoices/{id}
 */
export const getInvoiceById = async (id: string): Promise<Invoice | undefined> => {
  await simulateNetworkDelay();
  const invoice = invoiceStore.find((inv) => inv.id === id);
  return invoice ? JSON.parse(JSON.stringify(invoice)) : undefined;
};

/**
 * Updates an invoice with partial data
 * PATCH /api/invoices/{id}
 * 
 * Common use cases:
 * - Approve invoice: updateInvoice(id, { status: InvoiceStatus.APPROVED })
 * - Mark as HITL required: updateInvoice(id, { status: InvoiceStatus.HITL_REQUIRED })
 * - Update confidence score: updateInvoice(id, { confidenceScore: 95 })
 */
export const updateInvoice = async (
  id: string,
  updates: InvoiceUpdatePayload
): Promise<void> => {
  await simulateNetworkDelay(400);

  const invoiceIndex = invoiceStore.findIndex((inv) => inv.id === id);
  if (invoiceIndex === -1) {
    throw new Error(`Invoice with ID ${id} not found`);
  }

  // Update timestamp
  const now = new Date().toISOString();
  invoiceStore[invoiceIndex] = {
    ...invoiceStore[invoiceIndex],
    ...updates,
    updatedAt: now,
  };
};

/**
 * Mock error scenario - optional
 * Can be used to test error handling in UI
 */
export const throwMockError = async (): Promise<never> => {
  await simulateNetworkDelay();
  throw new Error('Mock API Error: Operation failed');
};

/**
 * Export the default API client
 * Later, this can be swapped with Dataverse Web API client
 */
export const invoiceApi = {
  getInvoices,
  getInvoiceById,
  updateInvoice,
  throwMockError,
};

export default invoiceApi;
