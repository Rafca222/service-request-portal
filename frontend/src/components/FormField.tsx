import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export default function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
}: FormFieldProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}