const galleryImages = document.querySelectorAll(".gallery-image");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
        modalImage.src = image.src;
        modalImage.alt = image.alt;

        imageModal.classList.remove("hidden");
        imageModal.classList.add("flex");
    });
});

function closeImage() {
    imageModal.classList.remove("flex");
    imageModal.classList.add("hidden");
}

closeModal.addEventListener("click", closeImage);

imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) {
        closeImage();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeImage();
    }
});