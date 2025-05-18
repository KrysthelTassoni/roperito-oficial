export function formatRelativeTime(dateString) {
  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
  const now = new Date();
  const then = new Date(dateString);
  const diffInSeconds = Math.floor((now - then) / 1000); // Cambié aquí el orden

  const divisions = [
    { amount: 60, unit: "second" },
    { amount: 60, unit: "minute" },
    { amount: 24, unit: "hour" },
    { amount: 30, unit: "day" },
    { amount: 12, unit: "month" },
    { amount: Infinity, unit: "year" },
  ];

  let duration = diffInSeconds;
  for (let i = 0; i < divisions.length; i++) {
    if (Math.abs(duration) < divisions[i].amount) {
      return rtf.format(Math.round(-duration), divisions[i].unit);
      // Nota: uso -duration para que sea "hace X", no "en X"
    }
    duration /= divisions[i].amount;
  }
}
