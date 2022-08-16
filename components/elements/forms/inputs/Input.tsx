import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

interface IInput {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder?: string;
  min?: string;
  max?: string;
  error?: boolean;
  onChange: (_e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}

// Reusable styled input component
export default function Input({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  min,
  max,
  defaultValue = '',
  error = false,
  onChange,
}: IInput) {
  const normalClasses = 'focus:ring-indigo-500 focus:border-indigo-500';
  const errorClasses = 'focus:ring-rose-500 focus:border-rose-500';

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 text-sm">
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
        id={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`border text-sm focus:outline-none py-1 px-2 rounded ${error ? errorClasses : normalClasses}`}
      />
    </div>
  );
}
