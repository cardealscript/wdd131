// Footer dynamic content
const year = document.getElementById("year");
const lastModified = document.getElementById("lastModified");

year.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

// Menu toggle
const menuButton = document.getElementById("menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");

  if (nav.classList.contains("open")) {
    menuButton.textContent = "X";
  } else {
    menuButton.textContent = "☰";
  }
});
