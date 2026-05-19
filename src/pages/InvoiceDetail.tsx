/**
 * Invoice Detail Page Component
 * HITL (Human-in-the-Loop) interface for invoice review
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Card,
  Descriptions,
  Button,
  message,
  Spin,
  Tabs,
  Badge,
} from 'antd';
import { ArrowLeft } from 'lucide-react';
import {
  Invoice,
  MissingFieldStatus,
  MissingFieldTab,
} from '../models/invoice.model';
import { invoiceApi } from '../api/invoiceApi';
import LineItemsTable from '../components/LineItemsTable';
import MissingFieldInput, { renderVerifiedField } from '../components/MissingFieldInput';
import StatusBadge from '../components/StatusBadge';

const tabLabels: Record<string, string> = {
  basic: 'Basic Info',
  accounting: 'Accounting',
  lineItems: 'Line Items',
  tax: 'Tax',
  process: 'Process',
  other: 'Other Data',
};

const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      message.error('Invalid invoice ID');
      navigate('/');
      return;
    }

    const loadInvoice = async () => {
      setLoading(true);
      try {
        const data = await invoiceApi.getInvoiceById(id);
        if (!data) {
          message.error('Invoice not found');
          navigate('/');
          return;
        }
        setInvoice(data);
      } catch (error) {
        message.error('Failed to load invoice');
        console.error('Error loading invoice:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [id, navigate]);

  const missingFields = invoice?.missingFields ?? {};
  const missingEntries = Object.entries(missingFields);

  const pendingCount = useMemo(
    () => missingEntries.filter(([, field]) => !field.value?.trim()).length,
    [missingEntries]
  );

  const filledCount = useMemo(
    () => missingEntries.filter(([, field]) => !!field.value?.trim()).length,
    [missingEntries]
  );


  const tabPendingCount = (tab: MissingFieldTab) =>
    missingEntries.filter(([, field]) => field.tab === tab && !field.value?.trim()).length;

  const basicMissingCount = tabPendingCount('Basic Info');
  const accountingMissingCount = tabPendingCount('Accounting');
  const lineItemsMissingCount = tabPendingCount('Line Items');
  const taxMissingCount = tabPendingCount('Tax');
  const processMissingCount = tabPendingCount('Process');
  const otherMissingCount = tabPendingCount('Other Data');

  const renderTabLabel = (label: string, count: number) => (
    <span className="flex items-center gap-2">
      {label}
      {count > 0 && (
        <Badge
          count={count}
          size="small"
          style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
        />
      )}
    </span>
  );

  const getMissingField = (fieldKey: string) => missingFields[fieldKey];

  const updateMissingField = (fieldKey: string, value: string) => {
    setInvoice((prevInvoice) => {
      if (!prevInvoice) return prevInvoice;
      const field = prevInvoice.missingFields?.[fieldKey];
      if (!field) return prevInvoice;

      return {
        ...prevInvoice,
        missingFields: {
          ...prevInvoice.missingFields,
          [fieldKey]: {
            ...field,
            value,
            userStatus: value.trim() ? MissingFieldStatus.FILLED : MissingFieldStatus.PENDING,
          },
        },
      };
    });
  };

  const renderFieldValue = (fieldKey: string, value: React.ReactNode) => {
    const missingField = getMissingField(fieldKey);
    if (missingField) {
      return (
        <MissingFieldInput
          fieldKey={fieldKey}
          field={missingField}
          onChange={updateMissingField}
        />
      );
    }

    return renderVerifiedField(value);
  };

  const submitPayload = useMemo(
    () => ({
      invoiceId: invoice?.id,
      missingFields: missingEntries.map(([fieldKey, field]) => ({
        fieldKey,
        value: field.value ?? '',
        userStatus: field.userStatus,
      })),
    }),
    [invoice, missingEntries]
  );

  const handleSubmitReview = async () => {
    if (!invoice) return;
    setActionLoading(true);
    try {
      await invoiceApi.updateInvoice(invoice.id, {
        missingFields: invoice.missingFields ?? {},
        status: invoice.status,
      });
      setInvoice({
        ...invoice,
        updatedAt: new Date().toISOString(),
      });
      console.log('Review payload', submitPayload);
      message.success('Review submitted successfully');
    } catch (error) {
      message.error('Failed to submit review');
      console.error('Error submitting review:', error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout.Content className="p-6 bg-gray-50 flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Loading invoice details..." />
      </Layout.Content>
    );
  }

  if (!invoice) {
    return (
      <Layout.Content className="p-6 bg-gray-50">
        <Card className="text-center">
          <p className="text-gray-600">Invoice not found</p>
          <Button type="primary" onClick={() => navigate('/')} className="mt-4">
            Back to Work Queue
          </Button>
        </Card>
      </Layout.Content>
    );
  }

  const totalMissingFields = missingEntries.length;

  return (
    <Layout.Content className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Button
          type="text"
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-700"
        >
          Back to Work Queue
        </Button>

        <Card className="shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 truncate">
                {invoice.invoiceNumber}
              </h1>
              <p className="text-sm text-slate-600">
                {invoice.vendorData?.vendorName} ·{' '}
                {invoice.invoiceData?.documentDate
                  ? new Date(invoice.invoiceData.documentDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'Date not available'}
                {' · '}
                {invoice.invoiceData?.grossAmount
                  ? new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(invoice.invoiceData.grossAmount)
                  : 'Amount not available'}
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end text-sm text-slate-500">
              <div className="flex flex-col gap-2 sm:items-end">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Status</span>
                <StatusBadge status={invoice.status} />
              </div>
              <div className="text-sm text-slate-500">
                Last updated{' '}
                {invoice.updatedAt
                  ? new Date(invoice.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </div>
            </div>
            </div>
          </div>
        </Card>

        <div className={`mb-6 rounded-lg border p-4 shadow-sm ${pendingCount ? 'border-red-200 bg-red-50' : 'border-emerald-200 bg-emerald-50'}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className={`h-2.5 w-2.5 rounded-full ${pendingCount ? 'bg-red-500' : 'bg-emerald-500'}`} />
                {pendingCount > 0
                  ? `${pendingCount} missing field${pendingCount !== 1 ? 's' : ''} remain`
                  : totalMissingFields > 0
                  ? 'All missing fields completed'
                  : 'No missing fields detected.'}
              </div>
              <div className="text-sm text-slate-600">
                {totalMissingFields > 0
                  ? `${filledCount} completed`
                  : 'No fields require manual review.'}
              </div>
            </div>
            <div className="text-sm font-semibold text-slate-700">
              {totalMissingFields > 0 && `${filledCount}/${totalMissingFields} completed`}
            </div>
          </div>
        </div>

        <Card className="shadow-sm border border-gray-200">
          <Tabs
            defaultActiveKey="basic"
            size="large"
            items={[
              {
                key: 'basic',
                label: renderTabLabel(tabLabels.basic, basicMissingCount),
                children: (
                  <div className="space-y-6">
                    <Card title="Vendor Information" size="small">
                      <Descriptions
                        bordered
                        size="small"
                        column={2}
                        items={[
                          {
                            key: 'vendorNumber',
                            label: 'Vendor Number',
                            children: renderFieldValue('vendorData.vendorNumber', invoice.vendorData?.vendorNumber || 'N/A'),
                          },
                          {
                            key: 'vendorName',
                            label: 'Vendor Name',
                            children: renderFieldValue('vendorData.vendorName', invoice.vendorData?.vendorName || 'N/A'),
                          },
                          {
                            key: 'iban',
                            label: 'IBAN',
                            children: renderFieldValue('vendorData.iban', invoice.vendorData?.iban || 'N/A'),
                          },
                          {
                            key: 'swiftCode',
                            label: 'SWIFT Code',
                            children: renderFieldValue('vendorData.swiftCode', invoice.vendorData?.swiftCode || 'N/A'),
                          },
                          {
                            key: 'streetHouseNo',
                            label: 'Street/House No',
                            children: renderFieldValue('vendorData.streetHouseNo', invoice.vendorData?.streetHouseNo || 'N/A'),
                          },
                          {
                            key: 'postCodeCity',
                            label: 'Post Code/City',
                            children: renderFieldValue('vendorData.postCodeCity', invoice.vendorData?.postCodeCity || 'N/A'),
                          },
                          {
                            key: 'countryRegion',
                            label: 'Country/Region',
                            children: renderFieldValue('vendorData.countryRegion', invoice.vendorData?.countryRegion || 'N/A'),
                          },
                          {
                            key: 'vendorVatNumber',
                            label: 'VAT Number',
                            children: renderFieldValue('vendorData.vendorVatNumber', invoice.vendorData?.vendorVatNumber || 'N/A'),
                          },
                        ]}
                      />
                    </Card>

                    <Card title="Recipient Information" size="small">
                      <Descriptions
                        bordered
                        size="small"
                        column={2}
                        items={[
                          {
                            key: 'companyCode',
                            label: 'Company Code',
                            children: renderFieldValue('recipientData.companyCode', invoice.recipientData?.companyCode || 'N/A'),
                          },
                          {
                            key: 'recipientName',
                            label: 'Recipient Name',
                            children: renderFieldValue('recipientData.recipientName', invoice.recipientData?.recipientName || 'N/A'),
                          },
                          {
                            key: 'recipientStreet',
                            label: 'Street/House No',
                            children: renderFieldValue('recipientData.streetHouseNo', invoice.recipientData?.streetHouseNo || 'N/A'),
                          },
                          {
                            key: 'recipientPostCode',
                            label: 'Post Code/City',
                            children: renderFieldValue('recipientData.postCodeCity', invoice.recipientData?.postCodeCity || 'N/A'),
                          },
                          {
                            key: 'recipientCountry',
                            label: 'Country/Region',
                            children: renderFieldValue('recipientData.countryRegion', invoice.recipientData?.countryRegion || 'N/A'),
                          },
                        ]}
                      />
                    </Card>

                    <Card title="Invoice Information" size="small">
                      <Descriptions
                        bordered
                        size="small"
                        column={2}
                        items={[
                          {
                            key: 'referenceNumber',
                            label: 'Reference Number',
                            children: renderFieldValue('invoiceData.referenceNumber', invoice.invoiceData?.referenceNumber || 'N/A'),
                          },
                          {
                            key: 'autoCalculateTax',
                            label: 'Auto Calculate Tax',
                            children: renderFieldValue('invoiceData.autoCalculateTax', invoice.invoiceData?.autoCalculateTax ? 'Yes' : 'No'),
                          },
                          {
                            key: 'grossAmount',
                            label: 'Gross Amount',
                            children: renderFieldValue(
                              'invoiceData.grossAmount',
                              invoice.invoiceData?.grossAmount
                                ? new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                  }).format(invoice.invoiceData.grossAmount)
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'taxAmount',
                            label: 'Tax Amount',
                            children: renderFieldValue(
                              'invoiceData.taxAmount',
                              invoice.invoiceData?.taxAmount
                                ? new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                  }).format(invoice.invoiceData.taxAmount)
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'documentDate',
                            label: 'Document Date',
                            children: renderFieldValue(
                              'invoiceData.documentDate',
                              invoice.invoiceData?.documentDate
                                ? new Date(invoice.invoiceData.documentDate).toLocaleDateString()
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'balance',
                            label: 'Balance',
                            children: renderFieldValue(
                              'invoiceData.balance',
                              invoice.invoiceData?.balance
                                ? new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                  }).format(invoice.invoiceData.balance)
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'taxCode',
                            label: 'Tax Code',
                            children: renderFieldValue('invoiceData.taxCode', invoice.invoiceData?.taxCode || 'N/A'),
                          },
                          {
                            key: 'taxRate',
                            label: 'Tax Rate',
                            children: renderFieldValue('invoiceData.taxRate', invoice.invoiceData?.taxRate ? `${invoice.invoiceData.taxRate}%` : 'N/A'),
                          },
                          {
                            key: 'expenseType',
                            label: 'Expense Type',
                            children: renderFieldValue('invoiceData.expenseType', invoice.invoiceData?.expenseType || 'N/A'),
                          },
                          {
                            key: 'certifierEmail',
                            label: 'Certifier Email',
                            children: renderFieldValue('invoiceData.certifierEmail', invoice.invoiceData?.certifierEmail || 'N/A'),
                          },
                        ]}
                      />
                    </Card>
                  </div>
                ),
              },
              {
                key: 'accounting',
                label: renderTabLabel(tabLabels.accounting, accountingMissingCount),
                children: (
                  <div className="space-y-6">
                    <Card title="Accounting Header" size="small">
                      <Descriptions
                        bordered
                        size="small"
                        column={2}
                        items={[
                          {
                            key: 'accVendorNumber',
                            label: 'Vendor Number',
                            children: renderFieldValue('accountingHeaderData.vendorNumber', invoice.accountingHeaderData?.vendorNumber || 'N/A'),
                          },
                          {
                            key: 'accVendorName',
                            label: 'Vendor Name',
                            children: renderFieldValue('accountingHeaderData.vendorName', invoice.accountingHeaderData?.vendorName || 'N/A'),
                          },
                          {
                            key: 'documentType',
                            label: 'Document Type',
                            children: renderFieldValue('accountingHeaderData.documentType', invoice.accountingHeaderData?.documentType || 'N/A'),
                          },
                          {
                            key: 'postingDate',
                            label: 'Posting Date',
                            children: renderFieldValue(
                              'accountingHeaderData.postingDate',
                              invoice.accountingHeaderData?.postingDate
                                ? new Date(invoice.accountingHeaderData.postingDate).toLocaleDateString()
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'accCompanyCode',
                            label: 'Company Code',
                            children: renderFieldValue('accountingHeaderData.companyCode', invoice.accountingHeaderData?.companyCode || 'N/A'),
                          },
                          {
                            key: 'accReferenceNumber',
                            label: 'Reference Number',
                            children: renderFieldValue('accountingHeaderData.referenceNumber', invoice.accountingHeaderData?.referenceNumber || 'N/A'),
                          },
                          {
                            key: 'accDocumentDate',
                            label: 'Document Date',
                            children: renderFieldValue(
                              'accountingHeaderData.documentDate',
                              invoice.accountingHeaderData?.documentDate
                                ? new Date(invoice.accountingHeaderData.documentDate).toLocaleDateString()
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'documentCurrency',
                            label: 'Document Currency',
                            children: renderFieldValue('accountingHeaderData.documentCurrency', invoice.accountingHeaderData?.documentCurrency || 'N/A'),
                          },
                          {
                            key: 'exchangeRate',
                            label: 'Exchange Rate',
                            children: renderFieldValue(
                              'accountingHeaderData.exchangeRate',
                              invoice.accountingHeaderData?.exchangeRate !== undefined
                                ? invoice.accountingHeaderData.exchangeRate
                                : 'N/A'
                            ),
                          },
                        ]}
                      />
                    </Card>

                    <Card title="Payment Information" size="small">
                      <Descriptions
                        bordered
                        size="small"
                        column={2}
                        items={[
                          {
                            key: 'dueOn',
                            label: 'Due On',
                            children: renderFieldValue(
                              'paymentData.dueOn',
                              invoice.paymentData?.dueOn
                                ? new Date(invoice.paymentData.dueOn).toLocaleDateString()
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'paymentTermsText',
                            label: 'Payment Terms Text',
                            children: renderFieldValue('paymentData.paymentTermsText', invoice.paymentData?.paymentTermsText || 'N/A'),
                          },
                          {
                            key: 'paymentMethod',
                            label: 'Payment Method',
                            children: renderFieldValue('paymentData.paymentMethod', invoice.paymentData?.paymentMethod || 'N/A'),
                          },
                          {
                            key: 'paymentRef',
                            label: 'Payment Reference',
                            children: renderFieldValue('paymentData.paymentRef', invoice.paymentData?.paymentRef || 'N/A'),
                          },
                          {
                            key: 'baselineDate',
                            label: 'Baseline Date',
                            children: renderFieldValue(
                              'paymentData.baselineDate',
                              invoice.paymentData?.baselineDate
                                ? new Date(invoice.paymentData.baselineDate).toLocaleDateString()
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'paymentTerms',
                            label: 'Payment Terms',
                            children: renderFieldValue('paymentData.paymentTerms', invoice.paymentData?.paymentTerms || 'N/A'),
                          },
                          {
                            key: 'days',
                            label: 'Days',
                            children: renderFieldValue('paymentData.days', invoice.paymentData?.days || 'N/A'),
                          },
                        ]}
                      />
                    </Card>

                    <Card title="Additional Accounting Data" size="small">
                      <Descriptions
                        bordered
                        size="small"
                        column={2}
                        items={[
                          {
                            key: 'businessArea',
                            label: 'Business Area',
                            children: renderFieldValue('accountingAdditionalData.businessArea', invoice.accountingAdditionalData?.businessArea || 'N/A'),
                          },
                          {
                            key: 'supplyingCountry',
                            label: 'Supplying Country',
                            children: renderFieldValue('accountingAdditionalData.supplyingCountry', invoice.accountingAdditionalData?.supplyingCountry || 'N/A'),
                          },
                          {
                            key: 'houseBank',
                            label: 'House Bank',
                            children: renderFieldValue('accountingAdditionalData.houseBank', invoice.accountingAdditionalData?.houseBank || 'N/A'),
                          },
                          {
                            key: 'text',
                            label: 'Text',
                            children: renderFieldValue('accountingAdditionalData.text', invoice.accountingAdditionalData?.text || 'N/A'),
                          },
                          {
                            key: 'assignment',
                            label: 'Assignment',
                            children: renderFieldValue('accountingAdditionalData.assignment', invoice.accountingAdditionalData?.assignment || 'N/A'),
                          },
                        ]}
                      />
                    </Card>
                  </div>
                ),
              },
              {
                key: 'lineItems',
                label: renderTabLabel(tabLabels.lineItems, lineItemsMissingCount),
                children: (
                  <Card title="Invoice Line Items" size="small">
                    <LineItemsTable
                      lineItems={invoice.lineItems ?? []}
                      missingFields={invoice.missingFields}
                      onFieldChange={updateMissingField}
                    />
                  </Card>
                ),
              },
              {
                key: 'tax',
                label: renderTabLabel(tabLabels.tax, taxMissingCount),
                children: (
                  <Card title="Tax Information" size="small">
                    <Descriptions
                      bordered
                      size="small"
                      column={2}
                      items={[
                        {
                          key: 'taxCode',
                          label: 'Tax Code',
                          children: renderFieldValue('taxData.taxCode', invoice.taxData?.taxCode || 'N/A'),
                        },
                        {
                          key: 'taxRate',
                          label: 'Tax Rate',
                          children: renderFieldValue('taxData.taxRate', invoice.taxData?.taxRate ? `${invoice.taxData.taxRate}%` : 'N/A'),
                        },
                        {
                          key: 'taxAmount',
                          label: 'Tax Amount',
                          children: renderFieldValue(
                            'taxData.taxAmount',
                            invoice.taxData?.taxAmount
                              ? new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'EUR',
                                }).format(invoice.taxData.taxAmount)
                              : 'N/A'
                          ),
                        },
                        {
                          key: 'autoCalculateTax',
                          label: 'Auto Calculate Tax',
                          children: renderFieldValue('taxData.autoCalculateTax', invoice.taxData?.autoCalculateTax ? 'Yes' : 'No'),
                        },
                        {
                          key: 'vatDate',
                          label: 'VAT Date',
                          children: renderFieldValue(
                            'taxData.vatDate',
                            invoice.taxData?.vatDate
                              ? new Date(invoice.taxData.vatDate).toLocaleDateString()
                              : 'N/A'
                          ),
                        },
                        {
                          key: 'taxExemptionText',
                          label: 'Tax Exemption Text',
                          children: renderFieldValue('taxData.taxExemptionText', invoice.taxData?.taxExemptionText || 'N/A'),
                        },
                      ]}
                    />
                  </Card>
                ),
              },
              {
                key: 'process',
                label: renderTabLabel(tabLabels.process, processMissingCount),
                children: (
                  <div className="space-y-6">
                    <Card title="Process Document Data" size="small">
                      <Descriptions
                        bordered
                        size="small"
                        column={2}
                        items={[
                          {
                            key: 'documentId',
                            label: 'Document ID',
                            children: renderFieldValue('processDocumentData.documentId', invoice.processDocumentData?.documentId || 'N/A'),
                          },
                          {
                            key: 'docType',
                            label: 'Document Type',
                            children: renderFieldValue('processDocumentData.docType', invoice.processDocumentData?.docType || 'N/A'),
                          },
                          {
                            key: 'documentStatus',
                            label: 'Document Status',
                            children: renderFieldValue('processDocumentData.documentStatus', invoice.processDocumentData?.documentStatus || 'N/A'),
                          },
                          {
                            key: 'processType',
                            label: 'Process Type',
                            children: renderFieldValue('processDocumentData.processType', invoice.processDocumentData?.processType || 'N/A'),
                          },
                          {
                            key: 'idocNumber',
                            label: 'IDOC Number',
                            children: renderFieldValue('processDocumentData.idocNumber', invoice.processDocumentData?.idocNumber || 'N/A'),
                          },
                          {
                            key: 'sapObjectType',
                            label: 'SAP Object Type',
                            children: renderFieldValue('processDocumentData.sapObjectType', invoice.processDocumentData?.sapObjectType || 'N/A'),
                          },
                          {
                            key: 'sapObjectKey',
                            label: 'SAP Object Key',
                            children: renderFieldValue('processDocumentData.sapObjectKey', invoice.processDocumentData?.sapObjectKey || 'N/A'),
                          },
                          {
                            key: 'role',
                            label: 'Role',
                            children: renderFieldValue('processDocumentData.role', invoice.processDocumentData?.role || 'N/A'),
                          },
                        ]}
                      />
                    </Card>

                    <Card title="Process Information" size="small">
                      <Descriptions
                        bordered
                        size="small"
                        column={2}
                        items={[
                          {
                            key: 'documentCreation',
                            label: 'Document Creation',
                            children: renderFieldValue(
                              'processInformation.documentCreation',
                              invoice.processInformation?.documentCreation
                                ? new Date(invoice.processInformation.documentCreation).toLocaleString()
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'procExpenseType',
                            label: 'Expense Type',
                            children: renderFieldValue('processInformation.expenseType', invoice.processInformation?.expenseType || 'N/A'),
                          },
                          {
                            key: 'priority',
                            label: 'Priority',
                            children: renderFieldValue('processInformation.priority', invoice.processInformation?.priority || 'N/A'),
                          },
                          {
                            key: 'batchNumber',
                            label: 'Batch Number',
                            children: renderFieldValue('processInformation.batchNumber', invoice.processInformation?.batchNumber || 'N/A'),
                          },
                          {
                            key: 'scanLocation',
                            label: 'Scan Location',
                            children: renderFieldValue('processInformation.scanLocation', invoice.processInformation?.scanLocation || 'N/A'),
                          },
                          {
                            key: 'scanDateTime',
                            label: 'Scan Date/Time',
                            children: renderFieldValue(
                              'processInformation.scanDateTime',
                              invoice.processInformation?.scanDateTime
                                ? new Date(invoice.processInformation.scanDateTime).toLocaleDateString()
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'channel',
                            label: 'Channel',
                            children: renderFieldValue('processInformation.channel', invoice.processInformation?.channel || 'N/A'),
                          },
                          {
                            key: 'procCertifierEmail',
                            label: 'Certifier Email',
                            children: renderFieldValue('processInformation.certifierEmail', invoice.processInformation?.certifierEmail || 'N/A'),
                          },
                          {
                            key: 'indexedOn',
                            label: 'Indexed On',
                            children: renderFieldValue(
                              'processInformation.indexedOn',
                              invoice.processInformation?.indexedOn
                                ? new Date(invoice.processInformation.indexedOn).toLocaleDateString()
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'indexUser',
                            label: 'Index User',
                            children: renderFieldValue('processInformation.indexUser', invoice.processInformation?.indexUser || 'N/A'),
                          },
                          {
                            key: 'changedOn',
                            label: 'Changed On',
                            children: renderFieldValue(
                              'processInformation.changedOn',
                              invoice.processInformation?.changedOn
                                ? new Date(invoice.processInformation.changedOn).toLocaleDateString()
                                : 'N/A'
                            ),
                          },
                          {
                            key: 'changedBy',
                            label: 'Changed By',
                            children: renderFieldValue('processInformation.changedBy', invoice.processInformation?.changedBy || 'N/A'),
                          },
                        ]}
                      />
                    </Card>

                    {invoice.archivingInformation && (
                      <Card title="Archiving Information" size="small">
                        <Descriptions
                          bordered
                          size="small"
                          column={2}
                          items={[
                            {
                              key: 'archivedOn',
                              label: 'Archived On',
                              children: renderFieldValue(
                                'archivingInformation.archivedOn',
                                invoice.archivingInformation.archivedOn
                                  ? new Date(invoice.archivingInformation.archivedOn).toLocaleString()
                                  : 'N/A'
                              ),
                            },
                            {
                              key: 'archivedBy',
                              label: 'Archived By',
                              children: renderFieldValue('archivingInformation.archivedBy', invoice.archivingInformation.archivedBy || 'N/A'),
                            },
                            {
                              key: 'archiveId',
                              label: 'Archive ID',
                              children: renderFieldValue('archivingInformation.archiveId', invoice.archivingInformation.archiveId || 'N/A'),
                            },
                            {
                              key: 'archDocumentType',
                              label: 'Document Type',
                              children: renderFieldValue('archivingInformation.documentType', invoice.archivingInformation.documentType || 'N/A'),
                            },
                            {
                              key: 'archDocumentId',
                              label: 'Document ID',
                              children: renderFieldValue('archivingInformation.documentId', invoice.archivingInformation.documentId || 'N/A'),
                            },
                          ]}
                        />
                      </Card>
                    )}
                  </div>
                ),
              },
              {
                key: 'other',
                label: renderTabLabel(tabLabels.other, otherMissingCount),
                children: (
                  <Card title="Other Additional Data" size="small">
                    <Descriptions
                      bordered
                      size="small"
                      column={2}
                      items={[
                        {
                          key: 'repCountry',
                          label: 'Rep Country',
                          children: renderFieldValue('otherAdditionalData.repCountry', invoice.otherAdditionalData?.repCountry || 'N/A'),
                        },
                        {
                          key: 'headOffice',
                          label: 'Head Office',
                          children: renderFieldValue('otherAdditionalData.headOffice', invoice.otherAdditionalData?.headOffice || 'N/A'),
                        },
                        {
                          key: 'partBankType',
                          label: 'Part Bank Type',
                          children: renderFieldValue('otherAdditionalData.partBankType', invoice.otherAdditionalData?.partBankType || 'N/A'),
                        },
                        {
                          key: 'holdForCredit',
                          label: 'Hold for Credit',
                          children: renderFieldValue('otherAdditionalData.holdForCredit', invoice.otherAdditionalData?.holdForCredit ? 'Yes' : 'No'),
                        },
                        {
                          key: 'newDocumentId',
                          label: 'New Document ID',
                          children: renderFieldValue('otherAdditionalData.newDocumentId', invoice.otherAdditionalData?.newDocumentId || 'N/A'),
                        },
                        {
                          key: 'refKey3',
                          label: 'Ref Key 3',
                          children: renderFieldValue('otherAdditionalData.refKey3', invoice.otherAdditionalData?.refKey3 || 'N/A'),
                        },
                      ]}
                    />
                  </Card>
                ),
              },
            ]}
          />
        </Card>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">
            {pendingCount > 0
              ? 'Resolve pending fields or mark them Not Sure to enable submission.'
              : 'All fields are in review-ready state.'}
          </div>
          <Button
            type="primary"
            onClick={handleSubmitReview}
            loading={actionLoading}
            disabled={pendingCount > 0}
          >
            Submit Review
          </Button>
        </div>
      </div>
    </Layout.Content>
  );
};

export default InvoiceDetail;
