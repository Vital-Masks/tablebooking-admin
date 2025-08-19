import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  loading?: boolean;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color = 'primary',
  loading = false 
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      iconBg: 'bg-primary/20',
      border: 'border-primary/20'
    },
    success: {
      bg: 'bg-success/10',
      text: 'text-success',
      iconBg: 'bg-success/20',
      border: 'border-success/20'
    },
    warning: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      iconBg: 'bg-warning/20',
      border: 'border-warning/20'
    },
    danger: {
      bg: 'bg-danger/10',
      text: 'text-danger',
      iconBg: 'bg-danger/20',
      border: 'border-danger/20'
    },
    info: {
      bg: 'bg-info/10',
      text: 'text-info',
      iconBg: 'bg-info/20',
      border: 'border-info/20'
    }
  };

  const selectedColor = colorClasses[color];

  return (
    <div className={`group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-${color}/5 dark:bg-gray-800`}>
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-br from-${color}/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Icon container */}
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${selectedColor.iconBg} ${selectedColor.text} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
            <div className="text-xl">
              {icon}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex flex-col">
            {loading ? (
              <>
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
                <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {title}
                </h5>
              </>
            )}
          </div>
        </div>

        {/* Trend indicator */}
        {trend && !loading && (
          <div className="flex flex-col items-end space-y-1">
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              trend.isPositive ? 'text-success' : 'text-danger'
            }`}>
              <span className={trend.isPositive ? 'rotate-0' : 'rotate-180'}>
                ↗
              </span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              vs last month
            </span>
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${selectedColor.text} opacity-0 transition-all duration-300 group-hover:opacity-100`}></div>
    </div>
  );
};

export default AnalyticsCard;
