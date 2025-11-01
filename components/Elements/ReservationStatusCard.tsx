import React from "react";

interface ReservationStatusCardProps {
  title: string;
  value: number;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  icon: React.ReactNode;
}

const ReservationStatusCard: React.FC<ReservationStatusCardProps> = ({
  title,
  value,
  trend,
  icon,
}) => {
  return (
    <article 
      className="relative overflow-hidden rounded-lg bg-gray-700 p-6 border border-gray-600 text-white shadow-sm min-h-[160px] flex flex-col"
      aria-label={`${title} reservation status card`}
    >
      {/* Header with title and icon */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white mb-2">{title}</h3>
          <p className="text-3xl font-bold text-white leading-tight" aria-label={`Value: ${value.toLocaleString()}`}>
            {value.toLocaleString()}
          </p>
        </div>
        {/* Icon container - top right */}
        <div className="flex h-10 w-10 items-center justify-center flex-shrink-0 ml-3" aria-hidden="true">
          {icon}
        </div>
      </div>

      {/* Trend indicator - bottom */}
      {trend && (
        <div className={`inline-flex items-center gap-1.5 w-fit ${
          trend.isPositive ? 'bg-green-400/30 text-green-300' : 'bg-red-400/30 text-red-300'
        } px-3 py-1.5 rounded-full text-xs font-medium mt-auto`}>
          <svg
            className={`w-3 h-3 ${trend.isPositive ? 'text-green-300' : 'text-red-300'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {trend.isPositive ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l3-3 3 3 6-6 6 6"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l3 3 3-3 6 6 6-6"
              />
            )}
          </svg>
          <span>
            {Math.abs(trend.value)}% {trend.label || "from last month"}
          </span>
        </div>
      )}
    </article>
  );
};

export default ReservationStatusCard;

