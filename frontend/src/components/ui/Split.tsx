import { STDProps } from "./types";

type props = STDProps & {
  lSplit: JSX.Element;
  rSplit: JSX.Element;
};
export function Split({ lSplit, rSplit, className, style }: props) {
  return (
    <div
      className={`grid pb-10 pt-10 md:grid-cols-2 sm:grid-cols-1 ${className}`}
      style={style}
    >
      {lSplit}
      {rSplit}
    </div>
  );
}
