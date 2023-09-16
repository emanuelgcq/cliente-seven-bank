document.addEventListener("DOMContentLoaded", async () => {
  let data;
  try {
    data = (await axiosInstance.get("/me")).data;
    console.log("response", data);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("account", JSON.stringify(data.account));
  } catch (error) {
    alert("Por favor inicie sesión");
    localStorage.clear();
    window.location.href = "index.html";
  }
  updateUI(data.user, data.account);
});

function updateUI(user, account) {
  // Target the div where we'll insert the personal and account info
  const infoContainer = document.getElementById("personal-info-container");

  // Create and populate the HTML elements
  let userInfoHtml = `
    <h2>Detalles Personales</h2>
    <p>Cédula: ${user.cedula}</p>
    <p>Nombre: ${user.nombre} ${user.apellido}</p>
    <p>Usuario: ${user.usuario}</p>
    <p>Número de telefono: ${user.numero}</p>
    <p>Dirección: ${user.direccion}</p>
  `;

  let accountInfoHtml = `
    <h2>Detalles de la Cuenta</h2>
    <p>Numero de cuenta: ${account.cuentaId}</p>
    <p>Balance: ${account.balance} ${account.Banco.moneda}</p>
  `;

  // Insert the HTML into the container
  infoContainer.innerHTML = userInfoHtml + accountInfoHtml;
}
