// SCROLL
function scrollToGallery(){
  document.getElementById("gallery").scrollIntoView({behavior:"smooth"});
}

// FILTER
function filterImages(category){
  let items = document.querySelectorAll(".item");

  items.forEach(item=>{
    if(category === "all"){
      item.style.display = "block";
    } else {
      if(item.classList.contains(category)){
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  });
}

// LIGHTBOX
let images = document.querySelectorAll(".item img");
let lightbox = document.getElementById("lightbox");
let lightImg = document.getElementById("lightbox-img");

images.forEach(img=>{
  img.addEventListener("click", ()=>{
    lightbox.style.display = "flex";
    lightImg.src = img.src;
  });
});

function closeLightbox(){
  lightbox.style.display = "none";
}
