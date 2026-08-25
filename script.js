// Navigation Menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("#navMenu");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

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

// Ambient Devotional Sound Synthesizer (Web Audio API)
let audioCtx = null;
let isPlayingAudio = false;

function toggleAudio() {
  const icon = document.getElementById("audioIcon");
  const label = document.querySelector(".audio-label");

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (isPlayingAudio) {
    if (audioCtx) audioCtx.suspend();
    isPlayingAudio = false;
    if (icon) icon.textContent = "🎵";
    if (label) label.textContent = "Sri Rama Chants";
  } else {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    playTanpuraDrone();
    isPlayingAudio = true;
    if (icon) icon.textContent = "🔊";
    if (label) label.textContent = "Chants Playing";
  }
}

function playTanpuraDrone() {
  if (!audioCtx) return;
  const baseFreq = 136.1; // OM Frequency (C# 136.1 Hz)
  const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2];

  freqs.forEach(f => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);

    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.2;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    lfo.start();
  });
}
