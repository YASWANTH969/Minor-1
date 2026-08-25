const menuBtn=document.querySelector(".menu-btn");
const nav=document.querySelector("#navMenu");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.querySelector("#year").textContent=new Date().getFullYear();

function showDonationMessage(){
  alert("Please replace the placeholder UPI/payment details with the official Sri Rama Temple donation details before publishing.");
}

function submitForm(e){
  e.preventDefault();
  const name=document.querySelector("#name").value.trim();
  const purpose=document.querySelector("#purpose").value;
  const msg=document.querySelector("#formMessage");
  msg.textContent=`Thank you, ${name}. Your ${purpose.toLowerCase()} enquiry has been recorded on this demo website.`;
  e.target.reset();
}

const galleryImages = [
  { src: 'images/sri_rama_idols.png', title: 'శ్రీ సీతారామ స్వామివారి మూలవిరాట్ అలంకారం • Sri Sita Rama Swamivari Moolavirat' },
  { src: 'images/sri_rama_garbhagriha.jpg', title: 'శ్రీరామ ఆలయ గర్భగుడి దర్శనం • Temple Garbhagriha Sanctum Entrance' }
];
let currentImgIndex = 0;

function openLightbox(src, title){
  const foundIdx = galleryImages.findIndex(img => img.src === src);
  if (foundIdx !== -1) {
    currentImgIndex = foundIdx;
  }
  updateLightbox();
  document.getElementById("lightbox").classList.add("active");
}

function updateLightbox(){
  const imgData = galleryImages[currentImgIndex];
  if(imgData){
    document.getElementById("lightboxImg").src = imgData.src;
    document.getElementById("lightboxTitle").textContent = imgData.title;
  }
}

function navLightbox(direction, e){
  if(e) e.stopPropagation();
  currentImgIndex = (currentImgIndex + direction + galleryImages.length) % galleryImages.length;
  updateLightbox();
}

function closeLightbox(e){
  if(!e || e.target.id === "lightbox" || e.target.classList.contains("lightbox-close")){
    document.getElementById("lightbox").classList.remove("active");
  }
}

document.addEventListener("keydown", (e) => {
  const lb = document.getElementById("lightbox");
  if (!lb.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") navLightbox(-1);
  if (e.key === "ArrowRight") navLightbox(1);
});
