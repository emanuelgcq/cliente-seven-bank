// BASE_URL = "http://localhost:3001";
BASE_URL = "https://servidor-seven-bank.onrender.com";
// Obtener referencia al botón de inicio de sesión
const loginBtn = document.getElementById("login-btn");

const loginForm = document.getElementById("login-form");

// Obtener referencias a los campos de entrada
const identInput = document.getElementById("ident");
const passwordInput = document.getElementById("password");

// Agregar evento al botón de inicio de sesión para mostrar un mensaje si los campos están vacíos
loginBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      cedula: identInput.value,
      contrasena: passwordInput.value,
    });
    if (response.data && response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      loginForm.reset();
      window.location.href = "mainAccount.html";
      alert("¡Inicio de sesión exitoso!");
    }
  } catch (error) {
    console.error("Login failed:", error);
    if (error.response.data.message) {
      alert(error.response.data.message);
    }
  }
});