import {
  format,
  isToday,
  formatDistanceToNow,
  isYesterday,
  parseISO,
} from "date-fns";

//Capitalize first character of word
export const capitalizeFirstChar = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Capitalize all words
export const capitalizeWords = (string: string) => {
  return string.split(" ").map(capitalizeFirstChar).join(" ");
};

export const formatDateForFrontend = (dateString: string): string => {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");
  return `${month}-${day}-${year}`;
};

export const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

export const formattedTimestamp = (
  timestamp?: string | number | Date
): string => {
  if (!timestamp) return "Invalid Date";

  let date: Date;
  try {
    if (typeof timestamp === "string") {
      date = parseISO(timestamp);
    } else {
      date = new Date(timestamp);
    }

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    if (isToday(date)) {
      const hoursDiff = Math.abs(new Date().getHours() - date.getHours());
      if (hoursDiff < 1) {
        // Less than an hour ago
        const minutes = Math.floor(
          (new Date().getTime() - date.getTime()) / 60000
        );
        if (minutes < 1) return "Just now";
        if (minutes === 1) return "1 minute ago";
        return `${minutes} minutes ago`;
      }
      return `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hours"} ago`;
    }

    if (isYesterday(date)) {
      return "Yesterday";
    }

    // Use formatDistanceToNow for dates within the past year
    const distanceString = formatDistanceToNow(date, { addSuffix: true });

    // For dates more than a year ago, show the full date
    const yearsAgo = new Date().getFullYear() - date.getFullYear();
    if (yearsAgo > 1) {
      return format(date, "MMM d, yyyy");
    }

    return capitalizeFirstChar(distanceString);
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "Invalid Date";
  }
};

export const formatTimeForDisplay = (time: string) => {
  if (!time) return "";
  const [hour, minute] = time.split(":");
  let formattedHour = parseInt(hour, 10);
  const period = formattedHour >= 12 ? "PM" : "AM";

  if (formattedHour > 12) {
    formattedHour -= 12;
  } else if (formattedHour === 0) {
    formattedHour = 12;
  }

  return `${formattedHour}:${minute} ${period}`;
};

export const convertTo12HourFormat = (time: string) => {
  if (!time) return "";
  const [hour, minute] = time.split(":");
  let formattedHour = parseInt(hour, 10);
  const period = formattedHour >= 12 ? "PM" : "AM";

  if (formattedHour > 12) {
    formattedHour -= 12;
  } else if (formattedHour === 0) {
    formattedHour = 12;
  }

  return `${formattedHour}:${minute} ${period}`;
};
