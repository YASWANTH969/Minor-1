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

// Devotional Sound Synthesizer & Audio Player (Sri Rama Song)
let audioCtx = null;
let isPlayingAudio = false;
let melodyInterval = null;

function toggleAudio() {
  const audio = document.getElementById("sriRamaAudio");
  const icon = document.getElementById("audioIcon");
  const label = document.querySelector(".audio-label");

  if (isPlayingAudio) {
    if (audio) { audio.pause(); audio.currentTime = 0; }
    if (audioCtx) audioCtx.suspend();
    if (melodyInterval) clearInterval(melodyInterval);
    isPlayingAudio = false;
    if (icon) icon.textContent = "🎵";
    if (label) label.textContent = "శ్రీరామ గానం (Play)";
  } else {
    // Start Carnatic Flute Melody + Tanpura Drone Synth immediately
    playSriRamaMelody();
    isPlayingAudio = true;
    if (icon) icon.textContent = "🔊";
    if (label) label.textContent = "శ్రీరామ గానం (Playing)";

    // Try HTML5 Audio Stream simultaneously
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(err => {
        console.log("Stream play info:", err);
      });
    }
  }
}

function playSriRamaMelody() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // 1. Tanpura Drone Background
  const baseFreq = 136.1; // C# OM drone
  [baseFreq, baseFreq * 1.5, baseFreq * 2].forEach(f => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
  });

  // 2. Carnatic Sri Rama Song Melody ('Sri Rama Rama Rameti')
  // Frequencies for Raga Shankarabharanam notes (Sa Re Ga Ma Pa Dha Ni Sa')
  const notes = {
    'S': 272.2,
    'R': 306.0,
    'G': 340.5,
    'M': 363.0,
    'P': 408.3,
    'D': 453.6,
    'N': 510.4,
    "S'": 544.4
  };

  // 'Sri Ra-ma Ra-ma Ra-me-ti' sequence
  const songSequence = [
    { note: 'S', duration: 400 },
    { note: 'G', duration: 400 },
    { note: 'P', duration: 600 },
    { note: 'P', duration: 400 },
    { note: 'M', duration: 400 },
    { note: 'G', duration: 400 },
    { note: 'R', duration: 400 },
    { note: 'S', duration: 600 },

    { note: 'G', duration: 400 },
    { note: 'P', duration: 400 },
    { note: 'D', duration: 400 },
    { note: "S'", duration: 600 },
    { note: 'N', duration: 400 },
    { note: 'D', duration: 400 },
    { note: 'P', duration: 600 },

    { note: 'P', duration: 400 },
    { note: "S'", duration: 400 },
    { note: "S'", duration: 400 },
    { note: 'N', duration: 400 },
    { note: 'D', duration: 400 },
    { note: 'P', duration: 400 },
    { note: 'M', duration: 400 },
    { note: 'G', duration: 600 },

    { note: 'G', duration: 400 },
    { note: 'M', duration: 400 },
    { note: 'P', duration: 400 },
    { note: 'G', duration: 400 },
    { note: 'R', duration: 400 },
    { note: 'S', duration: 800 }
  ];

  let step = 0;
  function playNoteStep() {
    if (!isPlayingAudio) return;
    const current = songSequence[step];
    const freq = notes[current.note];

    if (freq && audioCtx) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle'; // Flute-like tone
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (current.duration / 1000));

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + (current.duration / 1000));
    }

    step = (step + 1) % songSequence.length;
  }

  playNoteStep();
  if (melodyInterval) clearInterval(melodyInterval);
  melodyInterval = setInterval(playNoteStep, 450);
}
