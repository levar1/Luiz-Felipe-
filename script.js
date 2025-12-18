const imagens = document.querySelectorAll(".galeria img");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");
const close = document.getElementById("close");

imagens.forEach(img => {
  img.addEventListener("click", () => {
    viewerImg.src = img.src;
    viewer.style.display = "flex";
  });
});

close.addEventListener("click", () => {
  viewer.style.display = "none";
});

viewer.addEventListener("click", (e) => {
  if (e.target === viewer) {
    viewer.style.display = "none";
  }
});
