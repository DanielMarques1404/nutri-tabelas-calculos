import type { HTMLAttributes } from "react";

import { cn } from "../../lib/utils";

type ToggleOption<T extends string> = {
  label: string;
  value: T;
};

type ToggleProps<T extends string> = HTMLAttributes<HTMLDivElement> & {
  label: string;
  options: readonly [ToggleOption<T>, ToggleOption<T>];
  value: T;
  onValueChange: (value: T) => void;
};

export const Toggle = <T extends string>({
  label,
  options,
  value,
  onValueChange,
  className = "",
  ...props
}: ToggleProps<T>) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 rounded-lg border border-slate-300 p-2 transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20",
        className,
      )}
      {...props}
    >
      <span className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-slate-700">
        {label}
      </span>
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
        {options.map((option) => (
          <button
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer",
              value === option.value && "bg-white text-slate-950 shadow-sm",
            )}
            key={option.value}
            onClick={() => onValueChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
