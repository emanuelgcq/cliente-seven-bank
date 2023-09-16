document.addEventListener("DOMContentLoaded", async () => {
  await fetchMovements();
});

document
  .getElementById("submit-button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    await fetchMovements();
  });

async function fetchMovements() {
  const limit = 20;
  const params = { limit };
  if (document.getElementsByName("search-option")[1].checked) {
    const fromDate = document.getElementById("from-date").value;
    const toDate = document.getElementById("to-date").value;

    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;
  }

  const movements = await axiosInstance.get("/movements", { params });
  const movementsList = movements.data.transactions;
  console.log(movementsList);

  // Reference to the table's tbody element
  const movementsListTableBody = document
    .getElementById("movements-list-container")
    .getElementsByTagName("tbody")[0];

  // Clear previous rows
  movementsListTableBody.innerHTML = "";

  // Loop through each movement and append it to the table
  movementsList.forEach((movement) => {
    const row = movementsListTableBody.insertRow(-1);

    const cell0 = row.insertCell(0);
    const cell1 = row.insertCell(1);
    const cell2 = row.insertCell(2);
    const cell3 = row.insertCell(3);
    const cell4 = row.insertCell(4);
    const cell5 = row.insertCell(5);
    const cell6 = row.insertCell(6);

    cell0.innerHTML = formatDate(movement.fecha);
    cell1.innerHTML = movement.beneficiarioCuentaId ? movement.beneficiarioCuentaId : movement.tarjetaId;
    cell2.innerHTML = movement.transaccionId;
    cell3.innerHTML = movement.descripcion;
    cell4.innerHTML = movement.debitOrCredit;
    cell5.innerHTML = `${movement.debitOrCredit === "Debito" ? "-" : ""}${
      movement.monto
    }`;
    cell6.innerHTML = movement.balance;
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
