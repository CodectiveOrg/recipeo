type Result = {
  message: string;
  icon: string;
};

export function useGreetingsHook(): Result {
  const hours = new Date().getHours();
  if (hours < 4) return results.night;
  if (hours < 11) return results.morning;
  if (hours < 15) return results.noon;
  if (hours < 19) return results.afternoon;
  if (hours < 21) return results.earlyEvening;
  if (hours < 24) return results.evening;
  return results.night;
}

const results = {
  morning: { icon: "sun-fog-linear", message: "Good Morning" },
  noon: { icon: "sun-2-linear", message: "Welcome Back" },
  afternoon: { icon: "sun-2-linear", message: "Good Afternoon" },
  earlyEvening: { icon: "sun-linear", message: "Good Evening" },
  evening: { icon: "moon-linear", message: "Good Evening" },
  night: { icon: "moon-stars-linear", message: "Good Night" },
} satisfies Record<string, Result>;
