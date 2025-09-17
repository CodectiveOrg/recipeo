type DailyTimePeriods = "morning" | "afternoon" | "evening" | "night";

type greetingsMessageType = Record<DailyTimePeriods, string>;

export const greetingsIcons: greetingsMessageType = {
  morning: "sun-fog-linear",
  afternoon: "sun-linear",
  evening: "moon-fog-linear",
  night: "moon-stars-linear",
};

export function getTime(): DailyTimePeriods {
  const currHour = new Date().getHours();

  if (6 <= currHour && currHour < 12) return "morning";
  if (12 <= currHour && currHour < 18) return "afternoon";
  if (18 <= currHour && currHour < 24) return "evening";
  return "night";
}
