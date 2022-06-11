import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: ButtonProps) {
  return (
    <button
      className="w-full disabled:opacity-60	disabled:cursor-not-allowed px-8 bg-indigo-500 dark:text-white mt-4 h-[50px] text-base rounded-lg flex justify-center items-center cursor-pointer border-0 text-[1.2rem] hover:brightness-90 transition-[filter] duration-200"
      {...props}
    />
  );
}

export default Button;
