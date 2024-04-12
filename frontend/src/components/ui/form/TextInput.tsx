import { STDProps, STDPropsWithChildren } from "../types";

type TextInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & STDProps;

const style = `p-1 rounded-md border-2 outline-none w-full border-slate-400 dark:bg-slate-200 dark:text-slate-800`;

export function EmailInput({ value, onChange, className }: TextInputProps) {
  return (
    <input
      className={`${style} ${className}`}
      type="email"
      pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+"
      value={value}
      onChange={onChange}
    />
  );
}

export function PasswordInput({ value, onChange, className }: TextInputProps) {
  return (
    <input
      className={`${style} ${className}`}
      type="password"
      value={value}
      onChange={onChange}
    />
  );
}

export function TextInput({ value, onChange, className }: TextInputProps) {
  return (
    <input
      className={`${style} ${className}`}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

export function NumberInput({ value, onChange, className }: TextInputProps) {
  return (
    <input
      className={`${style} ${className}`}
      type="number"
      value={value}
      onChange={(event) => {
        event.target.value = event.target.value.replace(/[^\d]+/g, "");
        onChange(event);
      }}
    />
  );
}

export function InputContainer({
  error,
  label,
  children,
  style,
  className,
}: { error?: string; label?: string } & STDPropsWithChildren) {
  return (
    <label style={style} className={className}>
      {label}:
      <br />
      {children}
      {error !== undefined && error !== "" ? (
        <p className=" text-red-500">*{error}</p>
      ) : null}
    </label>
  );
}
