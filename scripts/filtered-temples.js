// ── Footer dynamic content ──────────────────────────────────────────────────
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ── Menu toggle ──────────────────────────────────────────────────────────────
const menuButton = document.getElementById("menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.textContent = nav.classList.contains("open") ? "X" : "☰";
  menuButton.setAttribute("aria-expanded", nav.classList.contains("open"));
});

// ── Temple data ──────────────────────────────────────────────────────────────
// 7 original entries + 3 added by student = 10 total
const temples = [
  // --- Original 7 ---
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "images/temple1.jpg"
  },
  {
    templeName: "Mesa Arizona Temple",
    location: "Mesa, Arizona, United States",
    dedicated: "1927, October, 23",
    area: 113916,
    imageUrl: "images/temple2.jpg"
  },
  {
    templeName: "Nauvoo Illinois Temple",
    location: "Nauvoo, Illinois, United States",
    dedicated: "2002, June, 27",
    area: 54000,
    imageUrl: "images/temple3.jpg"
  },
  {
    templeName: "Provo Utah Temple",
    location: "Provo, Utah, United States",
    dedicated: "1972, February, 9",
    area: 130825,
    imageUrl: "images/temple4.jpg"
  },
  {
    templeName: "Ogden Utah Temple",
    location: "Ogden, Utah, United States",
    dedicated: "1972, January, 18",
    area: 112232,
    imageUrl: "images/temple5.jpg"
  },
  {
    templeName: "Los Angeles California Temple",
    location: "Los Angeles, California, United States",
    dedicated: "1956, March, 11",
    area: 190614,
    imageUrl: "images/temple6.jpg"
  },
  {
    templeName: "Washington D.C. Temple",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/temple7.jpg"
  },
  // --- 3 added by student ---
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/temple1.1.jpg"
  },
  {
    templeName: "Lima Peru Temple",
    location: "Lima, Peru",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/temple1.2.jpg"
  },
  {
    templeName: "Yigo Guam Temple",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/temple1.3.jpg"
  }
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function dedicatedYear(temple) {
  return parseInt(temple.dedicated.split(",")[0].trim(), 10);
}

// ── Render function ──────────────────────────────────────────────────────────
function renderTemples(list) {
  const album = document.getElementById("album");
  album.innerHTML = "";

  list.forEach(temple => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.width = 400;
    img.height = 250;
    img.loading = "lazy";

    const name = document.createElement("h3");
    name.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<span>Location:</span> ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<span>Dedicated:</span> ${temple.dedicated}`;

    const area = document.createElement("p");
    area.innerHTML = `<span>Area:</span> ${temple.area.toLocaleString()} sq ft`;

    figure.appendChild(img);
    figure.appendChild(name);
    figure.appendChild(location);
    figure.appendChild(dedicated);
    figure.appendChild(area);
    album.appendChild(figure);
  });
}

// ── Filter logic ─────────────────────────────────────────────────────────────
function filterTemples(filter) {
  let filtered;
  switch (filter) {
    case "old":
      filtered = temples.filter(t => dedicatedYear(t) < 1900);
      break;
    case "new":
      filtered = temples.filter(t => dedicatedYear(t) > 2000);
      break;
    case "large":
      filtered = temples.filter(t => t.area > 90000);
      break;
    case "small":
      filtered = temples.filter(t => t.area < 10000);
      break;
    default:
      filtered = temples;
  }
  renderTemples(filtered);
}

// ── Nav link click handlers ──────────────────────────────────────────────────
const navLinks = document.querySelectorAll("nav a[data-filter]");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    nav.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
    filterTemples(link.dataset.filter);
  });
});

// ── Initial render ───────────────────────────────────────────────────────────
renderTemples(temples);
navLinks[0].classList.add("active");