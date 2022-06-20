"use strict";
const navButtons = document.querySelectorAll(".info-btn");
const infoIntro = document.querySelector(".info-intro");
const infoHistory = document.querySelector(".info-history");
const infoPokedex = document.querySelector(".info-pokedex");
const nextBtn = document.querySelector(".next-btn");
navButtons[0].addEventListener("click", () => {
    navigateToIntro();
});
navButtons[1].addEventListener("click", () => {
    navigateToHistory();
});
navButtons[2].addEventListener("click", () => {
    navigateToPokedex();
});
nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener("click", () => {
    if (navButtons[0].classList.contains("selected-btn")) {
        navigateToHistory();
    }
    else if (navButtons[1].classList.contains("selected-btn")) {
        navigateToPokedex();
    }
    else if (navButtons[2].classList.contains("selected-btn")) {
        window.location.href = "pokedexGrid.html";
    }
});
function navigateToIntro() {
    navButtons[0].classList.add("selected-btn");
    navButtons[1].classList.remove("selected-btn");
    navButtons[2].classList.remove("selected-btn");
    infoIntro.style.display = "flex";
    infoHistory.style.display = "none";
    infoPokedex.style.display = "none";
    nextBtn.textContent = "Next";
}
function navigateToHistory() {
    navButtons[0].classList.remove("selected-btn");
    navButtons[1].classList.add("selected-btn");
    navButtons[2].classList.remove("selected-btn");
    infoIntro.style.display = "none";
    infoHistory.style.display = "flex";
    infoPokedex.style.display = "none";
    nextBtn.textContent = "Next";
}
function navigateToPokedex() {
    navButtons[0].classList.remove("selected-btn");
    navButtons[1].classList.remove("selected-btn");
    navButtons[2].classList.add("selected-btn");
    infoIntro.style.display = "none";
    infoHistory.style.display = "none";
    infoPokedex.style.display = "flex";
    nextBtn.textContent = "Go!";
}
