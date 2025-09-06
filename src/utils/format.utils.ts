export function formatDuration(value: number): string {
  if (value < 60) {
    return `${value} Min`;
  }

  const hours = Math.floor(value / 60);
  const minutes = value - 60 * hours;

  return `${pad2(hours)}:${pad2(minutes)}`;
}

export function pad2(value: number | string): string {
  return value.toString().padStart(2, "0");
}
