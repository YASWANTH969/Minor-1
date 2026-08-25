// Navigation Menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("#navMenu");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

document.querySelector("#year").textContent = new Date().getFullYear();

// Set default dates in modals to tomorrow
document.addEventListener("DOMContentLoaded", () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];
  if (document.getElementById("dDate")) document.getElementById("dDate").value = dateStr;
  if (document.getElementById("sDate")) document.getElementById("sDate").value = dateStr;
});

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Modal Handlers
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("active");
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("active");
}
function closeModalOnBackdrop(e, id) {
  if (e.target.id === id) closeModal(id);
}

function openDarshanModal() { openModal("darshanModal"); }
function openSevaModal() { openModal("sevaModal"); }
function openHundiModal() { openModal("hundiModal"); }
function openAccommodationModal() { openModal("accommodationModal"); }

function openSevaModalWith(sevaName) {
  const sel = document.getElementById("sSevaType");
  if (sel) {
    for (let opt of sel.options) {
      if (opt.value.includes(sevaName)) {
        sel.value = opt.value;
        break;
      }
    }
  }
  openSevaModal();
}

function openHundiModalWith(trustName) {
  const sel = document.getElementById("hTrust");
  if (sel) {
    for (let opt of sel.options) {
      if (opt.value.includes(trustName)) {
        sel.value = opt.value;
        break;
      }
    }
  }
  openHundiModal();
}

function setAmount(amt) {
  const inp = document.getElementById("hAmount");
  if (inp) inp.value = amt;
}

// Digital Pass & Receipt Generators
function generateDarshanPass(e) {
  e.preventDefault();
  const name = document.getElementById("dName").value.trim();
  const phone = document.getElementById("dPhone").value.trim();
  const count = document.getElementById("dCount").value;
  const date = document.getElementById("dDate").value;
  const slot = document.getElementById("dSlot").value;
  const tokenNo = "SRD-" + Math.floor(100000 + Math.random() * 900000);

  const output = document.getElementById("darshanPassOutput");
  output.style.display = "block";
  output.innerHTML = `
    <div class="pass-header">🚩 SRI RAMA TEMPLE DEVASTHANAM - e-DARSHAN PASS</div>
    <div class="pass-details">
      <div><b>Token No:</b> <span><strong>${tokenNo}</strong></span></div>
      <div><b>Pilgrim Name:</b> <span>${name}</span></div>
      <div><b>Pilgrims Count:</b> <span>${count} Person(s)</span></div>
      <div><b>Darshan Date:</b> <span>${date}</span></div>
      <div><b>Time Slot:</b> <span>${slot}</span></div>
      <div><b>Mobile:</b> <span>${phone}</span></div>
      <div><b>Status:</b> <span style="color:#16a34a;font-weight:700;">CONFIRMED ✓</span></div>
    </div>
    <div class="qr-preview">QR PASS</div>
    <small style="color:#782613;">Please present this digital token slip at the temple entrance during your reporting time slot.</small>
    <div style="margin-top:15px;">
      <button class="btn secondary" onclick="window.print()">🖨️ Print Pass Slip</button>
    </div>
  `;
}

function generateSevaTicket(e) {
  e.preventDefault();
  const seva = document.getElementById("sSevaType").value;
  const name = document.getElementById("sName").value.trim();
  const gothram = document.getElementById("sGothram").value.trim() || "N/A";
  const date = document.getElementById("sDate").value;
  const ticketNo = "SEVA-" + Math.floor(100000 + Math.random() * 900000);

  const output = document.getElementById("sevaTicketOutput");
  output.style.display = "block";
  output.innerHTML = `
    <div class="pass-header" style="background:#b45309;">🪔 ARJITHA SEVA CONFIRMATION TICKET</div>
    <div class="pass-details">
      <div><b>Seva Ticket No:</b> <span><strong>${ticketNo}</strong></span></div>
      <div><b>Seva Type:</b> <span>${seva}</span></div>
      <div><b>Devotee Name:</b> <span>${name}</span></div>
      <div><b>Gothram:</b> <span>${gothram}</span></div>
      <div><b>Seva Date:</b> <span>${date}</span></div>
      <div><b>Prasadam:</b> <span>Swamivari Laddu & Sheesh Prasadam</span></div>
    </div>
    <div class="qr-preview">SEVA QR</div>
    <small style="color:#782613;">Reporting time for Seva is 30 mins prior to scheduled time.</small>
  `;
}

function generateHundiReceipt(e) {
  e.preventDefault();
  const trust = document.getElementById("hTrust").value;
  const amt = document.getElementById("hAmount").value;
  const name = document.getElementById("hName").value.trim();
  const phone = document.getElementById("hPhone").value.trim();
  const recNo = "HUNDI-" + Math.floor(100000 + Math.random() * 900000);

  const output = document.getElementById("hundiReceiptOutput");
  output.style.display = "block";
  output.innerHTML = `
    <div class="pass-header" style="background:#15803d;">🪙 OFFICIAL SRIVARI e-HUNDI RECEIPT</div>
    <div class="pass-details">
      <div><b>Receipt No:</b> <span><strong>${recNo}</strong></span></div>
      <div><b>Donor Name:</b> <span>${name}</span></div>
      <div><b>Donation Trust:</b> <span>${trust}</span></div>
      <div><b>Amount Offered:</b> <span><strong>₹${amt}</strong></span></div>
      <div><b>UPI ID:</b> <span>sriramadevasthanam@upi</span></div>
      <div><b>Status:</b> <span style="color:#16a34a;font-weight:700;">SUCCESSFUL ✓</span></div>
    </div>
    <div class="qr-preview">UPI QR</div>
    <small style="color:#15803d;">May Lord Sri Sita Rama Swamy bless you and your family with peace and prosperity.</small>
  `;
}

function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const purpose = document.getElementById("purpose").value;
  const msg = document.getElementById("formMessage");
  msg.textContent = `Thank you, ${name}. Your enquiry regarding '${purpose}' has been submitted to the Sri Rama Temple committee.`;
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
  const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2]; // Harmonics

  freqs.forEach(f => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);

    // LFO Modulation for realistic ambient drone
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

function toggleLang() {
  alert("Language Preference: Telugu / English view active.");
}
