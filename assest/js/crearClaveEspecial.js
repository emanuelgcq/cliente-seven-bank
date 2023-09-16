document
  .getElementById("crear-clave-especial")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    const claveEspecial = document.getElementById("clave-especial").value;

    if (!claveEspecial.trim()) {
      alert("Por favor ingrese una clave especial");
      return;
    }
    try {
      const response = await axiosInstance.post("/clave-especial", {
        claveEspecial,
      });

      if (response.status === 200) {
        window.location.href = "mainAccount.html";
      }
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error setting clave especial:", error);
    }
  });
