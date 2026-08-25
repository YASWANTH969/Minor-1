// Navigation Menu & Smooth Scroll to Home
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("#navMenu");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
}

document.querySelectorAll('nav a, .brand').forEach(link => {
  link.addEventListener("click", (e) => {
    if (nav) nav.classList.remove("open");
    const href = link.getAttribute("href");
    if (href === "#home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, null, '#home');
    }
  });
});

// Highlight Active Nav Link on Scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "home";
  const scrollY = window.scrollY + 120;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll("nav a").forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const purpose = document.getElementById("purpose").value;
  const msg = document.getElementById("formMessage");
  msg.textContent = `Thank you, ${name}. Your message regarding '${purpose}' has been sent to the Sri Rama Temple committee.`;
  e.target.reset();
}

// Lightbox Gallery
const galleryImages = [
  { src: 'images/sri_rama_idols.png', title: 'శ్రీ సీతారామ స్వామివారి మూలవిరాట్ అలంకారం • Sri Sita Rama Swamivari Moolavirat' },
  { src: 'images/sri_rama_garbhagriha.jpg', title: 'శ్రీరామ ఆలయ గర్భగుడి దర్శనం • Temple Garbhagriha Sanctum Entrance' }
];
let currentImgIndex = 0;

function openLightbox(src, title) {
  const foundIdx = galleryImages.findIndex(img => img.src === src);
  if (foundIdx !== -1) currentImgIndex = foundIdx;
  updateLightbox();
  document.getElementById("lightbox").classList.add("active");
}

function updateLightbox() {
  const imgData = galleryImages[currentImgIndex];
  if (imgData) {
    document.getElementById("lightboxImg").src = imgData.src;
    document.getElementById("lightboxTitle").textContent = imgData.title;
  }
}

function navLightbox(dir, e) {
  if (e) e.stopPropagation();
  currentImgIndex = (currentImgIndex + dir + galleryImages.length) % galleryImages.length;
  updateLightbox();
}

function closeLightbox(e) {
  if (!e || e.target.id === "lightbox" || e.target.classList.contains("lightbox-close")) {
    document.getElementById("lightbox").classList.remove("active");
  }
}

document.addEventListener("keydown", (e) => {
  const lb = document.getElementById("lightbox");
  if (!lb || !lb.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") navLightbox(-1);
  if (e.key === "ArrowRight") navLightbox(1);
});
