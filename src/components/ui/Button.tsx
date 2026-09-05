import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ className = '', children, type = 'button', ...props }: ButtonProps) => {
  return (
    <button
      className={`w-full rounded-lg border border-slate-300 bg-transparent p-4 font-medium text-slate-700 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
