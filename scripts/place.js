// Footer year + last modified
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");

  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;

  lastModifiedSpan.textContent = document.lastModified;
});

// Wind Chill Calculation
function calculateWindChill(tempC, windKmh) {
  return (
    13.12 +
    0.6215 * tempC -
    11.37 * Math.pow(windKmh, 0.16) +
    0.3965 * tempC * Math.pow(windKmh, 0.16)
  ).toFixed(1);
}

document.addEventListener("DOMContentLoaded", () => {
  const tempElement = document.getElementById("temp");
  const conditionsElement = document.getElementById("conditions");
  const windElement = document.getElementById("wind");
  const windChillElement = document.getElementById("windChill");

  const tempC = 10;
  const windKmh = 5;
  const conditions = "Partly Cloudy";

  tempElement.textContent = `${tempC}°C`;
  conditionsElement.textContent = conditions;
  windElement.textContent = `${windKmh} km/h`;

  if (tempC <= 10 && windKmh > 4.8) {
    windChillElement.textContent = `${calculateWindChill(tempC, windKmh)}°C`;
  } else {
    windChillElement.textContent = "N/A";
  }
});
