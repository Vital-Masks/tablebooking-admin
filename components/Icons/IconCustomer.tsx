import { FC } from 'react';

interface IconCustomersProps {
    className?: string;
}

const IconCustomers: FC<IconCustomersProps> = ({ className }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path
                d="M15.5 8C15.5 9.933 13.933 11.5 12 11.5C10.067 11.5 8.5 9.933 8.5 8C8.5 6.067 10.067 4.5 12 4.5C13.933 4.5 15.5 6.067 15.5 8Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M12 13.5C9.51472 13.5 7.5 15.5147 7.5 18H16.5C16.5 15.5147 14.4853 13.5 12 13.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20.5 8.5C20.5 9.32843 19.8284 10 19 10C18.1716 10 17.5 9.32843 17.5 8.5C17.5 7.67157 18.1716 7 19 7C19.8284 7 20.5 7.67157 20.5 8.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M19 12C20.5977 12 22 13.4023 22 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.5 8.5C6.5 9.32843 5.82843 10 5 10C4.17157 10 3.5 9.32843 3.5 8.5C3.5 7.67157 4.17157 7 5 7C5.82843 7 6.5 7.67157 6.5 8.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M5 12C3.40232 12 2 13.4023 2 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default IconCustomers;
