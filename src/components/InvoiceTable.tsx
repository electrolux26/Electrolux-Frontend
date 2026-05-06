/**
 * Invoice Table Component
 * Displays invoices in a reusable Ant Design Table
 * Used in Home page as the work queue
 */

import React from 'react';
import { Table, Space, Tooltip } from 'antd';
import { Invoice } from '../models/invoice.model';
import { StatusBadge } from './StatusBadge';

interface InvoiceTableProps {
  invoices: Invoice[];
  loading?: boolean;
  onRowClick?: (record: Invoice) => void;
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  loading = false,
  onRowClick,
}) => {
  return (
    <Table<Invoice>
      columns={[
        {
          title: 'Invoice Number',
          dataIndex: 'invoiceNumber',
          key: 'invoiceNumber',
          width: 150,
          sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
          render: (text: string) => <span className="font-semibold">{text}</span>,
        },
        {
          title: 'Vendor Name',
          dataIndex: 'vendorName',
          key: 'vendorName',
          width: 220,
          sorter: (a, b) => a.vendorName.localeCompare(b.vendorName),
        },
        {
          title: 'Invoice Date',
          dataIndex: 'invoiceDate',
          key: 'invoiceDate',
          width: 130,
          sorter: (a, b) =>
            new Date(a.invoiceDate).getTime() -
            new Date(b.invoiceDate).getTime(),
          render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
          title: 'Total Amount',
          dataIndex: 'totalAmount',
          key: 'totalAmount',
          width: 140,
          align: 'right' as const,
          sorter: (a, b) => a.totalAmount - b.totalAmount,
          render: (amount: number) => (
            <span className="font-semibold text-gray-800">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(amount)}
            </span>
          ),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          width: 130,
          filters: [
            { text: 'New', value: 'NEW' },
            { text: 'HITL Required', value: 'HITL_REQUIRED' },
            { text: 'Approved', value: 'APPROVED' },
          ],
          onFilter: (value, record) => record.status === value,
          render: (status) => <StatusBadge status={status} />,
        },
        {
          title: 'Confidence Score',
          dataIndex: 'confidenceScore',
          key: 'confidenceScore',
          width: 150,
          align: 'center' as const,
          sorter: (a, b) => a.confidenceScore - b.confidenceScore,
          render: (score: number) => {
            let color = 'text-green-600';
            if (score < 70) color = 'text-red-600';
            else if (score < 85) color = 'text-yellow-600';

            return (
              <Tooltip title={`AI Confidence: ${score}%`}>
                <Space className={color}>
                  <span className="font-semibold">{score}%</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        score >= 85
                          ? 'bg-green-500'
                          : score >= 70
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </Space>
              </Tooltip>
            );
          },
        },
      ]}
      dataSource={invoices}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total: ${total} invoices`,
      }}
      onRow={(record) => ({
        onClick: () => onRowClick?.(record),
        className: 'cursor-pointer hover:bg-blue-50 transition-colors',
        style: { cursor: 'pointer' },
      })}
      className="rounded-lg border border-gray-200"
      size="large"
    />
  );
};

export default InvoiceTable;
