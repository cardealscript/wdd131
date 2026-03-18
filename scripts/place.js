// Current Year
document.querySelector('#currentYear').textContent = new Date().getFullYear();

// Last Modified
document.querySelector('#lastModified').textContent = document.lastModified;

// Static weather values
const temperature = 28; // °C
const windSpeed = 15;   // km/h

// Wind Chill Function (Metric formula)
function calculateWindChill(temp, wind) {
  return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
}

// Check conditions before calculating
if (temperature <= 10 && windSpeed > 4.8) {
  document.querySelector('#windchill').textContent = calculateWindChill(temperature, windSpeed) + ' °C';
} else {
  document.querySelector('#windchill').textContent = 'N/A';
}