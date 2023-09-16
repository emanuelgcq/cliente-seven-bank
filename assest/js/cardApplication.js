// document.getElementById("get-card").addEventListener("click", async (e) => {
//   e.preventDefault();
//   const motivo = document.getElementById("request-reason").value;
//   const response = await axiosInstance.post("/request-card", { motivo });
//   console.log("response", response);
// });

document.getElementById("get-card").addEventListener("click", async (e) => {
  e.preventDefault();
  const motivo = document.getElementById("request-reason").value;
  try {
    const response = await axiosInstance.post("/request-card", { motivo }); // Assuming 'axiosInstance' was defined earlier
    if (response.status === 200) {
      // Assuming HTTP status 200 indicates success
      // Replace the form with a success message
      const formElement = document.getElementById("request-form");
      const successMessageDiv = document.createElement("div");
      successMessageDiv.className = "success-message";
      successMessageDiv.innerHTML = `
        <p>Su solicitud para obtener una tarjeta de crédito está siendo procesada.</p>
        <br><br>
        <button class='large-btn'>Volver a la página principal</button>
        `;
      formElement.replaceWith(successMessageDiv);
      const button = document.querySelector("div.success-message button");
      button.addEventListener("click", () => {
        location.reload();
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
