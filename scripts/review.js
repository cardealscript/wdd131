// Product data array (needed to look up product name from id)
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 },
];

// Set footer year and last modified
function setFooter() {
  const yearEl = document.getElementById("currentYear");
  const modEl = document.getElementById("lastMod");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = document.lastModified;
}

// Increment and display localStorage review counter
function updateCounter() {
  let count = parseInt(localStorage.getItem("reviewCount") || "0");
  count++;
  localStorage.setItem("reviewCount", count);
  const el = document.getElementById("reviewCount");
  if (el) el.textContent = count;
}

// Parse URL params and build summary list
function buildSummary() {
  const params = new URLSearchParams(window.location.search);
  const productRaw = params.get("productName") || "";
  const rating = params.get("rating") || "";
  const date = params.get("installDate") || "";
  const features = params.getAll("features");
  const review = params.get("writtenReview") || "";
  const userName = params.get("userName") || "Anonymous";

  // Look up product name from id
  const productObj = products.find((p) => p.id === productRaw);
  const productName = productObj ? productObj.name : productRaw || "—";

  // Build star display
  const filled = "\u2605"; // ★
  const empty = "\u2606"; // ☆
  const stars = rating
    ? filled.repeat(Number(rating)) + empty.repeat(5 - Number(rating))
    : "—";

  // Format date
  const dateDisplay = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const summaryList = document.getElementById("summaryList");
  if (!summaryList) return;

  const rows = [
    { label: "Product", value: productName, isHTML: false },
    {
      label: "Rating",
      value: `<span class="stars-inline">${stars}</span>`,
      isHTML: true,
    },
    { label: "Install Date", value: dateDisplay, isHTML: false },
    {
      label: "Features",
      value: features.length ? features.join(", ") : "None selected",
      isHTML: false,
    },
    {
      label: "Review",
      value: review || "No written review provided",
      isHTML: false,
    },
    { label: "Reviewer", value: userName, isHTML: false },
  ];

  rows.forEach((row) => {
    const dt = document.createElement("dt");
    dt.textContent = row.label;
    const dd = document.createElement("dd");
    if (row.isHTML) {
      dd.innerHTML = row.value;
    } else {
      dd.textContent = row.value;
    }
    summaryList.appendChild(dt);
    summaryList.appendChild(dd);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setFooter();
  updateCounter();
  buildSummary();
});
