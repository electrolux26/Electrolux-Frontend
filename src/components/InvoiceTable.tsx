/**
 * Invoice Table Component
 * Displays invoices in a reusable Ant Design Table
 * Used in Home page as the work queue
 */

import React from 'react';
import { Table } from 'antd';
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
          key: 'vendorName',
          width: 220,
          sorter: (a, b) =>
            a.vendorData.vendorName.localeCompare(b.vendorData.vendorName),
          render: (_, record) => record.vendorData.vendorName,
        },
        {
          title: 'Document Date',
          key: 'documentDate',
          width: 140,
          sorter: (a, b) =>
            new Date(a.invoiceData.documentDate).getTime() -
            new Date(b.invoiceData.documentDate).getTime(),
          render: (_, record) =>
            new Date(record.invoiceData.documentDate).toLocaleDateString(),
        },
        {
          title: 'Gross Amount',
          key: 'grossAmount',
          width: 140,
          align: 'right' as const,
          sorter: (a, b) => a.invoiceData.grossAmount - b.invoiceData.grossAmount,
          render: (_, record) => (
            <span className="font-semibold text-gray-800">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'EUR',
              }).format(record.invoiceData.grossAmount)}
            </span>
          ),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          width: 130,
          filters: [
            { text: 'Pending', value: 'PENDING' },
            { text: 'Not Sure', value: 'NOT_SURE' },
            { text: 'Done', value: 'DONE' },
          ],
          onFilter: (value, record) => record.status === value,
          render: (status) => <StatusBadge status={status} />,
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
