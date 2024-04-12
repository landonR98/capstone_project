import { PropsWithChildren } from "react";

type MainLayoutProps = PropsWithChildren;
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 text-black dark:text-white min-h-screen">
      {children}
    </div>
  );
}
