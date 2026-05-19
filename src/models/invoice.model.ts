/**
 * Enterprise-grade TypeScript domain models for Invoice Processing HITL System
 * Based on actual backend Excel data structure
 * Single source of truth for all invoice-related data structures
 */

/**
 * Invoice status enumeration
 * Reflects the state of an invoice in the processing pipeline
 */
export enum InvoiceStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  NOT_SURE = 'NOT_SURE',
}

/**
 * Document status enumeration
 */
export enum DocumentStatus {
  CREATED = 'CREATED',
  PROCESSED = 'PROCESSED',
  ARCHIVED = 'ARCHIVED',
}

/**
 * Debit/Credit indicator
 */
export enum DebitCreditIndicator {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

/**
 * Line item model (Coding Lines)
 * Represents a single line item on an invoice
 */
export interface LineItem {
  id: string;
  glAccount: string;
  shortText: string;
  debitCreditIndicator: DebitCreditIndicator;
  amount: number;
  taxCode: string;
  costCenter?: string;
  profitCenter?: string;
  productGroup?: string;
  textDescription?: string;
}

/**
 * Vendor data model
 */
export interface VendorData {
  vendorNumber: string;
  vendorName: string;
  name2?: string;
  iban?: string;
  swiftCode?: string;
  streetHouseNo?: string;
  postCodeCity?: string;
  partBankType?: string;
  bankName?: string;
  bankAccount?: string;
  bankNumber?: string;
  reference?: string;
  countryRegion?: string;
  poBox?: string;
  group?: string;
  vendorVatNumber?: string;
  vendorTaxNumber?: string;
}

/**
 * Recipient data model
 */
export interface RecipientData {
  companyCode: string;
  recipientName: string;
  streetHouseNo?: string;
  postCodeCity?: string;
  countryRegion?: string;
  poBox?: string;
}

/**
 * Invoice data model
 */
export interface InvoiceData {
  transEvent?: string;
  referenceNumber: string;
  autoCalculateTax?: boolean;
  grossAmount: number;
  taxAmount: number;
  documentDate: string;
  balance: number;
  taxCode: string;
  taxRate: number;
  vatDate?: string;
  expenseType?: string;
  certifierEmail?: string;
}

/**
 * Accounting header data model
 */
export interface AccountingHeaderData {
  vendorNumber: string;
  vendorName: string;
  documentType: string;
  postingDate: string;
  companyCode: string;
  referenceNumber: string;
  documentDate: string;
  documentCurrency: string;
  exchangeRate?: number;
}

/**
 * Payment data model
 */
export interface PaymentData {
  transEvent?: string;
  dueOn?: string;
  paymentTermsText?: string;
  paymentMethod?: string;
  paymentRef?: string;
  paymentBlock?: string;
  partBankType?: string;
  scbIndicator?: string;
  baselineDate?: string;
  paymentTerms?: string;
  sapLogic?: string;
  days?: number;
}

/**
 * Accounting additional data model
 */
export interface AccountingAdditionalData {
  businessArea?: string;
  houseBank?: string;
  supplyingCountry?: string;
  text?: string;
  assignment?: string;
  docHeaderText?: string;
}

/**
 * Tax data model
 */
export interface TaxData {
  taxCode: string;
  taxRate: number;
  taxAmount: number;
  autoCalculateTax?: boolean;
  vatDate?: string;
  taxExemptionText?: string;
}

/**
 * Process document data model
 */
export interface ProcessDocumentData {
  documentId: string;
  docType: string;
  documentStatus: DocumentStatus;
  processType?: string;
  idocNumber?: string;
  sapObjectType?: string;
  sapObjectKey?: string;
  role?: string;
}

/**
 * Process information model
 */
export interface ProcessInformation {
  documentCreation?: string;
  expenseType?: string;
  priority?: string;
  batchNumber?: string;
  scanLocation?: string;
  scanDateTime?: string;
  channel?: string;
  certifierEmail?: string;
  indexedOn?: string;
  indexUser?: string;
  changedOn?: string;
  changedBy?: string;
}

/**
 * Archiving information model
 */
export interface ArchivingInformation {
  archivedOn?: string;
  archivedBy?: string;
  archiveId?: string;
  documentType?: string;
  documentId?: string;
}

/**
 * Other additional data model
 */
export interface OtherAdditionalData {
  repCountry?: string;
  headOffice?: string;
  partBankType?: string;
  holdForCredit?: boolean;
  newDocumentId?: string;
  refKey3?: string;
}

/**
 * AI processing details
 */
export interface AIProcessingDetails {
  extractedVendor?: string;
  extractedDate?: string;
  extractedAmount?: string;
  processedLineItems?: number;
  validationNotes?: string;
  confidenceScore?: number;
}

export enum MissingFieldStatus {
  PENDING = 'PENDING',
  FILLED = 'FILLED',
  NOT_SURE = 'NOT_SURE',
}

export type MissingFieldTab =
  | 'Basic Info'
  | 'Accounting'
  | 'Line Items'
  | 'Tax'
  | 'Process'
  | 'Other Data';

export interface MissingField {
  label: string;
  value?: string;
  userStatus: MissingFieldStatus;
  tab: MissingFieldTab;
}

/**
 * Complete Invoice model
 * Represents a complete invoice with all sections from Excel data
 */
export interface Invoice {
  // Basic identifiers
  id: string;
  invoiceNumber: string;

  // Status and processing
  status: InvoiceStatus;
  documentStatus?: DocumentStatus;

  // Basic Data Section
  vendorData: VendorData;
  recipientData: RecipientData;
  invoiceData: InvoiceData;

  // Accounting Section
  accountingHeaderData: AccountingHeaderData;
  paymentData?: PaymentData;
  accountingAdditionalData?: AccountingAdditionalData;

  // Line Items
  lineItems: LineItem[];

  // Tax Section
  taxData?: TaxData;

  // Process Section
  processDocumentData?: ProcessDocumentData;
  processInformation?: ProcessInformation;
  archivingInformation?: ArchivingInformation;

  // Other Data
  otherAdditionalData?: OtherAdditionalData;

  // AI Processing
  aiProcessingDetails?: AIProcessingDetails;

  // Human-in-the-loop fields
  missingFields?: Record<string, MissingField>;

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Partial invoice for update operations
 * Used when updating specific fields without requiring all fields
 */
export type InvoiceUpdatePayload = Partial<Omit<Invoice, 'id' | 'lineItems'>>;
