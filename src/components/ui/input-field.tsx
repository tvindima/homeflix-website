import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
};

type InputFieldProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;

type TextAreaFieldProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function InputField({ label, name, required = false, hint, className = "", ...props }: InputFieldProps) {
  return (
    <label className="form-row">
      <span className="form-label">
        {label}
        {required ? <span className="text-cyan-400"> *</span> : null}
      </span>
      <input name={name} required={required} className={`form-input ${className}`} {...props} />
      {hint ? <span className="form-hint">{hint}</span> : null}
    </label>
  );
}

export function TextAreaField({ label, name, required = false, hint, className = "", ...props }: TextAreaFieldProps) {
  return (
    <label className="form-row">
      <span className="form-label">
        {label}
        {required ? <span className="text-cyan-400"> *</span> : null}
      </span>
      <textarea name={name} required={required} className={`form-input min-h-28 resize-y ${className}`} {...props} />
      {hint ? <span className="form-hint">{hint}</span> : null}
    </label>
  );
}
