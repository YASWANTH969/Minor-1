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
