const themeButton = document.getElementById("theme-toggle");

// Restore the saved theme
const savedTheme = localStorage.getItem("astu-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

function updateThemeButton() {
    const isLight = document.body.classList.contains("light-mode");
    themeButton.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
}

updateThemeButton();

// Switch themes when clicked
themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    const selectedTheme = document.body.classList.contains("light-mode")
        ? "light"
        : "dark";

    localStorage.setItem("astu-theme", selectedTheme);
    updateThemeButton();
});