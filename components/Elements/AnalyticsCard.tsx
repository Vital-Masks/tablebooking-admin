import React from "react";

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  loading?: boolean;
  isCurrency?: boolean;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon,
  trend,
  loading = false,
  isCurrency = false,
}) => {
  const formatValue = (val: number | string): string => {
    if (typeof val === "number") {
      if (isCurrency) {
        return val.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
      return val.toLocaleString("en-US");
    }
    return val;
  };

  return (
    <article 
      className="relative overflow-hidden rounded-lg bg-gray-700 p-6 border border-gray-600 text-white shadow-sm min-h-[160px] flex flex-col"
      aria-label={`${title} metric card`}
    >
      {/* Header with title and icon */}
      <div className="relative flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white mb-2">{title}</h3>
          {/* Value */}
          {loading ? (
            <div className="h-10 w-32 bg-gray-600 rounded animate-pulse" aria-hidden="true"></div>
          ) : (
            <p className="text-3xl font-bold text-white leading-tight" aria-label={`Value: ${formatValue(value)}`}>
              {formatValue(value)}
            </p>
          )}
        </div>
        {/* Icon container - top right */}
        <div 
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-300 text-black flex-shrink-0 ml-3"
          aria-hidden="true"
        >
          <div className="w-6 h-6">{icon}</div>
        </div>
      </div>

      {/* Separator line */}
      <div className="h-px bg-gray-600 my-4"></div>

      {/* Trend indicator - bottom */}
      {trend && !loading && (
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

export default AnalyticsCard;
