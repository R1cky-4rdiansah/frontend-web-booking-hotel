export const hari = (date) => {
  const d = new Date(date);
  const day = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(d);

  return day;
};

export const bulan = (date) => {
  const d = new Date(date);
  const month = new Intl.DateTimeFormat("en", {
    month: "short",
  }).format(d);

  return month;
};

export const year = (date) => {
  const d = new Date(date);
  const year = new Intl.DateTimeFormat("en", {
    year: "numeric",
  }).format(d);

  return year;
};
