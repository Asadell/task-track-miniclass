export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
