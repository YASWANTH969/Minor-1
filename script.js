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

// Telugu Sri Rama Devotional Audio Player
let audioCtx = null;
let isPlayingAudio = false;

function toggleAudio() {
  const audio = document.getElementById("sriRamaAudio");
  const icon = document.getElementById("audioIcon");
  const label = document.querySelector(".audio-label");

  if (isPlayingAudio) {
    if (audio) audio.pause();
    if (audioCtx) audioCtx.suspend();
    isPlayingAudio = false;
    if (icon) icon.textContent = "🎵";
    if (label) label.textContent = "శ్రీరామ గానం (Play)";
  } else {
    if (audio) {
      audio.play().then(() => {
        isPlayingAudio = true;
        if (icon) icon.textContent = "🔊";
        if (label) label.textContent = "శ్రీరామ గానం (Playing)";
      }).catch(err => {
        console.log("Audio stream fallback to synth:", err);
        playTanpuraDrone();
        isPlayingAudio = true;
        if (icon) icon.textContent = "🔊";
        if (label) label.textContent = "శ్రీరామ ధ్యానం (Playing)";
      });
    } else {
      playTanpuraDrone();
      isPlayingAudio = true;
      if (icon) icon.textContent = "🔊";
      if (label) label.textContent = "శ్రీరామ ధ్యానం (Playing)";
    }
  }
}

function playTanpuraDrone() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const baseFreq = 136.1; // Sacred C# OM Frequency
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
