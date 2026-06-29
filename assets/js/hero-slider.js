document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("[data-hero-slider]");

  if (!slider) {
    return;
  }

  const slides = Array.from(slider.querySelectorAll("[data-hero-slide]"));
  const contentSlides = Array.from(
    slider.querySelectorAll("[data-hero-content]"),
  );
  const dotsContainer = slider.querySelector("[data-hero-dots]");
  const previousButton = slider.querySelector("[data-hero-prev]");
  const nextButton = slider.querySelector("[data-hero-next]");

  if (slides.length <= 1 || slides.length !== contentSlides.length) {
    return;
  }

  let currentIndex = 0;
  let autoSlideTimer;
  const slideDelay = 5000;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => {
      goToSlide(index);
      restartAutoSlide();
    });

    if (dotsContainer) {
      dotsContainer.appendChild(dot);
    }

    return dot;
  });

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });

    contentSlides.forEach((contentSlide, slideIndex) => {
      contentSlide.classList.toggle("is-active", slideIndex === currentIndex);
    });

    dots.forEach((dot, slideIndex) => {
      dot.classList.toggle("is-active", slideIndex === currentIndex);
      dot.setAttribute(
        "aria-current",
        slideIndex === currentIndex ? "true" : "false",
      );
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function restartAutoSlide() {
    window.clearInterval(autoSlideTimer);

    if (!prefersReducedMotion) {
      autoSlideTimer = window.setInterval(nextSlide, slideDelay);
    }
  }

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
      restartAutoSlide();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      restartAutoSlide();
    });
  }

  goToSlide(0);
  restartAutoSlide();
});
