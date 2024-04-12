import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type TextLinkProps = PropsWithChildren<{ to: string }>;

export function TextLink({ children, to }: TextLinkProps) {
  return (
    <Link to={to}>
      <button className="text-sky-700 hover:text-sky-300 dark:text-sky-300 dark:hover:text-sky-100 underline">
        {children}
      </button>
    </Link>
  );
}
