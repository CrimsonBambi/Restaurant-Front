// Code for opening the menu modal windows

const menu1Img = document.getElementById("menu1-img");
const menu2Img = document.getElementById("menu2-img");
const menu3Img = document.getElementById("menu3-img");

const menu1Modal = document.getElementById("menu1-modal");
const menu2Modal = document.getElementById("menu2-modal");
const menu3Modal = document.getElementById("menu3-modal");

// Close buttons for the modals
const closeButtons = document.querySelectorAll(".close");

// Open modals when images are clicked
menu1Img.addEventListener("click", () => {
    menu1Modal.style.display = "block";
});

menu2Img.addEventListener("click", () => {
    menu2Modal.style.display = "block";
});

menu3Img.addEventListener("click", () => {
    menu3Modal.style.display = "block";
});

// Close modals when close buttons are clicked
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.parentElement.parentElement.style.display = "none";
    });
});

// Close modals when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === menu1Modal) {
        menu1Modal.style.display = "none";
    } else if (event.target === menu2Modal) {
        menu2Modal.style.display = "none";
    } else if (event.target === menu3Modal) {
        menu3Modal.style.display = "none";
    }
});