import React from 'react';
import IconCheck from '../Icons/IconCheck';
import toast from 'react-hot-toast';

type ToastBannerProps = {
  t: any;
  type: 'SUCCESS' | 'ERROR';
  message: string;
  detail?: string;
};

const ToastBanner = ({ t, type, message, detail }: ToastBannerProps) => {
  const bannerType = {
    SUCCESS: {
      bgColor: 'bg-green-50',
      ringColor: 'ring-green-300',
      iconBgColor: 'bg-green-400',
      iconTextColor: 'text-green-400',
    },
    ERROR: {
      bgColor: 'bg-red-50',
      ringColor: 'ring-red-300',
      iconBgColor: 'bg-red-400',
      iconTextColor: 'text-red-400',
    },
  };

  const currentType = bannerType[type];

  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full ${currentType.bgColor} shadow-lg rounded-lg pointer-events-auto flex ring-1 ${currentType.ringColor}`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 ${currentType.iconBgColor} flex items-center justify-center p-1 rounded-lg`}
          >
            <IconCheck
              className={`bg-white w-6 h-6 rounded-full ${currentType.iconTextColor}`}
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-500">{message}</p>
            {detail && <p className="text-xs text-gray-500">{detail}</p>}
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center font-medium text-sm text-gray-500 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ToastBanner;
