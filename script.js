
function openImage(img){
document.getElementById("imgPopup").style.display="flex";
document.getElementById("popupImg").src=img.src;
}

function closeImage(){
document.getElementById("imgPopup").style.display="none";
}
