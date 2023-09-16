// Función para mostrar un mensaje y luego ocultarlo después de un tiempo
function showMessage(message) {
  const messageBox = document.getElementById("message-box");
  messageBox.textContent = message;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000); // Ocultar el mensaje después de 3 segundos
}

// Obtener referencia al botón "Cerrar sesión"
const logoutButton = document.getElementById("logout-btn");

// Agregar evento de clic al botón "Cerrar sesión"
logoutButton.addEventListener("click", async () => {
  const confirmation = confirm("¿Estás seguro de cerrar sesión?");
  if (confirmation) {
    try {
      await axiosInstance.post("/logout");
    } catch (error) {}
    localStorage.clear();
    window.location.href = "index.html";
  }
});

// Obtener referencias a los botones y opciones
const consolidatedButton = document.querySelector(".horizontal-options button");
const consolidatedOptions = document.getElementById("consolidated-options");

// Agregar evento de clic al botón "Posición Consolidada"
consolidatedButton.addEventListener("click", () => {
  consolidatedOptions.classList.toggle("show-options");
});

document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const account = JSON.parse(localStorage.getItem("account"));

  if (document.getElementById("menu-username")) {
    document.getElementById(
      "menu-username"
    ).innerText = `${user.nombre} ${user.apellido}`;
    document.getElementById("menu-balance").innerText = `${account.balance} ${
      CURRENCY_SYMBOL[account.Banco.moneda]
    }`;
  }
  // Obtén una referencia al botón de "Menú Principal"
  var menuPrincipalBtn = document.getElementById("menu-p-btn");

  // Agrega un evento de clic al botón
  menuPrincipalBtn.addEventListener("click", function () {
    // Redirige a mainAccount.html
    window.location.href = "mainAccount.html";
  });
});
