const logo = document.getElementById("hero-logo-3d");

if (logo) {
    const img = logo.querySelector("img");

    logo.addEventListener("pointermove", (event) => {
        const rect = logo.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 35;
        const rotateX = (0.5 - y) * 35;

        img.style.transform =
            rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08);
    });

    logo.addEventListener("pointerleave", () => {
        img.style.transform =
            "rotateX(0deg) rotateY(0deg) scale(1)";
    });

    logo.addEventListener("click", () => {
        logo.classList.remove("spin");

        void logo.offsetWidth;

        logo.classList.add("spin");
    });

    img.addEventListener("animationend", () => {
        logo.classList.remove("spin");
    });
}