import { useEffect, useRef, useState } from 'react';
import { Options, Calendar } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Options,
}

function VanillaCalendar({ config, ...attributes }: CalendarProps) {
  const ref = useRef(null);
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const configRef = useRef(config);

  // Update config ref when config changes
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    if (!ref.current) return;
    
    // Create calendar instance only once
    const calendarInstance = new Calendar(ref.current, configRef.current);
    setCalendar(calendarInstance);
  }, [ref]); // Only recreate when ref changes, not when config changes

  useEffect(() => {
    if (!calendar) return;
    
    // Initialize calendar
    calendar.init();

    return () => {
      if (calendar && typeof calendar.destroy === 'function') {
        calendar.destroy();
      }
    }
  }, [calendar]);

  return (
    <div {...attributes} ref={ref}></div>
  )
}

export default VanillaCalendar;
