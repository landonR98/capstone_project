import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren & {
  className?: string;
  onClick?: () => void;
};

export function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={` w-max p-1 px-3 bg-slate-500 text-white hover:bg-slate-600 active:bg-slate-500 
      dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300 dark:active:bg-slate-200 ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
