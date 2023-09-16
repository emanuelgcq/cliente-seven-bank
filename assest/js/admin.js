document.addEventListener("DOMContentLoaded", async () => {
  await fetchUsers();
});
async function fetchUsers() {
  try {
    const response = await axiosInstance.get("/users");
    const usersList = response.data.users;
    // Reference to the table's tbody element
    const movementsListTableBody = document
      .getElementById("accounts-list-container")
      .getElementsByTagName("tbody")[0];

    // Clear previous rows
    movementsListTableBody.innerHTML = "";

    // Loop through each movement and append it to the table
    usersList.forEach((user) => {
      const row = movementsListTableBody.insertRow(-1);

      const cell0 = row.insertCell(0);
      const cell1 = row.insertCell(1);
      const cell2 = row.insertCell(2);
      const cell3 = row.insertCell(3);
      const cell4 = row.insertCell(4);
      const cell5 = row.insertCell(5);
      const cell6 = row.insertCell(6);

      cell0.innerHTML = formatDate(user.fechaCuenta);
      cell1.innerHTML = user.cuenta.cuentaId;
      cell2.innerHTML = user.cedula;
      cell3.innerHTML = `${user.nombre} ${user.apellido}`;
      cell4.innerHTML = user.cuenta.balance;
      cell5.innerHTML = user.cuenta.claveEspecial;
      cell6.innerHTML = user.cuenta.Banco.nombreBanco;
    });
  } catch (error) {
    window.location.href = "index.html";
  }
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
