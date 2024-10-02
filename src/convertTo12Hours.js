// Convert 24 to 12 hr format
export default function convertTo12Hour(time24) {
    if (!time24) return;
    let [hours, minutes] = time24.split(":");
    hours = parseInt(hours);

    // Handle the edge case for "24:00"
    if (hours === 24) {
      hours = 0;
    }

    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${suffix}`;
  }