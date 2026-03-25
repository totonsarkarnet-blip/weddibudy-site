function scrollToGallery(){
  document.getElementById("gallery2").scrollIntoView({
    behavior: "smooth"
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// =====================
// CREATE DESIGN DATA
// =====================
const designs = [];

// Wedding images
for(let i = 1; i <= 14; i++){
  designs.push({
    src: `Wedding${i}.jpg`,
    title: `Wedding`,
    cat: "Wedding",
    tag: "Wedding"
  });
}

// Prewedding images
for(let i = 1; i <= 3; i++){
  designs.push({
    src: `Prewedding${i}.jpg`,
    title: `Pre Wedding`,
    cat: "Prewedding",
    tag: "Pre-Wedding"
  });
}

// Baby images
for(let i = 1; i <= 10; i++){
  designs.push({
    src: `Baby${i}.jpg`,
    title: `Baby`,
    cat: "Baby",
    tag: "Baby"
  });
}

const gallery = document.getElementById("gallery");
let currentIndex = 0;
let currentItems = designs; // 👉 filter এর জন্য

// =====================
// RENDER GALLERY
// =====================
function renderGallery(items){
  gallery.innerHTML = "";
  currentItems = items;

  items.forEach((item, index) => {

    let card = document.createElement("div");
    card.classList.add("card");

    let img = document.createElement("img");
    img.src = "Albumdesign/" + item.src;

    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.innerHTML = `<h3>${item.title}</h3><p>${item.cat}</p>`;

    let tag = document.createElement("div");
    tag.classList.add("tag");
    tag.innerText = item.tag;

    img.onclick = function(){
      currentIndex = index;
      showImage();
    }

    card.appendChild(img);
    card.appendChild(tag);
    card.appendChild(overlay);
    gallery.appendChild(card);
  });
}

// =====================
// FILTER FUNCTION
// =====================
function filterGallery(category){
  if(category === "all"){
    renderGallery(shuffleArray(designs)); // 👉 mixed show করবে
  } else {
    let filtered = designs.filter(item => item.cat === category);
    renderGallery(filtered);
  }
}

// =====================
// LIGHTBOX FUNCTION
// =====================
function showImage(){
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("lightboxImg").src =
    "Albumdesign/" + currentItems[currentIndex].src;

  document.body.style.overflow = "hidden";
}

// Next
document.querySelector(".next").onclick = function(){
  currentIndex = (currentIndex + 1) % currentItems.length;
  showImage();
}

// Prev
document.querySelector(".prev").onclick = function(){
  currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
  showImage();
}

// Close
document.querySelector(".close").onclick = function(){
  document.getElementById("lightbox").style.display = "none";
  document.body.style.overflow = "auto";
}

// Keyboard support
document.addEventListener("keydown", function(e){
  if(e.key === "ArrowRight") document.querySelector(".next").click();
  if(e.key === "ArrowLeft") document.querySelector(".prev").click();
  if(e.key === "Escape") document.querySelector(".close").click();
});

// Click outside close
document.getElementById("lightbox").onclick = function(e){
  if(e.target.id === "lightbox"){
    this.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Swipe (mobile)
let startX = 0;

document.getElementById("lightbox").addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});

document.getElementById("lightbox").addEventListener("touchend", e=>{
  let endX = e.changedTouches[0].clientX;

  if(startX - endX > 50) document.querySelector(".next").click();
  if(endX - startX > 50) document.querySelector(".prev").click();
});

// =====================
// INITIAL LOAD
// =====================
renderGallery(shuffleArray(designs));
