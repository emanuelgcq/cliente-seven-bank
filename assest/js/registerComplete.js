const cuentaId = localStorage.getItem("cuentaId");
document.getElementById("nro-cuenta").innerText = cuentaId;

document
  .getElementById("crear-clave-especial")
  .addEventListener("click", () => {
    window.location.href = "crearClaveEspecial.html";
  });
