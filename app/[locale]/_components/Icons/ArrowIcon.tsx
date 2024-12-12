import { JSX } from "react";

interface ArrowIconProps {
  className?: string;
}

const ArrowIcon = ({ className = "" }: ArrowIconProps): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 12.1561H3.57249M11.6397 3L3 12L11.6397 21"
        stroke="currentColor"
      />
    </svg>
  );
};

export default ArrowIcon;
