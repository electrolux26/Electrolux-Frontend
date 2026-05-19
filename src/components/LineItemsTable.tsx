import React from 'react';
import { Table, Empty } from 'antd';
import { LineItem, MissingField } from '../models/invoice.model';
import MissingFieldInput, { renderVerifiedField } from './MissingFieldInput';

interface LineItemsTableProps {
  lineItems: LineItem[];
  missingFields?: Record<string, MissingField>;
  onFieldChange?: (fieldKey: string, value: string) => void;
  loading?: boolean;
}

const LineItemsTable: React.FC<LineItemsTableProps> = ({
  lineItems,
  missingFields = {},
  onFieldChange,
  loading = false,
}) => {
  if (!lineItems || lineItems.length === 0) {
    return <Empty description="No line items" />;
  }

  const renderEditableCell = (
    index: number,
    fieldKey: string,
    value: React.ReactNode
  ) => {
    const key = `lineItems[${index}].${fieldKey}`;
    const field = missingFields[key];

    if (field) {
      return (
        <MissingFieldInput
          fieldKey={key}
          field={field}
          onChange={(changedKey, changedValue) => onFieldChange?.(changedKey, changedValue)}
        />
      );
    }

    return renderVerifiedField(value);
  };

  return (
    <div>
      <Table<LineItem>
        columns={[
          {
            title: 'Line Item',
            dataIndex: 'shortText',
            key: 'shortText',
            width: '30%',
            render: (text: string, _record: LineItem, index: number) =>
              renderEditableCell(index, 'shortText', <span className="font-medium">{text}</span>),
          },
          {
            title: 'GL Account',
            dataIndex: 'glAccount',
            key: 'glAccount',
            width: '15%',
            render: (account: string, _record: LineItem, index: number) =>
              renderEditableCell(
                index,
                'glAccount',
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{account}</code>
              ),
          },
          {
            title: 'Debit/Credit',
            dataIndex: 'debitCreditIndicator',
            key: 'debitCreditIndicator',
            width: '12%',
            render: (value: string, _record: LineItem, index: number) =>
              renderEditableCell(index, 'debitCreditIndicator', value),
          },
          {
            title: 'Tax Code',
            dataIndex: 'taxCode',
            key: 'taxCode',
            width: '12%',
            render: (value: string, _record: LineItem, index: number) =>
              renderEditableCell(index, 'taxCode', value),
          },
          {
            title: 'Cost Center',
            dataIndex: 'costCenter',
            key: 'costCenter',
            width: '12%',
            render: (center: string, _record: LineItem, index: number) =>
              renderEditableCell(
                index,
                'costCenter',
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{center}</code>
              ),
          },
          {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: '14%',
            align: 'right' as const,
            render: (amount: number, _record: LineItem, index: number) =>
              renderEditableCell(
                index,
                'amount',
                <span className="font-semibold text-gray-800">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(amount)}
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
                currency: 'EUR',
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
