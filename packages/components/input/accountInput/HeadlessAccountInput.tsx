import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

interface HeadlessAccountInputProps {
  className?: string;
  children: ReactNode;
}

interface HeadlessAccountInputContextProps {
  isShow: boolean;
  handleClick: () => void;
}

const Context = createContext<HeadlessAccountInputContextProps>({
  isShow: false,
  handleClick: () => {},
});

const HeadlessAccountInput = ({
  className,
  children,
}: HeadlessAccountInputProps) => {
  const [isShow, setIsShow] = useState(false);

  const handleClick = (): void => {
    setIsShow(!isShow);
  };

  return (
    <Context.Provider value={{ isShow, handleClick }}>
      <div className={className}>{children}</div>
    </Context.Provider>
  );
};

interface InputProps {
  className?: string;
  disabled: boolean;
  maxLength: number;
  type: "text" | "email" | "password";
  register: UseFormRegisterReturn<string>;
  handleFocus: () => void;
}

const Input = ({
  className,
  type,
  maxLength,
  disabled,
  register,
  handleFocus,
}: InputProps) => {
  const { isShow } = useContext(Context);

  const inputType =
    type === "password" ? (isShow ? "text" : "password") : "text";

  return (
    <input
      className={className}
      disabled={disabled}
      autoComplete={type === "password" ? "new-password" : type}
      maxLength={maxLength}
      type={inputType}
      onFocus={handleFocus}
      {...register}
    />
  );
};

interface ButtonProps {
  className?: string;
  renderIcon: (isShow: boolean) => ReactNode;
}

const Button = ({ className, renderIcon }: ButtonProps) => {
  const { isShow, handleClick } = useContext(Context);

  return (
    <button className={className} type="button" onClick={handleClick}>
      {renderIcon(isShow)}
    </button>
  );
};

interface LabelProps {
  className?: string;
  id: string;
  label: Languages;
}

const Label = ({ className, id, label }: LabelProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <label className={className} htmlFor={id}>
      {defaultLanguage(label)}
    </label>
  );
};

HeadlessAccountInput.Input = Input;
HeadlessAccountInput.Button = Button;
HeadlessAccountInput.Label = Label;

export default HeadlessAccountInput;
