document.addEventListener("DOMContentLoaded", function () {
  // Clave Especial Update
  document
    .getElementById("claveForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const claveEspecial = document.getElementById("claveEspecial").value;
      if (!claveEspecial) {
        alert("Debe ingresar una clave especial valida");
        return;
      }
      try {
        await axiosInstance.post("/clave-especial", { claveEspecial });
        alert("Clave Especial actualizada exitosamente.");
      } catch (error) {
        alert("Error actualizando Clave Especial.");
      }
    });

  // Password Update
  document
    .getElementById("update-password")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      try {
        await axiosInstance.post("/user-clave", {
          clave: password,
        });
        alert("Contraseña actualizada exitosamente");
      } catch (error) {
        alert("Error actualizando contraseña");
      }
    });
});
