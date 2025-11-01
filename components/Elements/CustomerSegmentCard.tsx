import React from "react";

interface CustomerSegmentCardProps {
  title: string;
  value: number;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
}

const CustomerSegmentCard: React.FC<CustomerSegmentCardProps> = ({
  title,
  value,
  trend,
}) => {
  return (
    <article 
      className="relative overflow-hidden rounded-lg bg-gray-700 p-6 border border-gray-600 text-white shadow-sm min-h-[160px] flex flex-col"
      aria-label={`${title} customer segment card`}
    >
      {/* Header with title and icon */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white mb-2">{title}</h3>
          <p className="text-3xl font-bold text-white leading-tight" aria-label={`Value: ${value.toLocaleString()}`}>
            {value.toLocaleString()}
          </p>
        </div>
        {/* Icon container - top right (person silhouette) */}
        <div 
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-300 text-black flex-shrink-0 ml-3"
          aria-hidden="true"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
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

export default CustomerSegmentCard;

