// Product data array
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Dynamically populate the Product Name <select>
function populateProducts() {
  const select = document.getElementById("productName");
  if (!select) return;

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;         // value = product id
    option.textContent = product.name; // display = product name
    select.appendChild(option);
  });
}

// Set footer year and last modified
function setFooter() {
  const yearEl = document.getElementById("currentYear");
  const modEl  = document.getElementById("lastMod");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl)  modEl.textContent  = document.lastModified;
}

document.addEventListener("DOMContentLoaded", () => {
  populateProducts();
  setFooter();
});
