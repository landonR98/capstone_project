import { STDProps, STDPropsWithChildren } from "../types";

type SelectProps<T extends string> = {
  value: T;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: OptionEl<T> | OptionEl<T>[];
} & STDProps;

export function Select<T extends string>({
  value,
  onChange,
  children,
  className,
  style,
}: SelectProps<T>) {
  return (
    <select
      className={`p-1 rounded-md border-2 outline-none w-full border-slate-400 dark:bg-slate-200 dark:text-slate-800 ${className}`}
      style={style}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
}

type OptionProps<T extends string> = STDPropsWithChildren & { value: T };
type OptionEl<T extends string> = React.ReactElement<OptionProps<T>>;

export function Option<T extends string>({
  value,
  children,
  className,
  style,
}: OptionProps<T>) {
  return (
    <option
      className={`p-1 rounded-md border-2 outline-none w-full border-slate-400 dark:bg-slate-200 dark:text-slate-800 ${className}`}
      style={style}
      value={value}
    >
      {children}
    </option>
  );
}
