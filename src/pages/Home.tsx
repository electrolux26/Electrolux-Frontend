/**
 * Home Page Component
 * Invoice Work Queue - displays all invoices in a table
 * Acts as the AP clerk / certifier daily work queue
 * Clicking a row navigates to the Invoice Detail page
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Space, message } from 'antd';
import { RefreshCw } from 'lucide-react';
import { Invoice } from '../models/invoice.model';
import { invoiceApi } from '../api/invoiceApi';
import InvoiceTable from '../components/InvoiceTable';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch invoices from API on component mount
   */
  const loadInvoices = async () => {
    setLoading(true);
    try {
      const data = await invoiceApi.getInvoices();
      setInvoices(data);
    } catch (error) {
      message.error('Failed to load invoices');
      console.error('Error loading invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  /**
   * Handle row click - navigate to invoice detail page
   */
  const handleRowClick = (invoice: Invoice) => {
    navigate(`/invoice/${invoice.id}`);
  };

  return (
    <Layout.Content className="p-6 bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Invoice Work Queue
              </h1>
              <p className="text-gray-600">
                Review and process invoices from your suppliers
              </p>
            </div>

            {/* Action Buttons */}
            <Space>
              <Button
                icon={<RefreshCw size={16} />}
                onClick={loadInvoices}
                loading={loading}
              >
                Refresh
              </Button>
            </Space>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Total Invoices</div>
            <div className="text-2xl font-bold text-gray-900">
              {invoices.length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">New</div>
            <div className="text-2xl font-bold text-blue-600">
              {invoices.filter((i) => i.status === 'NEW').length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">HITL Required</div>
            <div className="text-2xl font-bold text-orange-600">
              {invoices.filter((i) => i.status === 'HITL_REQUIRED').length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Approved</div>
            <div className="text-2xl font-bold text-green-600">
              {invoices.filter((i) => i.status === 'APPROVED').length}
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <InvoiceTable
            invoices={invoices}
            loading={loading}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </Layout.Content>
  );
};

export default Home;
