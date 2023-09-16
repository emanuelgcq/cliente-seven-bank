// Function to populate the dropdown
const populateDropdown = async () => {
  try {
    // Fetch cards using axios GET request
    const response = await axiosInstance.get(`/cards`);
    const cards = response.data;

    // Find the select element
    const selectElement = document.getElementById("tdc-select");

    // Clear existing options
    selectElement.innerHTML = "";

    // Create a "Select a card" placeholder option
    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = "Selecciona una tarjeta";
    placeholderOption.value = "";
    selectElement.appendChild(placeholderOption);

    // Populate select element with options
    for (const card of cards) {
      const option = document.createElement("option");
      option.value = card.tarjetaId;
      option.textContent = `${card.tipoTarjeta} - ${card.tarjetaId}`; // Modify as per your requirement
      selectElement.appendChild(option);
    }
  } catch (error) {
    console.error("An error occurred while fetching the cards:", error);
  }
};

async function consultarTdc(e) {
  e.preventDefault();

  const tarjetaId = document.getElementById("tdc-select").value;
  const response = await axiosInstance.get(`/card-movements/${tarjetaId}`);

  // Get a reference to the HTML table
  const table = document
    .querySelector(".tdc-results")
    .getElementsByTagName("tbody")[0];

  // Clear any existing rows in the table
  table.innerHTML = "";

  document.getElementById("saldo-label").innerText = "SALDO";
  document.getElementById("card-balance").className = "";
  document.getElementById("card-balance").innerText = `${
    response.data.tarjeta.balance
  } ${CURRENCY_SYMBOL[response.data.tarjeta.cuenta.Banco.moneda]}`;
  response.data.transactions.forEach((transaction) => {
    const row = table.insertRow();

    // Create cells for the desired fields
    const fechaCell = row.insertCell(0);
    const transactionIdCell = row.insertCell(1);
    const cuentaIdCell = row.insertCell(2);
    const descCell = row.insertCell(3);
    const montoCell = row.insertCell(4);

    // Fill the cells with data from the transaction
    fechaCell.textContent = formatDate(transaction.fecha);
    transactionIdCell.textContent = transaction.transaccionId;
    cuentaIdCell.textContent = transaction.cuentaId;
    descCell.textContent = transaction.descripcion;
    montoCell.textContent = transaction.monto;
  });
}

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString)
    .toLocaleDateString("en-US", options)
    .replace(",", "");
}

window.onload = () => {
  populateDropdown();
  document
    .getElementById("consultar-tdc-btn")
    .addEventListener("click", consultarTdc);
};
