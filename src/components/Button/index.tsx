import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: ButtonProps) {
  return (
    <button
      className=" disabled:opacity-60	disabled:cursor-not-allowed px-8 bg-purple-600 text-white h-[50px]  rounded-lg flex justify-center items-center cursor-pointer border-0 text-base hover:brightness-90  transition-[filter] duration-200 shadow-md font-medium"
      {...props}
    />
  );
}

export default Button;
