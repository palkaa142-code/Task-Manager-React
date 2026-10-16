export const categories = [
  "Workshop",
  "Competition",
  "Seminar",
  "Cultural",
  "Sports"
];

export function getLastRegistrationDate(eventDate) {
  const date = new Date(`${eventDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysUntilEvent = Math.ceil((date - today) / 86400000);
  if (daysUntilEvent < 2) {
    return date;
  }

  date.setDate(date.getDate() - 2);
  return date;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function isRegistrationAvailable(event) {
  const lastDate = getLastRegistrationDate(event.date);
  lastDate.setHours(23, 59, 59, 999);
  return event.registrations < event.capacity && new Date() <= lastDate;
}

export function getRegistrationStatus(event) {
  if (event.registrations >= event.capacity) {
    return "Registration Full";
  }

  return isRegistrationAvailable(event) ? "Open" : "Registration Closed";
}
