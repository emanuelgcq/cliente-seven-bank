// Obtener el botón del menú
const menuBtn = document.getElementById("menu-btn");

// Obtener el menú
const menu = document.querySelector(".menu");

// Agregar evento al botón del menú para mostrar/ocultar el menú al hacer clic
menuBtn.addEventListener("click", () => {
    menu.classList.toggle("show-menu");
});
