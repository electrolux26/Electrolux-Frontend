/**
 * Status Badge Component
 * Displays invoice status with appropriate color and styling
 * Enterprise-grade visual indicator for status at a glance
 */

import React from 'react';
import { Tag } from 'antd';
import { InvoiceStatus } from '../models/invoice.model';

interface StatusBadgeProps {
  status: InvoiceStatus;
}

/**
 * Maps invoice status to Ant Design Tag color
 */
const getStatusColor = (status: InvoiceStatus): string => {
  switch (status) {
    case InvoiceStatus.DONE:
      return 'success';
    case InvoiceStatus.NOT_SURE:
      return 'warning';
    case InvoiceStatus.PENDING:
      return 'error';
    default:
      return 'default';
  }
};

/**
 * Maps invoice status to human-readable label
 */
const getStatusLabel = (status: InvoiceStatus): string => {
  switch (status) {
    case InvoiceStatus.DONE:
      return 'Done';
    case InvoiceStatus.NOT_SURE:
      return 'Not Sure';
    case InvoiceStatus.PENDING:
      return 'Pending';
    default:
      return status;
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <Tag color={getStatusColor(status)} className="font-semibold">
      {getStatusLabel(status)}
    </Tag>
  );
};

export default StatusBadge;
