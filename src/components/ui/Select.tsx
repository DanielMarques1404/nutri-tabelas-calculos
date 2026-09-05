import type { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
}

export const Select = ({ label, id, className = '', children, ...props }: SelectProps) => {
  const selectId = id ?? label

  return (
    <div className={`flex flex-col w-full gap-2 rounded-lg border border-slate-300 p-2 transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 ${props.disabled ? "opacity-50" : ""}`}>
      <label htmlFor={selectId} className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        className={`w-full border-0 bg-transparent p-2 outline-none ${className}`}
        id={selectId}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}
