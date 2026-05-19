/**
 * Mock invoice data for development and testing
 * Based on actual backend Excel data structure
 * Later replaced by Dataverse Web API calls
 */

import { Invoice, InvoiceStatus, DocumentStatus, DebitCreditIndicator, MissingFieldStatus } from '../models/invoice.model';

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2024-001',
    status: InvoiceStatus.DONE,
    documentStatus: DocumentStatus.PROCESSED,

    // Basic Data Section
    vendorData: {
      vendorNumber: 'V001',
      vendorName: 'Acme Manufacturing Inc.',
      name2: 'Manufacturing Division',
      iban: 'DE89370400440532013000',
      swiftCode: 'DEUTDEFF',
      streetHouseNo: '123 Industrial Way',
      postCodeCity: '12345 Berlin',
      partBankType: '01',
      bankName: 'Deutsche Bank',
      bankAccount: '32013000',
      bankNumber: '37040044',
      reference: 'REF-001',
      countryRegion: 'DE',
      poBox: 'PO Box 123',
      group: 'GRP001',
      vendorVatNumber: 'DE123456789',
      vendorTaxNumber: '123/456/789',
    },

    recipientData: {
      companyCode: 'DE01',
      recipientName: 'Electrolux GmbH',
      streetHouseNo: '456 Corporate Blvd',
      postCodeCity: '10115 Berlin',
      countryRegion: 'DE',
      poBox: 'PO Box 456',
    },

    invoiceData: {
      transEvent: 'DR',
      referenceNumber: 'REF-2024-001',
      autoCalculateTax: true,
      grossAmount: 45250.50,
      taxAmount: 7220.08,
      documentDate: '2024-01-15',
      balance: 45250.50,
      taxCode: 'V1',
      taxRate: 19.0,
      vatDate: '2024-01-15',
      expenseType: 'CAPEX',
      certifierEmail: 'certifier@electrolux.com',
    },

    // Accounting Section
    accountingHeaderData: {
      vendorNumber: 'V001',
      vendorName: 'Acme Manufacturing Inc.',
      documentType: 'KR',
      postingDate: '2024-01-18',
      companyCode: 'DE01',
      referenceNumber: 'REF-2024-001',
      documentDate: '2024-01-15',
      documentCurrency: 'EUR',
      exchangeRate: 1.0,
    },

    paymentData: {
      transEvent: 'DR',
      dueOn: '2024-02-14',
      paymentTermsText: 'Net 30 days',
      paymentMethod: 'T',
      paymentRef: 'PAY-001',
      paymentBlock: '',
      partBankType: '01',
      scbIndicator: 'X',
      baselineDate: '2024-01-15',
      paymentTerms: 'Z001',
      sapLogic: 'X',
      days: 30,
    },

    accountingAdditionalData: {
      businessArea: 'BA01',
      houseBank: 'HB01',
      supplyingCountry: 'DE',
      text: 'Manufacturing equipment purchase',
      assignment: 'ASS-001',
      docHeaderText: 'Invoice Acme Manufacturing',
    },

    // Line Items
    lineItems: [
      {
        id: 'LI-001-1',
        glAccount: '4100-000',
        shortText: 'Industrial Components - Motor Assembly',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 25000.00,
        taxCode: 'V1',
        costCenter: 'CC-PROD-001',
        profitCenter: 'PC-PROD-001',
        productGroup: 'PG001',
        textDescription: 'High-performance motor assembly for production line',
      },
      {
        id: 'LI-001-2',
        glAccount: '6250-000',
        shortText: 'Shipping & Handling',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 2500.50,
        taxCode: 'V1',
        costCenter: 'CC-LOGISTICS-001',
        profitCenter: 'PC-LOG-001',
        textDescription: 'Freight and handling charges',
      },
      {
        id: 'LI-001-3',
        glAccount: '7100-000',
        shortText: 'Installation & Setup Services',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 15000.00,
        taxCode: 'V1',
        costCenter: 'CC-SERVICE-001',
        profitCenter: 'PC-SVC-001',
        textDescription: 'Professional installation and setup services',
      },
      {
        id: 'LI-001-4',
        glAccount: '7200-000',
        shortText: 'Training (8 hours)',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 2750.00,
        taxCode: 'V1',
        costCenter: 'CC-TRAINING-001',
        profitCenter: 'PC-TRN-001',
        textDescription: 'Operator training for new equipment',
      },
    ],

    // Tax Section
    taxData: {
      taxCode: 'V1',
      taxRate: 19.0,
      taxAmount: 7220.08,
      autoCalculateTax: true,
      vatDate: '2024-01-15',
      taxExemptionText: '',
    },

    // Process Section
    processDocumentData: {
      documentId: 'DOC-001',
      docType: 'KR',
      documentStatus: DocumentStatus.PROCESSED,
      processType: 'INVOICE',
      idocNumber: 'IDOC001',
      sapObjectType: 'BKPFF',
      sapObjectKey: '0010000001',
      role: 'CERTIFIER',
    },

    processInformation: {
      documentCreation: '2024-01-15T08:30:00Z',
      expenseType: 'CAPEX',
      priority: 'HIGH',
      batchNumber: 'BATCH001',
      scanLocation: 'BERLIN',
      scanDateTime: '2024-01-15T08:30:00Z',
      channel: 'EMAIL',
      certifierEmail: 'certifier@electrolux.com',
      indexedOn: '2024-01-15T08:35:00Z',
      indexUser: 'AUTO_INDEX',
      changedOn: '2024-01-18T14:20:00Z',
      changedBy: 'CERTIFIER_USER',
    },

    archivingInformation: {
      archivedOn: '2024-01-18T14:25:00Z',
      archivedBy: 'SYSTEM',
      archiveId: 'ARCH-001',
      documentType: 'PDF',
      documentId: 'DOC-001',
    },

    // Other Data
    otherAdditionalData: {
      repCountry: 'DE',
      headOffice: 'BERLIN',
      partBankType: '01',
      holdForCredit: false,
      newDocumentId: 'NEW-DOC-001',
      refKey3: 'REF3-001',
    },

    // AI Processing
    aiProcessingDetails: {
      extractedVendor: 'Acme Manufacturing Inc.',
      extractedDate: '2024-01-15',
      extractedAmount: '€45,250.50',
      processedLineItems: 4,
      validationNotes: 'All fields validated and matched with vendor master data.',
      confidenceScore: 95,
    },

    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-18T14:20:00Z',
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2024-002',
    status: InvoiceStatus.NOT_SURE,
    documentStatus: DocumentStatus.CREATED,

    // Basic Data Section
    vendorData: {
      vendorNumber: 'V002',
      vendorName: 'Global Supply Partners Ltd.',
      iban: 'GB29 NWBK 6016 1331 9268 19',
      swiftCode: 'BARCGB22',
      streetHouseNo: '789 Supply Chain Road',
      postCodeCity: 'SW1A 1AA London',
      countryRegion: 'GB',
      vendorVatNumber: '',
      vendorTaxNumber: '987654321',
    },

    recipientData: {
      companyCode: 'DE01',
      recipientName: 'Electrolux GmbH',
      streetHouseNo: '456 Corporate Blvd',
      postCodeCity: '10115 Berlin',
      countryRegion: 'DE',
    },

    invoiceData: {
      referenceNumber: 'REF-2024-002',
      autoCalculateTax: true,
      grossAmount: 12875.75,
      taxAmount: 2054.12,
      documentDate: '2024-01-18',
      balance: 12875.75,
      taxCode: '',
      taxRate: 19.0,
      expenseType: 'OPEX',
      certifierEmail: '',
    },

    // Accounting Section
    accountingHeaderData: {
      vendorNumber: 'V002',
      vendorName: 'Global Supply Partners Ltd.',
      documentType: 'KR',
      postingDate: '2024-01-20',
      companyCode: 'DE01',
      referenceNumber: 'REF-2024-002',
      documentDate: '2024-01-18',
      documentCurrency: 'EUR',
    },

    paymentData: {
      dueOn: '2024-02-17',
      paymentTermsText: 'Net 30 days',
      paymentMethod: '',
      baselineDate: '2024-01-18',
      paymentTerms: 'Z001',
      days: 30,
    },

    accountingAdditionalData: {
      businessArea: 'BA02',
      supplyingCountry: 'GB',
      text: 'Raw materials procurement',
      assignment: 'ASS-002',
    },

    // Line Items
    lineItems: [
      {
        id: 'LI-002-1',
        glAccount: '4200-100',
        shortText: 'Raw Materials - Aluminum Sheet Stock',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 8500.00,
        taxCode: 'V1',
        costCenter: '',
        profitCenter: 'PC-RAW-001',
        textDescription: 'High-grade aluminum sheets for manufacturing',
      },
      {
        id: 'LI-002-2',
        glAccount: '7300-000',
        shortText: 'Quality Inspection Services',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 3125.75,
        taxCode: 'V1',
        costCenter: 'CC-QA-001',
        profitCenter: 'PC-QA-001',
        textDescription: 'Third-party quality inspection and certification',
      },
      {
        id: 'LI-002-3',
        glAccount: '6300-000',
        shortText: 'Packaging & Documentation',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 1250.00,
        taxCode: 'V1',
        costCenter: 'CC-WAREHOUSE-001',
        profitCenter: 'PC-WH-001',
        textDescription: 'Specialized packaging and documentation services',
      },
    ],

    // Tax Section
    taxData: {
      taxCode: 'V1',
      taxRate: 19.0,
      taxAmount: 2054.12,
      autoCalculateTax: true,
      vatDate: '2024-01-18',
    },

    // Process Section
    processDocumentData: {
      documentId: 'DOC-002',
      docType: 'KR',
      documentStatus: DocumentStatus.CREATED,
      processType: 'INVOICE',
      role: 'CERTIFIER',
    },

    processInformation: {
      documentCreation: '2024-01-18T10:15:00Z',
      expenseType: 'OPEX',
      priority: 'MEDIUM',
      scanLocation: 'LONDON',
      scanDateTime: '2024-01-18T10:15:00Z',
      channel: 'EMAIL',
      certifierEmail: 'certifier@electrolux.com',
      indexedOn: '2024-01-18T10:20:00Z',
      indexUser: 'AUTO_INDEX',
      changedOn: '2024-01-19T09:45:00Z',
      changedBy: 'CERTIFIER_USER',
    },

    // AI Processing
    aiProcessingDetails: {
      extractedVendor: 'Global Supply Partners Ltd.',
      extractedDate: '2024-01-18',
      extractedAmount: '€12,875.75',
      processedLineItems: 3,
      validationNotes: 'GL account mapping uncertain for QA services. Requires manual review.',
      confidenceScore: 62,
    },

    missingFields: {
      'vendorData.vendorVatNumber': {
        label: 'Vendor VAT Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'invoiceData.certifierEmail': {
        label: 'Certifier Email',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'paymentData.paymentMethod': {
        label: 'Payment Method',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'taxData.taxCode': {
        label: 'Tax Code',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Tax',
      },
      'processInformation.batchNumber': {
        label: 'Batch Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Process',
      },
      'lineItems[0].costCenter': {
        label: 'Cost Center',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Line Items',
      },
    },

    createdAt: '2024-01-18T10:15:00Z',
    updatedAt: '2024-01-19T09:45:00Z',
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2024-003',
    status: InvoiceStatus.PENDING,
    documentStatus: DocumentStatus.CREATED,

    // Basic Data Section
    vendorData: {
      vendorNumber: 'V003',
      vendorName: 'ElectroTech Solutions GmbH',
      iban: 'DE89370400440532013001',
      swiftCode: 'DEUTDEFF',
      streetHouseNo: '321 Tech Park Drive',
      postCodeCity: '80331 Munich',
      countryRegion: 'DE',
      vendorVatNumber: 'DE987654321',
      vendorTaxNumber: '321/654/987',
    },

    recipientData: {
      companyCode: 'DE01',
      recipientName: 'Electrolux GmbH',
      streetHouseNo: '456 Corporate Blvd',
      postCodeCity: '10115 Berlin',
      countryRegion: 'DE',
    },

    invoiceData: {
      referenceNumber: 'REF-2024-003',
      autoCalculateTax: true,
      grossAmount: 67500.00,
      taxAmount: 12825.00,
      documentDate: '2024-01-20',
      balance: 67500.00,
      taxCode: 'V1',
      taxRate: 19.0,
      expenseType: 'CAPEX',
      certifierEmail: 'certifier@electrolux.com',
    },

    // Accounting Section
    accountingHeaderData: {
      vendorNumber: 'V003',
      vendorName: 'ElectroTech Solutions GmbH',
      documentType: 'KR',
      postingDate: '2024-01-22',
      companyCode: 'DE01',
      referenceNumber: 'REF-2024-003',
      documentDate: '2024-01-20',
      documentCurrency: 'EUR',
    },

    paymentData: {
      dueOn: '2024-02-19',
      paymentTermsText: 'Net 30 days',
      paymentMethod: 'T',
      baselineDate: '2024-01-20',
      paymentTerms: 'Z001',
      days: 30,
    },

    accountingAdditionalData: {
      businessArea: 'BA03',
      supplyingCountry: 'DE',
      text: 'Testing equipment procurement',
      assignment: 'ASS-003',
    },

    // Line Items
    lineItems: [
      {
        id: 'LI-003-1',
        glAccount: '1500-050',
        shortText: 'Electrical Testing Equipment (5 units)',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 50000.00,
        taxCode: 'V1',
        costCenter: 'CC-EQUIPMENT-001',
        profitCenter: 'PC-EQP-001',
        textDescription: 'Advanced electrical testing equipment for quality control',
      },
      {
        id: 'LI-003-2',
        glAccount: '7400-000',
        shortText: 'Technical Support & Warranty (1 year)',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 12500.00,
        taxCode: 'V1',
        costCenter: 'CC-SUPPORT-001',
        profitCenter: 'PC-SUP-001',
        textDescription: 'Comprehensive technical support and warranty coverage',
      },
      {
        id: 'LI-003-3',
        glAccount: '7500-000',
        shortText: 'Calibration Services',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 5000.00,
        taxCode: 'V1',
        costCenter: 'CC-MAINTENANCE-001',
        profitCenter: 'PC-MNT-001',
        textDescription: 'Professional calibration and certification services',
      },
    ],

    // Tax Section
    taxData: {
      taxCode: 'V1',
      taxRate: 19.0,
      taxAmount: 12825.00,
      autoCalculateTax: true,
      vatDate: '2024-01-20',
    },

    // Process Section
    processDocumentData: {
      documentId: 'DOC-003',
      docType: 'KR',
      documentStatus: DocumentStatus.CREATED,
      processType: 'INVOICE',
      role: 'CERTIFIER',
    },

    processInformation: {
      documentCreation: '2024-01-20T11:20:00Z',
      expenseType: 'CAPEX',
      priority: 'HIGH',
      scanLocation: 'MUNICH',
      scanDateTime: '2024-01-20T11:20:00Z',
      channel: 'EMAIL',
      certifierEmail: 'certifier@electrolux.com',
      indexedOn: '2024-01-20T11:25:00Z',
      indexUser: 'AUTO_INDEX',
    },

    // AI Processing
    aiProcessingDetails: {
      extractedVendor: 'ElectroTech Solutions GmbH',
      extractedDate: '2024-01-20',
      extractedAmount: '€67,500.00',
      processedLineItems: 3,
      validationNotes: 'Awaiting cost center allocation approval.',
      confidenceScore: 78,
    },

    missingFields: {
      'accountingHeaderData.exchangeRate': {
        label: 'Exchange Rate',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'paymentData.paymentRef': {
        label: 'Payment Reference',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'accountingAdditionalData.houseBank': {
        label: 'House Bank',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'processInformation.batchNumber': {
        label: 'Batch Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Process',
      },
      'processInformation.indexUser': {
        label: 'Index User',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Process',
      },
    },

    createdAt: '2024-01-20T11:20:00Z',
    updatedAt: '2024-01-20T11:20:00Z',
  },
  {
    id: 'INV-004',
    invoiceNumber: 'INV-2024-004',
    status: InvoiceStatus.PENDING,
    documentStatus: DocumentStatus.CREATED,

    // Basic Data Section
    vendorData: {
      vendorNumber: 'V004',
      vendorName: 'Nordic Industrial Group',
      iban: 'SE3550000000054910000003',
      swiftCode: 'NDEASESS',
      streetHouseNo: '567 Industrial Way',
      postCodeCity: '111 22 Stockholm',
      countryRegion: 'SE',
      vendorVatNumber: 'SE987654321',
      vendorTaxNumber: '556789-1234',
    },

    recipientData: {
      companyCode: 'DE01',
      recipientName: 'Electrolux GmbH',
      streetHouseNo: '456 Corporate Blvd',
      postCodeCity: '10115 Berlin',
      countryRegion: 'DE',
    },

    invoiceData: {
      referenceNumber: 'REF-2024-004',
      autoCalculateTax: true,
      grossAmount: 33450.25,
      taxAmount: 6355.55,
      documentDate: '2024-01-21',
      balance: 33450.25,
      taxCode: 'V1',
      taxRate: 19.0,
      expenseType: 'OPEX',
      certifierEmail: 'certifier@electrolux.com',
    },

    // Accounting Section
    accountingHeaderData: {
      vendorNumber: 'V004',
      vendorName: 'Nordic Industrial Group',
      documentType: 'KR',
      postingDate: '2024-01-23',
      companyCode: 'DE01',
      referenceNumber: 'REF-2024-004',
      documentDate: '2024-01-21',
      documentCurrency: 'EUR',
    },

    paymentData: {
      dueOn: '2024-02-20',
      paymentTermsText: 'Net 30 days',
      paymentMethod: 'T',
      baselineDate: '2024-01-21',
      paymentTerms: 'Z001',
      days: 30,
    },

    accountingAdditionalData: {
      businessArea: 'BA04',
      supplyingCountry: 'SE',
      text: 'Industrial maintenance supplies',
      assignment: 'ASS-004',
    },

    // Line Items
    lineItems: [
      {
        id: 'LI-004-1',
        glAccount: '4350-000',
        shortText: 'Maintenance Parts - Bearing Set',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 12500.00,
        taxCode: 'V1',
        costCenter: 'CC-MAINTENANCE-001',
        profitCenter: 'PC-MNT-001',
        textDescription: 'High-precision bearing set for production line maintenance',
      },
      {
        id: 'LI-004-2',
        glAccount: '4400-000',
        shortText: 'Hydraulic Fluid (ISO VG 32, 500L)',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 8750.25,
        taxCode: 'V1',
        costCenter: 'CC-PRODUCTION-001',
        profitCenter: 'PC-PROD-001',
        textDescription: 'Premium hydraulic fluid for industrial machinery',
      },
      {
        id: 'LI-004-3',
        glAccount: '6100-000',
        shortText: 'Safety Equipment & PPE',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 6200.00,
        taxCode: 'V1',
        costCenter: 'CC-SAFETY-001',
        profitCenter: 'PC-SAF-001',
        textDescription: 'Personal protective equipment and safety gear',
      },
      {
        id: 'LI-004-4',
        glAccount: '6250-000',
        shortText: 'Freight and Insurance',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 5500.00,
        taxCode: 'V1',
        costCenter: 'CC-LOGISTICS-001',
        profitCenter: 'PC-LOG-001',
        textDescription: 'International freight and cargo insurance',
      },
    ],

    // Tax Section
    taxData: {
      taxCode: 'V1',
      taxRate: 19.0,
      taxAmount: 6355.55,
      autoCalculateTax: true,
      vatDate: '2024-01-21',
    },

    // Process Section
    processDocumentData: {
      documentId: 'DOC-004',
      docType: 'KR',
      documentStatus: DocumentStatus.CREATED,
      processType: 'INVOICE',
      role: 'CERTIFIER',
    },

    processInformation: {
      documentCreation: '2024-01-21T13:45:00Z',
      expenseType: 'OPEX',
      priority: 'MEDIUM',
      scanLocation: 'STOCKHOLM',
      scanDateTime: '2024-01-21T13:45:00Z',
      channel: 'EMAIL',
      certifierEmail: 'certifier@electrolux.com',
      indexedOn: '2024-01-21T13:50:00Z',
      indexUser: 'AUTO_INDEX',
    },

    // AI Processing
    aiProcessingDetails: {
      extractedVendor: 'Nordic Industrial Group',
      extractedDate: '2024-01-21',
      extractedAmount: '€33,450.25',
      processedLineItems: 4,
      validationNotes: 'Low confidence on part descriptions. Extracted text may require clarification.',
      confidenceScore: 45,
    },

    missingFields: {
      'vendorData.name2': {
        label: 'Vendor Name 2',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'vendorData.poBox': {
        label: 'PO Box',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'invoiceData.transEvent': {
        label: 'Transaction Event',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'accountingHeaderData.exchangeRate': {
        label: 'Exchange Rate',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'paymentData.transEvent': {
        label: 'Transaction Event',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'accountingAdditionalData.docHeaderText': {
        label: 'Document Header Text',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'lineItems[1].profitCenter': {
        label: 'Profit Center',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Line Items',
      },
      'lineItems[2].productGroup': {
        label: 'Product Group',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Line Items',
      },
      'taxData.vatDate': {
        label: 'VAT Date',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Tax',
      },
      'processInformation.batchNumber': {
        label: 'Batch Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Process',
      },
      'processInformation.changedBy': {
        label: 'Changed By',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Process',
      },
    },

    createdAt: '2024-01-21T13:45:00Z',
    updatedAt: '2024-01-21T13:45:00Z',
  },
  {
    id: 'INV-005',
    invoiceNumber: 'INV-2024-005',
    status: InvoiceStatus.DONE,
    documentStatus: DocumentStatus.PROCESSED,

    // Basic Data Section
    vendorData: {
      vendorNumber: 'V005',
      vendorName: 'Swiss Precision AG',
      iban: 'CH2100230230A1023507',
      swiftCode: 'UBSWCHZH80A',
      streetHouseNo: '890 Precision Street',
      postCodeCity: '8001 Zurich',
      countryRegion: 'CH',
      vendorVatNumber: 'CHE-123.456.789',
      vendorTaxNumber: 'CHE-987.654.321',
    },

    recipientData: {
      companyCode: 'DE01',
      recipientName: 'Electrolux GmbH',
      streetHouseNo: '456 Corporate Blvd',
      postCodeCity: '10115 Berlin',
      countryRegion: 'DE',
    },

    invoiceData: {
      referenceNumber: 'REF-2024-005',
      autoCalculateTax: true,
      grossAmount: 89120.00,
      taxAmount: 16932.80,
      documentDate: '2024-01-22',
      balance: 0.00,
      taxCode: 'V1',
      taxRate: 19.0,
      expenseType: 'CAPEX',
      certifierEmail: 'certifier@electrolux.com',
    },

    // Accounting Section
    accountingHeaderData: {
      vendorNumber: 'V005',
      vendorName: 'Swiss Precision AG',
      documentType: 'KR',
      postingDate: '2024-01-24',
      companyCode: 'DE01',
      referenceNumber: 'REF-2024-005',
      documentDate: '2024-01-22',
      documentCurrency: 'EUR',
    },

    paymentData: {
      dueOn: '2024-02-21',
      paymentTermsText: 'Net 30 days',
      paymentMethod: 'T',
      baselineDate: '2024-01-22',
      paymentTerms: 'Z001',
      days: 30,
    },

    accountingAdditionalData: {
      businessArea: 'BA05',
      supplyingCountry: 'CH',
      text: 'Precision manufacturing services',
      assignment: 'ASS-005',
    },

    // Line Items
    lineItems: [
      {
        id: 'LI-005-1',
        glAccount: '7600-000',
        shortText: 'CNC Machining Services (200 hours)',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 45000.00,
        taxCode: 'V1',
        costCenter: 'CC-MANUFACTURING-001',
        profitCenter: 'PC-MFG-001',
        textDescription: 'High-precision CNC machining services for custom parts',
      },
      {
        id: 'LI-005-2',
        glAccount: '1500-100',
        shortText: 'Precision Gauge Set (26-piece)',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 15000.00,
        taxCode: 'V1',
        costCenter: 'CC-TOOLS-001',
        profitCenter: 'PC-TOOL-001',
        textDescription: 'Professional precision measurement gauge set',
      },
      {
        id: 'LI-005-3',
        glAccount: '7300-000',
        shortText: 'Quality Assurance Testing',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 18120.00,
        taxCode: 'V1',
        costCenter: 'CC-QA-001',
        profitCenter: 'PC-QA-001',
        textDescription: 'Comprehensive quality assurance and testing services',
      },
      {
        id: 'LI-005-4',
        glAccount: '6250-000',
        shortText: 'Expedited Shipping',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 11000.00,
        taxCode: 'V1',
        costCenter: 'CC-LOGISTICS-001',
        profitCenter: 'PC-LOG-001',
        textDescription: 'Express air freight and expedited delivery services',
      },
    ],

    // Tax Section
    taxData: {
      taxCode: 'V1',
      taxRate: 19.0,
      taxAmount: 16932.80,
      autoCalculateTax: true,
      vatDate: '2024-01-22',
    },

    // Process Section
    processDocumentData: {
      documentId: 'DOC-005',
      docType: 'KR',
      documentStatus: DocumentStatus.PROCESSED,
      processType: 'INVOICE',
      idocNumber: 'IDOC005',
      sapObjectType: 'BKPFF',
      sapObjectKey: '0010000005',
      role: 'CERTIFIER',
    },

    processInformation: {
      documentCreation: '2024-01-22T14:30:00Z',
      expenseType: 'CAPEX',
      priority: 'HIGH',
      batchNumber: 'BATCH005',
      scanLocation: 'ZURICH',
      scanDateTime: '2024-01-22T14:30:00Z',
      channel: 'EMAIL',
      certifierEmail: 'certifier@electrolux.com',
      indexedOn: '2024-01-22T14:35:00Z',
      indexUser: 'AUTO_INDEX',
      changedOn: '2024-01-25T16:45:00Z',
      changedBy: 'CERTIFIER_USER',
    },

    archivingInformation: {
      archivedOn: '2024-01-25T16:50:00Z',
      archivedBy: 'SYSTEM',
      archiveId: 'ARCH-005',
      documentType: 'PDF',
      documentId: 'DOC-005',
    },

    // Other Data
    otherAdditionalData: {
      repCountry: 'CH',
      headOffice: 'ZURICH',
      partBankType: '01',
      holdForCredit: false,
      newDocumentId: 'NEW-DOC-005',
      refKey3: 'REF3-005',
    },

    // AI Processing
    aiProcessingDetails: {
      extractedVendor: 'Swiss Precision AG',
      extractedDate: '2024-01-22',
      extractedAmount: '€89,120.00',
      processedLineItems: 4,
      validationNotes: 'All data validated and approved. Ready for payment processing.',
      confidenceScore: 95,
    },

    createdAt: '2024-01-22T14:30:00Z',
    updatedAt: '2024-01-25T16:45:00Z',
  },
  {
    id: 'INV-006',
    invoiceNumber: 'INV-2024-006',
    status: InvoiceStatus.PENDING,
    documentStatus: DocumentStatus.CREATED,

    // Basic Data Section
    vendorData: {
      vendorNumber: 'V006',
      vendorName: 'Pacific Logistics Inc.',
      iban: 'US12345678901234567890',
      swiftCode: 'CHASUS33',
      streetHouseNo: '1234 Harbor View Drive',
      postCodeCity: '94105 San Francisco',
      countryRegion: 'US',
      vendorVatNumber: '',
      vendorTaxNumber: '98-7654321',
    },

    recipientData: {
      companyCode: 'DE01',
      recipientName: 'Electrolux GmbH',
      streetHouseNo: '456 Corporate Blvd',
      postCodeCity: '10115 Berlin',
      countryRegion: 'DE',
    },

    invoiceData: {
      referenceNumber: 'REF-2024-006',
      autoCalculateTax: true,
      grossAmount: 45600.00,
      taxAmount: 0.00,
      documentDate: '2024-01-23',
      balance: 45600.00,
      taxCode: '',
      taxRate: 0.0,
      expenseType: 'OPEX',
      certifierEmail: '',
    },

    // Accounting Section
    accountingHeaderData: {
      vendorNumber: 'V006',
      vendorName: 'Pacific Logistics Inc.',
      documentType: 'KR',
      postingDate: '2024-01-25',
      companyCode: 'DE01',
      referenceNumber: 'REF-2024-006',
      documentDate: '2024-01-23',
      documentCurrency: 'USD',
      exchangeRate: 1.08,
    },

    paymentData: {
      dueOn: '2024-02-22',
      paymentTermsText: 'Net 30 days',
      paymentMethod: '',
      baselineDate: '2024-01-23',
      paymentTerms: 'Z001',
      days: 30,
    },

    accountingAdditionalData: {
      businessArea: 'BA06',
      supplyingCountry: 'US',
      text: 'International shipping services',
      assignment: 'ASS-006',
    },

    // Line Items
    lineItems: [
      {
        id: 'LI-006-1',
        glAccount: '6250-000',
        shortText: 'Ocean Freight - Container Shipment',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 25000.00,
        taxCode: 'V0',
        costCenter: 'CC-LOGISTICS-001',
        profitCenter: 'PC-LOG-001',
        textDescription: 'Full container load shipping from California to Germany',
      },
      {
        id: 'LI-006-2',
        glAccount: '6250-100',
        shortText: 'Customs Clearance & Documentation',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 15600.00,
        taxCode: 'V0',
        costCenter: 'CC-IMPORT-001',
        profitCenter: 'PC-IMP-001',
        textDescription: 'Customs brokerage and documentation fees',
      },
      {
        id: 'LI-006-3',
        glAccount: '6300-000',
        shortText: 'Insurance Premium',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 5000.00,
        taxCode: 'V0',
        costCenter: 'CC-RISK-001',
        profitCenter: 'PC-RSK-001',
        textDescription: 'Cargo insurance coverage for international shipment',
      },
    ],

    // Tax Section
    taxData: {
      taxCode: 'V0',
      taxRate: 0.0,
      taxAmount: 0.00,
      autoCalculateTax: false,
      vatDate: '2024-01-23',
    },

    // Process Section
    processDocumentData: {
      documentId: 'DOC-006',
      docType: 'KR',
      documentStatus: DocumentStatus.CREATED,
      processType: 'INVOICE',
      role: 'CERTIFIER',
    },

    processInformation: {
      documentCreation: '2024-01-23T15:15:00Z',
      expenseType: 'OPEX',
      priority: 'MEDIUM',
      scanLocation: 'SAN FRANCISCO',
      scanDateTime: '2024-01-23T15:15:00Z',
      channel: 'EMAIL',
      certifierEmail: 'certifier@electrolux.com',
      indexedOn: '2024-01-23T15:20:00Z',
      indexUser: 'AUTO_INDEX',
    },

    // AI Processing
    aiProcessingDetails: {
      extractedVendor: 'Pacific Logistics Inc.',
      extractedDate: '2024-01-23',
      extractedAmount: '$45,600.00',
      processedLineItems: 3,
      validationNotes: 'US vendor - tax exempt. Requires VAT exemption confirmation.',
      confidenceScore: 72,
    },

    missingFields: {
      'vendorData.vendorVatNumber': {
        label: 'Vendor VAT Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'invoiceData.certifierEmail': {
        label: 'Certifier Email',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'paymentData.paymentMethod': {
        label: 'Payment Method',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'accountingAdditionalData.houseBank': {
        label: 'House Bank',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'taxData.taxExemptionText': {
        label: 'Tax Exemption Reason',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Tax',
      },
      'processInformation.batchNumber': {
        label: 'Batch Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Process',
      },
    },

    createdAt: '2024-01-23T15:15:00Z',
    updatedAt: '2024-01-23T15:15:00Z',
  },
  {
    id: 'INV-007',
    invoiceNumber: 'INV-2024-007',
    status: InvoiceStatus.NOT_SURE,
    documentStatus: DocumentStatus.CREATED,

    // Basic Data Section - Many missing fields
    vendorData: {
      vendorNumber: 'V007',
      vendorName: 'Eastern Components Ltd.',
      iban: '',
      swiftCode: '',
      streetHouseNo: 'Building 45, Industrial Zone',
      postCodeCity: '200080 Shanghai',
      countryRegion: 'CN',
      vendorVatNumber: '',
      vendorTaxNumber: '',
    },

    recipientData: {
      companyCode: 'DE01',
      recipientName: 'Electrolux GmbH',
      streetHouseNo: '456 Corporate Blvd',
      postCodeCity: '10115 Berlin',
      countryRegion: 'DE',
    },

    invoiceData: {
      referenceNumber: '',
      autoCalculateTax: true,
      grossAmount: 28500.00,
      taxAmount: 0.00,
      documentDate: '2024-01-24',
      balance: 28500.00,
      taxCode: '',
      taxRate: 0.0,
      expenseType: '',
      certifierEmail: '',
    },

    // Accounting Section - Several missing
    accountingHeaderData: {
      vendorNumber: 'V007',
      vendorName: 'Eastern Components Ltd.',
      documentType: 'KR',
      postingDate: '',
      companyCode: 'DE01',
      referenceNumber: '',
      documentDate: '2024-01-24',
      documentCurrency: 'CNY',
      exchangeRate: 7.2,
    },

    paymentData: {
      dueOn: '',
      paymentTermsText: '',
      paymentMethod: '',
      baselineDate: '2024-01-24',
      paymentTerms: '',
      days: 0,
    },

    accountingAdditionalData: {
      businessArea: '',
      supplyingCountry: 'CN',
      text: '',
      assignment: '',
    },

    // Line Items - Some missing fields
    lineItems: [
      {
        id: 'LI-007-1',
        glAccount: '4200-200',
        shortText: 'Electronic Components - Circuit Boards',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 15000.00,
        taxCode: 'V0',
        costCenter: '',
        profitCenter: '',
        textDescription: 'Custom circuit boards for appliance controllers',
      },
      {
        id: 'LI-007-2',
        glAccount: '6250-000',
        shortText: 'Air Freight & Express Delivery',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 8500.00,
        taxCode: 'V0',
        costCenter: '',
        profitCenter: '',
        textDescription: 'Express air freight from Shanghai to Frankfurt',
      },
      {
        id: 'LI-007-3',
        glAccount: '7300-000',
        shortText: 'Quality Control Inspection',
        debitCreditIndicator: DebitCreditIndicator.DEBIT,
        amount: 5000.00,
        taxCode: 'V0',
        costCenter: '',
        profitCenter: '',
        textDescription: 'Third-party quality inspection services',
      },
    ],

    // Tax Section
    taxData: {
      taxCode: 'V0',
      taxRate: 0.0,
      taxAmount: 0.00,
      autoCalculateTax: false,
      vatDate: '',
    },

    // Process Section
    processDocumentData: {
      documentId: 'DOC-007',
      docType: 'KR',
      documentStatus: DocumentStatus.CREATED,
      processType: 'INVOICE',
      role: 'CERTIFIER',
    },

    processInformation: {
      documentCreation: '2024-01-24T16:00:00Z',
      expenseType: '',
      priority: 'HIGH',
      scanLocation: 'SHANGHAI',
      scanDateTime: '2024-01-24T16:00:00Z',
      channel: 'EMAIL',
      certifierEmail: '',
      indexedOn: '2024-01-24T16:05:00Z',
      indexUser: 'AUTO_INDEX',
    },

    // AI Processing
    aiProcessingDetails: {
      extractedVendor: 'Eastern Components Ltd.',
      extractedDate: '2024-01-24',
      extractedAmount: '¥28,500.00',
      processedLineItems: 3,
      validationNotes: 'Poor OCR quality. Many fields unreadable. Requires manual data entry.',
      confidenceScore: 25,
    },

    missingFields: {
      'vendorData.iban': {
        label: 'IBAN',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'vendorData.swiftCode': {
        label: 'SWIFT Code',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'vendorData.vendorVatNumber': {
        label: 'Vendor VAT Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'vendorData.vendorTaxNumber': {
        label: 'Vendor Tax Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'invoiceData.referenceNumber': {
        label: 'Reference Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'invoiceData.expenseType': {
        label: 'Expense Type',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'invoiceData.certifierEmail': {
        label: 'Certifier Email',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Basic Info',
      },
      'accountingHeaderData.postingDate': {
        label: 'Posting Date',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'accountingHeaderData.referenceNumber': {
        label: 'Reference Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'paymentData.dueOn': {
        label: 'Due Date',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'paymentData.paymentTermsText': {
        label: 'Payment Terms Text',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'paymentData.paymentMethod': {
        label: 'Payment Method',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'paymentData.paymentTerms': {
        label: 'Payment Terms',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'paymentData.days': {
        label: 'Payment Days',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'accountingAdditionalData.businessArea': {
        label: 'Business Area',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'accountingAdditionalData.text': {
        label: 'Accounting Text',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'accountingAdditionalData.assignment': {
        label: 'Assignment',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Accounting',
      },
      'lineItems[0].costCenter': {
        label: 'Cost Center',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Line Items',
      },
      'lineItems[0].profitCenter': {
        label: 'Profit Center',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Line Items',
      },
      'lineItems[1].costCenter': {
        label: 'Cost Center',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Line Items',
      },
      'lineItems[1].profitCenter': {
        label: 'Profit Center',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Line Items',
      },
      'lineItems[2].costCenter': {
        label: 'Cost Center',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Line Items',
      },
      'lineItems[2].profitCenter': {
        label: 'Profit Center',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Line Items',
      },
      'taxData.vatDate': {
        label: 'VAT Date',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Tax',
      },
      'processInformation.expenseType': {
        label: 'Expense Type',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Process',
      },
      'processInformation.certifierEmail': {
        label: 'Certifier Email',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Process',
      },
      'processInformation.batchNumber': {
        label: 'Batch Number',
        value: '',
        userStatus: MissingFieldStatus.PENDING,
        tab: 'Process',
      },
    },

    createdAt: '2024-01-24T16:00:00Z',
    updatedAt: '2024-01-24T16:00:00Z',
  },
];
