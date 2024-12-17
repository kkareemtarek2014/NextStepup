interface ArrowDownIconProps {
  className?: string;
  handleScrollClick?: () => void;
}

const ArrowDownIcon = ({
  className,
  handleScrollClick,
}: ArrowDownIconProps) => {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7918 4L15.7918 27.2367M28 16.4804L16 28L4 16.4804"
        stroke="white"
        strokeWidth="1.33333"
      />
    </svg>
  );
};

export default ArrowDownIcon;
