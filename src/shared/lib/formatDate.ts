export const formatDate = (iso: string): string => {
  const date = new Date(iso);

  if (isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
