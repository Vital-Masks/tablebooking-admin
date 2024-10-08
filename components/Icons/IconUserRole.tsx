import { FC } from 'react';

interface IconUserRoleProps {
  className?: string;
}

const IconUserRole: FC<IconUserRoleProps> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle opacity="0.4" cx="15" cy="6" r="3" fill="currentColor" />
      <ellipse
        opacity="0.4"
        cx="16"
        cy="17"
        rx="5"
        ry="3"
        fill="currentColor"
      />
      <circle cx="9.00098" cy="6" r="4" fill="currentColor" />
      <ellipse cx="9.00098" cy="17.001" rx="7" ry="4" fill="currentColor" />
    </svg>
  );
};

export default IconUserRole;
