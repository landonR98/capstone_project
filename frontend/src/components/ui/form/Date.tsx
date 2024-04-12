import { STDProps } from "../types";

type DateInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & STDProps;

export function DateInput({
  value,
  onChange,
  className,
  style,
}: DateInputProps) {
  return (
    <input
      className={`p-1 rounded-md border-2 outline-none w-full border-slate-400 dark:bg-slate-200 dark:text-slate-800 ${className}`}
      style={style}
      type="date"
      value={value}
      onChange={onChange}
    />
  );
}
