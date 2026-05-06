/**
 * Line Items Table Component
 * Displays invoice line items in a reusable Ant Design Table
 * Used in Invoice Detail page
 */

import React from 'react';
import { Table, Empty, Badge } from 'antd';
import { LineItem } from '../models/invoice.model';

interface LineItemsTableProps {
  lineItems: LineItem[];
  loading?: boolean;
  confidenceScore?: number;
}

export const LineItemsTable: React.FC<LineItemsTableProps> = ({
  lineItems,
  loading = false,
  confidenceScore = 100,
}) => {
  const isLowConfidence = confidenceScore < 70;

  if (!lineItems || lineItems.length === 0) {
    return <Empty description="No line items" />;
  }

  return (
    <div className={isLowConfidence ? 'border-l-4 border-yellow-400 pl-4' : ''}>
      {isLowConfidence && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <Badge status="warning" text="Low Confidence Score - Manual review recommended" />
        </div>
      )}

      <Table<LineItem>
        columns={[
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
            render: (text: string) => <span className="font-medium">{text}</span>,
          },
          {
            title: 'GL Account',
            dataIndex: 'glAccount',
            key: 'glAccount',
            width: '15%',
            render: (account: string) => (
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">{account}</code>
            ),
          },
          {
            title: 'Cost Center',
            dataIndex: 'costCenter',
            key: 'costCenter',
            width: '20%',
            render: (center: string) => (
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">{center}</code>
            ),
          },
          {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: '15%',
            align: 'right' as const,
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
            title: '',
            key: 'actions',
            width: '10%',
            render: () => (
              <span className="text-gray-400 text-xs">
                {isLowConfidence && '⚠️'}
              </span>
            ),
          },
        ]}
        dataSource={lineItems}
        rowKey="id"
        loading={loading}
        pagination={false}
        size="middle"
        className="border border-gray-200 rounded-lg"
        footer={(currentData) => (
          <div className="flex justify-end font-bold text-base pt-2">
            <span>
              Total:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(
                currentData.reduce((sum, item) => sum + item.amount, 0)
              )}
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default LineItemsTable;
