//responsive nav menu
const hamburger = document.querySelector(".hamburger");
const siteNav = document.querySelector(".site-nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  siteNav.classList.toggle("active");
});

document.querySelectorAll("nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    siteNav.classList.remove("active");
  })
);
