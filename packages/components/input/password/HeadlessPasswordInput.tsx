import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

interface HeadlessPasswordInputProps {
  className?: string;
  children: ReactNode;
}

const Context = createContext<{ isShow: boolean; handleClick: () => void }>({
  isShow: false,
  handleClick: () => {},
});

const HeadlessPasswordInput = ({
  className,
  children,
}: HeadlessPasswordInputProps) => {
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
  autoComplete: "on" | "off" | "new-password"; //TODO: 필수값 여부 논의 필요
  placeholder: Languages;
  register: UseFormRegisterReturn<string>;
}

const Input = ({
  className,
  autoComplete,
  placeholder,
  register,
}: InputProps) => {
  const { isShow } = useContext(Context);
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <input
      className={className}
      autoComplete={autoComplete}
      maxLength={20}
      placeholder={defaultLanguage({ text: placeholder })}
      type={isShow ? "text" : "password"}
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

HeadlessPasswordInput.Input = Input;
HeadlessPasswordInput.Button = Button;

export default HeadlessPasswordInput;
