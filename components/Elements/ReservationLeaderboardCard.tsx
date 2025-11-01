import React from "react";

interface ReservationLeaderboardCardProps {
  rank: number;
  restaurantName: string;
  reservationsMade: number;
  reservationsCompleted: number;
  positionChange: number;
  associatedGroup: string;
}

const ReservationLeaderboardCard: React.FC<ReservationLeaderboardCardProps> = ({
  rank,
  restaurantName,
  reservationsMade,
  reservationsCompleted,
  positionChange,
  associatedGroup,
}) => {
  const isPositive = positionChange >= 0;
  const changeText = isPositive ? "Up" : "Down";
  const absChange = Math.abs(positionChange);

  return (
    <article 
      className="relative overflow-hidden rounded-lg bg-gray-700 p-6 border border-gray-600 text-white shadow-sm min-h-[240px] flex flex-col"
      aria-label={`Rank ${rank} in reservations: ${restaurantName}`}
    >
      {/* Header with rank, restaurant name and icon */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-white">#{rank}</span>
            <span className="text-sm text-gray-300">in Reservations</span>
          </div>
          <h3 className="text-base font-semibold text-white leading-tight">{restaurantName}</h3>
        </div>
        {/* Icon container - top right (star) */}
        <div 
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-300 text-black flex-shrink-0 ml-3"
          aria-hidden="true"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      </div>

      {/* Reservation Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">No of Reservations Made:</span>
          <span className="font-semibold text-white">{reservationsMade.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">No of Reservations Completed:</span>
          <span className="font-semibold text-white">{reservationsCompleted.toLocaleString()}</span>
        </div>
      </div>

      {/* Associated Group */}
      <div className="mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Associated Group:</span>
          <span className="font-semibold text-white">{associatedGroup}</span>
        </div>
      </div>

      {/* Position Change Trend */}
      <div className={`inline-flex items-center gap-1.5 w-fit ${
        isPositive ? 'bg-green-400/30 text-green-300' : 'bg-red-400/30 text-red-300'
      } px-3 py-1.5 rounded-full text-xs font-medium mt-auto`}>
        <svg
          className={`w-3 h-3 ${isPositive ? 'text-green-300' : 'text-red-300'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isPositive ? (
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
          {changeText} {absChange} {absChange === 1 ? 'position' : 'positions'} from last month
        </span>
      </div>
    </article>
  );
};

export default ReservationLeaderboardCard;

