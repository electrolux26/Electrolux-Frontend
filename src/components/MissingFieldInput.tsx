import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { MissingField } from '../models/invoice.model';

interface MissingFieldInputProps {
  fieldKey: string;
  field: MissingField;
  onChange: (fieldKey: string, value: string) => void;
}

const MissingFieldInput: React.FC<MissingFieldInputProps> = ({
  fieldKey,
  field,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(field.value || '');
  const [editing, setEditing] = useState(!field.value?.trim());

  useEffect(() => {
    setInputValue(field.value || '');
    setEditing(!field.value?.trim());
  }, [field.value]);

  const isFilled = !!field.value?.trim();

  const commitValue = () => {
    const trimmedValue = inputValue.trim();
    onChange(fieldKey, trimmedValue);
    setEditing(!trimmedValue);
  };

  return (
    <div className={`rounded-lg border px-3 py-2 ${isFilled ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
      {editing ? (
        <>
          <Input
            size="small"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onPressEnter={(event) => {
              event.preventDefault();
              commitValue();
            }}
            placeholder={field.label ? `Enter ${field.label}` : 'Enter value'}
            suffix={<EditOutlined className="text-slate-400" />}
          />
          <div className="mt-2 flex justify-end">
            <Button
              type="primary"
              size="small"
              icon={<CheckOutlined />}
              onClick={commitValue}
              className="min-w-[60px]"
            >
              OK
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-800">{field.value || 'No value entered'}</span>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setEditing(true)}
            className="text-slate-500 hover:text-slate-700"
          />
        </div>
      )}
    </div>
  );
};

export const renderVerifiedField = (value: React.ReactNode) => (
  <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700">
    {value}
  </div>
);

export default MissingFieldInput;
