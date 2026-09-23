import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Input = ({ label, id, className = "", ...props }: InputProps) => {
  const inputId = id ?? label;
  const isCheckbox = props.type === "checkbox";

  return (
    <div className={`flex flex-col w-full gap-2 rounded-lg border border-slate-300 p-2 transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 ${props.disabled ? "opacity-50" : ""}`}>
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-slate-700 bg-amber-100 px-4 py-2 rounded-lg"
      >
        {label}
      </label>
      <input
        className={`${isCheckbox ? "h-5 w-5 self-center accent-cyan-600" : "w-full p-2"} border-0 bg-transparent outline-none ${className}`}
        id={inputId}
        {...props}
      />
    </div>
  );
};
