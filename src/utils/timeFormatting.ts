export function timeStr(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h24",
  });
  return formatter.format(date);
}

export function dateStr(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short", // Don't use numeric because we don't want to guess if 03/05/2025 is in March or May
    day: "2-digit",
    hourCycle: "h24",
  });
  return formatter.format(date);
}

export function shortDateStr(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hourCycle: "h24",
  });
  return formatter.format(date);
}
