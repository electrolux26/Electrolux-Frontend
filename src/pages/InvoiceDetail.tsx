/**
 * Invoice Detail Page Component
 * HITL (Human-in-the-Loop) interface for invoice approval
 * Two-column layout:
 * - Left: Invoice header information
 * - Right: Status, confidence score, HITL actions
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Card,
  Descriptions,
  Button,
  Space,
  message,
  Spin,
  Progress,
  Divider,
} from 'antd';
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Invoice, InvoiceStatus } from '../models/invoice.model';
import { invoiceApi } from '../api/invoiceApi';
import LineItemsTable from '../components/LineItemsTable';
import StatusBadge from '../components/StatusBadge';

const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  /**
   * Fetch invoice details on component mount
   */
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

  /**
   * Handle invoice approval
   */
  const handleApprove = async () => {
    if (!invoice) return;

    setActionLoading(true);
    try {
      await invoiceApi.updateInvoice(invoice.id, {
        status: InvoiceStatus.APPROVED,
      });
      setInvoice({
        ...invoice,
        status: InvoiceStatus.APPROVED,
        updatedAt: new Date().toISOString(),
      });
      message.success('Invoice approved successfully');
    } catch (error) {
      message.error('Failed to approve invoice');
      console.error('Error approving invoice:', error);
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Handle mark as HITL required
   */
  const handleMarkHITL = async () => {
    if (!invoice) return;

    setActionLoading(true);
    try {
      await invoiceApi.updateInvoice(invoice.id, {
        status: InvoiceStatus.HITL_REQUIRED,
      });
      setInvoice({
        ...invoice,
        status: InvoiceStatus.HITL_REQUIRED,
        updatedAt: new Date().toISOString(),
      });
      message.success('Invoice marked as HITL required');
    } catch (error) {
      message.error('Failed to update invoice status');
      console.error('Error updating invoice:', error);
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Determine color for confidence score
   */
  const getConfidenceColor = (score: number): string => {
    if (score >= 85) return 'success';
    if (score >= 70) return 'warning';
    return 'danger';
  };

  /**
   * Determine status icon
   */
  const getStatusIcon = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.APPROVED:
        return <CheckCircle className="text-green-600" size={24} />;
      case InvoiceStatus.HITL_REQUIRED:
        return <AlertCircle className="text-orange-600" size={24} />;
      case InvoiceStatus.NEW:
        return <Clock className="text-blue-600" size={24} />;
      default:
        return null;
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

  const isLowConfidence = invoice.confidenceScore < 70;

  return (
    <Layout.Content className="p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          type="text"
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-700"
        >
          Back to Work Queue
        </Button>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Invoice Details (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Header Card */}
            <Card className="shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {invoice.invoiceNumber}
                </h2>
                <StatusBadge status={invoice.status} />
              </div>

              <Descriptions
                bordered
                size="large"
                column={2}
                items={[
                  {
                    key: '1',
                    label: 'Vendor Name',
                    children: (
                      <span className="font-medium">{invoice.vendorName}</span>
                    ),
                  },
                  {
                    key: '2',
                    label: 'Invoice Date',
                    children: new Date(invoice.invoiceDate).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    ),
                  },
                  {
                    key: '3',
                    label: 'Total Amount',
                    children: (
                      <span className="font-bold text-lg text-gray-900">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(invoice.totalAmount)}
                      </span>
                    ),
                  },
                  {
                    key: '4',
                    label: 'Created At',
                    children: invoice.createdAt
                      ? new Date(invoice.createdAt).toLocaleString()
                      : 'N/A',
                  },
                ]}
              />
            </Card>

            {/* Line Items Card */}
            <Card
              title="Line Items"
              className="shadow-sm border border-gray-200"
            >
              <LineItemsTable
                lineItems={invoice.lineItems}
                confidenceScore={invoice.confidenceScore}
              />
            </Card>
          </div>

          {/* Right Column - Actions & Status (1/3 width) */}
          <div className="space-y-6">
            {/* Confidence Score Card */}
            <Card
              className={`shadow-sm border-2 ${
                isLowConfidence ? 'border-yellow-400' : 'border-gray-200'
              }`}
            >
              <h3 className="text-lg font-bold mb-4 text-gray-900">
                AI Confidence Score
              </h3>

              <div className="mb-6 text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {invoice.confidenceScore}%
                </div>
                <Progress
                  type="circle"
                  percent={invoice.confidenceScore}
                  strokeColor={
                    invoice.confidenceScore >= 85
                      ? '#22c55e'
                      : invoice.confidenceScore >= 70
                        ? '#f59e0b'
                        : '#ef4444'
                  }
                  width={120}
                  className="mx-auto"
                />
              </div>

              {isLowConfidence && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex gap-2 text-yellow-800 text-sm">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Low Confidence</strong>
                      <p className="text-xs mt-1">
                        Manual review is recommended for this invoice.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Status Information Card */}
            <Card className="shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Status</h3>

              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                {getStatusIcon(invoice.status)}
                <div>
                  <div className="font-semibold text-gray-900">
                    {invoice.status === InvoiceStatus.APPROVED
                      ? 'Approved'
                      : invoice.status === InvoiceStatus.HITL_REQUIRED
                        ? 'HITL Required'
                        : 'New'}
                  </div>
                  <div className="text-xs text-gray-600">
                    Last updated:{' '}
                    {invoice.updatedAt
                      ? new Date(invoice.updatedAt).toLocaleString()
                      : 'N/A'}
                  </div>
                </div>
              </div>

              <Divider />

              <h4 className="font-semibold text-gray-800 mb-3">
                HITL Actions
              </h4>
              <Space direction="vertical" className="w-full">
                <Button
                  type="primary"
                  block
                  size="large"
                  icon={<CheckCircle size={18} />}
                  onClick={handleApprove}
                  loading={actionLoading}
                  disabled={invoice.status === InvoiceStatus.APPROVED}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approve Invoice
                </Button>

                <Button
                  type="default"
                  block
                  size="large"
                  icon={<AlertCircle size={18} />}
                  onClick={handleMarkHITL}
                  loading={actionLoading}
                  disabled={invoice.status === InvoiceStatus.HITL_REQUIRED}
                  className="border-orange-400 text-orange-600 hover:text-orange-700"
                >
                  Mark as HITL Required
                </Button>
              </Space>
            </Card>

            {/* Additional Info Card */}
            <Card className="shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-3 text-gray-900">Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Invoice ID:</span>
                  <div className="font-mono bg-gray-100 px-2 py-1 rounded text-xs mt-1">
                    {invoice.id}
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-gray-600">Line Items:</span>
                  <div className="font-semibold text-gray-900 mt-1">
                    {invoice.lineItems.length}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout.Content>
  );
};

export default InvoiceDetail;
