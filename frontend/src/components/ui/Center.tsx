import { STDPropsWithChildren } from "./types";

export function Center({ children, className, style }: STDPropsWithChildren) {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
