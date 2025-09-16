import { FC } from 'react';

interface IconFilterProps {
  className?: string;
}

const IconFilter: FC<IconFilterProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M3 7h18M6 12h12M9 17h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="18"
        cy="7"
        r="2"
        fill="currentColor"
      />
      <circle
        cx="9"
        cy="12"
        r="2"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="17"
        r="2"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconFilter;
