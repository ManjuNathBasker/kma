document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".gallery-track");

    if (!track) return;

    let items = [...document.querySelectorAll(".gallery-item")];

    function getVisible() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 4;
    }

    const visible = getVisible();

    // Clone first visible items
    for (let i = 0; i < visible; i++) {
        track.appendChild(items[i].cloneNode(true));
    }

    items = [...document.querySelectorAll(".gallery-item")];

    let index = 0;

    function slide() {

        index++;

        const itemWidth = items[0].offsetWidth;

        track.style.transition = "transform .8s ease";
        track.style.transform = `translateX(-${index * itemWidth}px)`;

        // Reset without user noticing
        if (index >= items.length - visible) {

            setTimeout(() => {

                track.style.transition = "none";

                index = 0;

                track.style.transform = "translateX(0px)";

            }, 800);

        }

    }

    setInterval(slide, 3000);

});