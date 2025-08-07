export const simpleTimezones = [
  {
    "zone": "UTC",
    "gmt": "(GMT+00:00)",
    "name": "UTC"
  },
  {
    "zone": "Europe/London",
    "gmt": "(GMT+00:00)",
    "name": "London"
  },
  {
    "zone": "Europe/Paris",
    "gmt": "(GMT+01:00)",
    "name": "Paris"
  },
  {
    "zone": "Europe/Berlin",
    "gmt": "(GMT+01:00)",
    "name": "Berlin"
  },
  {
    "zone": "Europe/Rome",
    "gmt": "(GMT+01:00)",
    "name": "Rome"
  },
  {
    "zone": "Europe/Moscow",
    "gmt": "(GMT+03:00)",
    "name": "Moscow"
  },
  {
    "zone": "Asia/Dubai",
    "gmt": "(GMT+04:00)",
    "name": "Dubai"
  },
  {
    "zone": "Asia/Kolkata",
    "gmt": "(GMT+05:30)",
    "name": "India"
  },
  {
    "zone": "Asia/Colombo",
    "gmt": "(GMT+05:30)",
    "name": "Sri Lanka"
  },
  {
    "zone": "Asia/Dhaka",
    "gmt": "(GMT+06:00)",
    "name": "Bangladesh"
  },
  {
    "zone": "Asia/Bangkok",
    "gmt": "(GMT+07:00)",
    "name": "Bangkok"
  },
  {
    "zone": "Asia/Singapore",
    "gmt": "(GMT+08:00)",
    "name": "Singapore"
  },
  {
    "zone": "Asia/Hong_Kong",
    "gmt": "(GMT+08:00)",
    "name": "Hong Kong"
  },
  {
    "zone": "Asia/Tokyo",
    "gmt": "(GMT+09:00)",
    "name": "Tokyo"
  },
  {
    "zone": "Asia/Seoul",
    "gmt": "(GMT+09:00)",
    "name": "Seoul"
  },
  {
    "zone": "Australia/Sydney",
    "gmt": "(GMT+10:00)",
    "name": "Sydney"
  },
  {
    "zone": "Australia/Melbourne",
    "gmt": "(GMT+10:00)",
    "name": "Melbourne"
  },
  {
    "zone": "Pacific/Auckland",
    "gmt": "(GMT+12:00)",
    "name": "Auckland"
  },
  {
    "zone": "US/New_York",
    "gmt": "(GMT-05:00)",
    "name": "New York"
  },
  {
    "zone": "US/Chicago",
    "gmt": "(GMT-06:00)",
    "name": "Chicago"
  },
  {
    "zone": "US/Denver",
    "gmt": "(GMT-07:00)",
    "name": "Denver"
  },
  {
    "zone": "US/Los_Angeles",
    "gmt": "(GMT-08:00)",
    "name": "Los Angeles"
  },
  {
    "zone": "Canada/Toronto",
    "gmt": "(GMT-05:00)",
    "name": "Toronto"
  },
  {
    "zone": "Canada/Vancouver",
    "gmt": "(GMT-08:00)",
    "name": "Vancouver"
  },
  {
    "zone": "America/Sao_Paulo",
    "gmt": "(GMT-03:00)",
    "name": "Sao Paulo"
  },
  {
    "zone": "America/Mexico_City",
    "gmt": "(GMT-06:00)",
    "name": "Mexico City"
  },
  {
    "zone": "Africa/Cairo",
    "gmt": "(GMT+02:00)",
    "name": "Cairo"
  },
  {
    "zone": "Africa/Lagos",
    "gmt": "(GMT+01:00)",
    "name": "Lagos"
  },
  {
    "zone": "Africa/Johannesburg",
    "gmt": "(GMT+02:00)",
    "name": "Johannesburg"
  }
];

// Helper function to get timezone by name
export const getTimezoneByName = (name) => {
  return simpleTimezones.find(tz => tz.name === name);
};

// Helper function to get timezone by zone identifier
export const getTimezoneByZone = (zone) => {
  return simpleTimezones.find(tz => tz.zone === zone);
};

// Helper function to get all timezones sorted by GMT offset
export const getTimezonesSortedByOffset = () => {
  return [...simpleTimezones].sort((a, b) => {
    const offsetA = parseInt(a.gmt.match(/GMT([+-]\d{2}):(\d{2})/)[1] + a.gmt.match(/GMT([+-]\d{2}):(\d{2})/)[2]);
    const offsetB = parseInt(b.gmt.match(/GMT([+-]\d{2}):(\d{2})/)[1] + b.gmt.match(/GMT([+-]\d{2}):(\d{2})/)[2]);
    return offsetA - offsetB;
  });
}; 