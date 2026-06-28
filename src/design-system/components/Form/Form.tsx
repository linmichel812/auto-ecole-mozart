import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import './Form.css';

interface FieldWrapperProps {
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

function FieldWrapper({ label, required, hint, error, children, htmlFor }: FieldWrapperProps) {
  return (
    <div className="moz-field">
      {label && (
        <label
          htmlFor={htmlFor}
          className={`moz-field__label ${required ? 'moz-field__label-required' : ''}`}
        >
          {label}
        </label>
      )}
      {children}
      {hint && !error && <span className="moz-field__hint">{hint}</span>}
      {error && <span className="moz-field__error">{error}</span>}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  success?: boolean;
}

export function Input({ label, hint, error, success, id, className = '', ...props }: InputProps) {
  const inputId = id ?? props.name;
  const classes = [
    'moz-input',
    error ? 'moz-input--error' : '',
    success ? 'moz-input--success' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <FieldWrapper label={label} required={props.required} hint={hint} error={error} htmlFor={inputId}>
      <input id={inputId} className={classes} {...props} />
    </FieldWrapper>
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, id, className = '', ...props }: TextareaProps) {
  const inputId = id ?? props.name;
  const classes = ['moz-textarea', error ? 'moz-textarea--error' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <FieldWrapper label={label} required={props.required} hint={hint} error={error} htmlFor={inputId}>
      <textarea id={inputId} className={classes} {...props} />
    </FieldWrapper>
  );
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export function Select({ label, hint, error, options, id, className = '', ...props }: SelectProps) {
  const inputId = id ?? props.name;
  const classes = ['moz-select', error ? 'moz-select--error' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <FieldWrapper label={label} required={props.required} hint={hint} error={error} htmlFor={inputId}>
      <select id={inputId} className={classes} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export interface CheckboxProps {
  label: ReactNode;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
}

export function Checkbox({ label, name, checked, onChange, required }: CheckboxProps) {
  return (
    <label className="moz-checkbox">
      <input
        type="checkbox"
        className="moz-checkbox__input"
        name={name}
        checked={checked}
        required={required}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="moz-checkbox__label">{label}</span>
    </label>
  );
}

export function FormGrid({
  columns = 1,
  children,
}: {
  columns?: 1 | 2;
  children: ReactNode;
}) {
  return (
    <div className={`moz-form-grid ${columns === 2 ? 'moz-form-grid--2' : ''}`}>{children}</div>
  );
}
