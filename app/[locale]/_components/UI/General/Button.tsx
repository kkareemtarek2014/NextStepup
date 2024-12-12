import { Link } from "@/navigation";
import { JSX, ReactNode } from "react";
import SpinnerIcon from "../../Icons/SpinnerIcon";
import ArrowIcon from "../../Icons/ArrowIcon";

interface Props {
  button_type?:
    | "primary"
    | "secondary"
    | "secondary2"
    | "bordered"
    | "primary2";
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  isBlock?: boolean;
  width?: string;
  isLoading?: boolean;
  border?: "none" | "solid" | "dashed";
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  bigger?: boolean;
  noPadding?: boolean;
  iconComponent?: React.ReactNode | string;
  iconClassName?: string;
}

const textSize: Record<string, string> = {
  primary: "text-base font-semibold",
  primary2: "text-sm font-semibold",
  secondary: "text-lg font-semibold",
};

const backgroundColors: Record<string, string> = {
  primary: "bg-Primary hover:bg-PrimaryHover",
  primary2:
    "bg-lightPurple hover:bg-PrimaryHover text-Primary hover:text-white",
  secondary: "bg-gray-200 hover:bg-gray-300",
  secondary2: "bg-PrimaryDark hover:bg-PrimaryHover text-lightPurple",
  bordered:
    "bg-white hover:bg-Primary text-Primary border border-2 hover:text-white hover:border-Primary",
};

const color: Record<string, string> = {
  primary: "text-white",
  secondary: "text-black",
};

const Button = ({
  button_type = "primary",
  type = "button",
  className = "",
  disabled = false,
  children,
  onClick,
  href,
  target,
  isBlock = true,
  width,
  isLoading,
  iconComponent,
  iconClassName,
  ariaLabel,
  bigger,
  noPadding,
}: Props): JSX.Element => {
  const disabledStyle =
    disabled || isLoading
      ? "opacity-50 cursor-not-allowed"
      : "transition ease-in-out duration-300 hover:cursor-pointer";
  const padding = noPadding ? "" : bigger ? "py-4 px-6" : "py-2 px-4";
  const fontSize = bigger ? "text-lg font-bold" : textSize[type] || "";

  let baseClasses = [
    // "uppercase",
    "rounded-full",
    fontSize,
    backgroundColors[type] || "",
    color[type] || "",
    padding,
    disabledStyle,
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
  ];

  if (className) {
    baseClasses = [...baseClasses, ...className.split(" ")];
  }
  if (isBlock) {
    baseClasses = [...baseClasses, "block w-full"];
  }
  if (!isBlock) {
    baseClasses = [...baseClasses, "inline-block w-fit"];
  }
  if (width) {
    baseClasses = [...baseClasses, width];
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <span
          className="flex items-center gap-2"
          aria-live="polite"
          aria-busy="true"
        >
          Loading...
          <span className="mr-2 h-5 w-5 animate-spin" aria-hidden="true">
            <SpinnerIcon />
          </span>
        </span>
      );
    }
    const renderIcon = () => {
      if (typeof iconComponent === "string") {
        return (
          <img
            src={iconComponent}
            alt="icon"
            width={24}
            height={24}
            className={`${iconClassName ? `${iconClassName}  ` : ""} 
            `}
          />
        );
      }
      return iconComponent;
    };
    return (
      <>
        {children}
        {renderIcon()}
      </>
    );
  };

  if (href) {
    let linkClasses = [
      ...baseClasses,
      "flex items-center justify-center whitespace-nowrap w-fit",
    ];
    return (
      <Link
        href={href}
        target={target}
        onClick={onClick}
        className={linkClasses.join(" ")}
        aria-label={ariaLabel ?? `Open ${children}`}
      >
        {renderContent()}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses.join(" ")}
      disabled={disabled || isLoading}
      aria-label={ariaLabel ?? `Open ${children}`}
      type={type}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
