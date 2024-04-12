import { STDPropsWithChildren } from "./types";

export function H1({ children, className, style }: STDPropsWithChildren) {
  return (
    <h1 className={` text-xl ${className}`} style={style}>
      {children}
    </h1>
  );
}
