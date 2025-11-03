export function maskForIdleTime(minutes: number): string {
  if (!minutes || minutes <= 0) return "0 mins";

  const minutesInHour = 60;
  const minutesInDay = 24 * 60;

  if (minutes < minutesInHour) {
    return `${minutes} mins`;
  }

  if (minutes < minutesInDay) {
    const hours = Math.floor(minutes / minutesInHour);
    return hours === 1 ? `${hours} hora` : `${hours} horas`;
  }

  const days = Math.floor(minutes / minutesInDay);
  return days === 1 ? `${days} dia` : `${days} dias`;
}
