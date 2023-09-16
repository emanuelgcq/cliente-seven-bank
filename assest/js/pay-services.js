// Fetch the services from the endpoint and populate the dropdown
axiosInstance.get("/services").then((response) => {
  const serviceDropdown = document.getElementById("service-dropdown");
  serviceDropdown.addEventListener("change", () => {
    const servicio = response.data.servicios.find(
      (service) => service.servicioId == serviceDropdown.value
    );
    document.getElementById("label-campo").innerText = servicio.nombreCampo;
  });
  response.data.servicios.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.servicioId;
    option.textContent = service.descripcion;
    option.dataset.montoMinimo = service.montoMinimo;
    serviceDropdown.appendChild(option);
  });
});

// Add Event Listeners
const form = document.getElementById("payment-form");
const validationMessage = document.getElementById("validation-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const selectedService =
    document.getElementById("service-dropdown").selectedOptions[0];
  const amount = parseFloat(document.getElementById("amount").value);
  const fieldPaid = document.getElementById("campoAPagar").value;
  const montoMinimo = parseFloat(selectedService.dataset.montoMinimo);

  // Validate amount
  if (amount < montoMinimo) {
    validationMessage.textContent = `El monto debe ser mayor que ${montoMinimo}`;
    return;
  } else {
    validationMessage.textContent = ``;
  }

  // Send POST request to make the payment
  try {
    const response = await axiosInstance.post("/pay-service", {
      servicioId: selectedService.value,
      amount,
      fieldPaid,
    });
    const transactionId = response.data.transaction.transaccionId;

    // Replace form with success message
    const formContainer = document.getElementById("payment-form");
    formContainer.innerHTML = `
    <div id="success-message">
      <h2>Pago exitoso!</h2>
      <p>El pago se ha realizado con exito.</p>
      <p>ID de Transacción: ${transactionId}</p>
      <button id="back-btn" class="large-btn">Volver</button>
    </div>
  `;
    document.getElementById("back-btn").addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload();
    });
  } catch (error) {
    validationMessage.textContent = "Error al procesar el pago";
  }
});
