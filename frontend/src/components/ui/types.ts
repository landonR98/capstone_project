import { CSSProperties, PropsWithChildren } from "react";

export type STDProps = {
  className?: string;
  style?: CSSProperties;
};

export type STDPropsWithChildren = PropsWithChildren & STDProps;
