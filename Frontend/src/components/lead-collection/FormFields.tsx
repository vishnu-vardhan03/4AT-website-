import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const CHEVRON_BG =
  "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")";

const baseFieldClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-[#7dd3fc]/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-[#7dd3fc]/25";

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-white/45"
    >
      {children} {required && <span className="text-[#7dd3fc]">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[11px] font-medium text-red-400">{message}</p>;
}

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, required, id, className, ...props }, ref) => (
    <div>
      <FieldLabel htmlFor={id!} required={required}>
        {label}
      </FieldLabel>
      <input
        ref={ref}
        id={id}
        className={cn(baseFieldClass, error && "border-red-500/50", className)}
        {...props}
      />
      <FieldError message={error} />
    </div>
  ),
);
TextField.displayName = "TextField";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options: readonly string[];
}

export function SelectField({
  label,
  error,
  required,
  id,
  placeholder,
  options,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id!} required={required}>
        {label}
      </FieldLabel>
      <select
        id={id}
        className={cn(
          baseFieldClass,
          "cursor-pointer appearance-none pr-10",
          error && "border-red-500/50",
          className,
        )}
        style={{
          backgroundImage: CHEVRON_BG,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 16px center",
          backgroundSize: "16px",
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled className="bg-[#0b0e1a]">
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#0b0e1a]">
            {opt}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function TextareaField({
  label,
  error,
  required,
  id,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id!} required={required}>
        {label}
      </FieldLabel>
      <textarea
        id={id}
        className={cn(baseFieldClass, "resize-none", error && "border-red-500/50", className)}
        {...props}
      />
      <FieldError message={error} />
    </div>
  );
}
