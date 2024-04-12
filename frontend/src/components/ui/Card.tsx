import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren & { className?: string };

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-700 rounded-md shadow-lg m-1 p-2 ${className}`}
    >
      {children}
    </div>
  );
}
