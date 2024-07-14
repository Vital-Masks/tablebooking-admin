import { FC } from 'react';

interface IconSettingsProps {
    className?: string;
}

const IconSettings: FC<IconSettingsProps> = ({ className }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path
                d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19.4 13C19.73 11.93 19.73 10.07 19.4 9M15.7 4.60001C14.87 3.32001 13.54 2.62001 12 2.62001C10.46 2.62001 9.13001 3.32001 8.30001 4.60001M4.60001 8.30001C3.32001 9.13001 2.62001 10.46 2.62001 12C2.62001 13.54 3.32001 14.87 4.60001 15.7M8.30001 19.4C9.13001 20.68 10.46 21.38 12 21.38C13.54 21.38 14.87 20.68 15.7 19.4M19.4 15.7C20.68 14.87 21.38 13.54 21.38 12C21.38 10.46 20.68 9.13001 19.4 8.30001"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default IconSettings;
