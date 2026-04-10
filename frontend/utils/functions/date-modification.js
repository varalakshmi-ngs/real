// Converts ISO date string to readable month, day with suffix, and year
export const formatEventDate = (isoDateString) => {
  const date = new Date(isoDateString);
  if (isNaN(date)) {
    return {
      month: "",
      dayWithSuffix: "",
      year: "",
    };
  }

  const month = date.toLocaleString("en-US", { month: "long" }); // e.g., "July"
  const day = date.getDate();
  const year = date.getFullYear();

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return {
    month,
    dayWithSuffix: `${day}${getOrdinal(day)}`,
    year,
  };
};

// Converts date + time string to "Saturday, 2:00 PM" format
export const formatDayAndTime = (dateString, timeString) => {
  if (!timeString || !dateString) return "";

  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date(dateString);

  if (isNaN(hours) || isNaN(minutes) || isNaN(date.getTime())) {
    return "";
  }

  date.setHours(hours);
  date.setMinutes(minutes);

  const day = date.toLocaleString("en-US", { weekday: "long" }); // e.g., "Saturday"
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }); // e.g., "2:00 PM"

  return `${day}, ${time}`;
};
