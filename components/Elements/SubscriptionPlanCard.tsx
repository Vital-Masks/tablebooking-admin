import React from "react";

interface SubscriptionPlanCardProps {
  title: string;
  total: number;
  monthlySubscribed: number;
  annuallySubscribed: number;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  title,
  total,
  monthlySubscribed,
  annuallySubscribed,
  trend,
}) => {
  return (
    <article 
      className="relative overflow-hidden rounded-lg bg-gray-700 p-6 border border-gray-600 text-white shadow-sm min-h-[200px] flex flex-col"
      aria-label={`${title} subscription plan card`}
    >
      {/* Header with title and icon */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white mb-2">{title}</h3>
          <p className="text-3xl font-bold text-white leading-tight" aria-label={`Total: ${total.toLocaleString()}`}>
            {total.toLocaleString()}
          </p>
        </div>
        {/* Icon container - top right (gold ribbon/medal) */}
        <div 
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-300 text-black flex-shrink-0 ml-3"
          aria-hidden="true"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
      </div>

      {/* Subscription Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Monthly Subscribed:</span>
          <span className="font-semibold text-white">{monthlySubscribed.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Annually Subscribed:</span>
          <span className="font-semibold text-white">{annuallySubscribed.toLocaleString()}</span>
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

export default SubscriptionPlanCard;

