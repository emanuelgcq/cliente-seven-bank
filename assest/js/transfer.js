document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.getElementById("form-container");

  document
    .getElementById("transaction-type")
    .addEventListener("change", function (e) {
      const selectedType = e.target.value;
      let formHtml = "";

      // Clear previous form fields
      formContainer.innerHTML = "";

      if (selectedType === "cuentas-terceros") {
        formHtml = `
      <label for="recipient-account">Cuenta Destino:</label>
      <input type="text" id="recipient-account" name="recipient-account" />
      <label for="cedula">Cedula Destinatario:</label>
      <input type="text" id="cedula" name="cedula" />
      <label for="amount">Cantidad:</label>
      <input type="number" id="amount" name="amount" min="0" />
      <label for="descripcion">Descripcion:</label>
      <textarea id="descripcion" name="descripcion"></textarea>
      <button id="transfer-button">Transferir</button>
      `;
      } else if (selectedType === "cuentas-otros-bancos") {
        formHtml = `
        <label for="banco">Seleccionar banco:</label>
        <select id="banco"></select>
        <label for="recipient-account">Cuenta Destino:</label>
        <input type="text" id="recipient-account" name="recipient-account" />
        <label for="cedula">Cedula Destinatario:</label>
        <input type="text" id="cedula" name="cedula" />
        <label for="amount">Cantidad:</label>
        <input type="number" id="amount" name="amount" min="0" />
        <label for="descripcion">Descripcion:</label>
        <textarea id="descripcion" name="descripcion"></textarea>
        <button id="transfer-button">Transferir</button>
      `;

        axiosInstance.get("/bancos").then((response) => {
          const bancoDropdown = document.getElementById("banco");
          bancoDropdown.innerHTML = response.data.bancos
            .map(
              (banco) =>
                `<option value="${banco.bancoId}">${banco.nombreBanco}</option>`
            )
            .join("");
        });
      } else if (selectedType === "pago-tdc") {
        formHtml = `
        <label for="tarjeta">Seleccionar tarjeta:</label>
        <select id="tarjeta"></select>
        <label for="amount">Cantidad:</label>
        <input type="number" id="amount" name="amount" min="0" />
        <button id="transfer-button">Transferir</button>
      `;

        axiosInstance.get("/cards").then((response) => {
          const tarjetaDropdown = document.getElementById("tarjeta");
          tarjetaDropdown.innerHTML = response.data
            .map(
              (card) =>
                `<option value="${card.tarjetaId}">${card.tarjetaId}</option>`
            )
            .join("");
        });
      }

      formContainer.innerHTML = formHtml;
      document
        .getElementById("transfer-button")
        .addEventListener("click", handleTransfer);
    });
});

async function handleTransfer(e) {
  e.preventDefault();
  const transactionType = document.getElementById("transaction-type").value;
  console.log("transfer", transactionType);
  switch (transactionType) {
    case "cuentas-otros-bancos":
      await handleTransferToBankAccount(false);
      break;
    case "pago-tdc":
      await handleTransferToTDC();
      break;
    case "cuentas-terceros":
      await handleTransferToBankAccount(true);
      break;
  }
}

async function handleTransferToBankAccount(sameBank) {
  const bancoId = sameBank
    ? JSON.parse(localStorage.getItem("account")).bancoId
    : document.getElementById("banco").value;
  const recipientCuentaId = document.getElementById("recipient-account").value;
  const amount = document.getElementById("amount").value;
  const recipientCedula = document.getElementById("cedula").value;
  const descripcion = document.getElementById("descripcion").value;

  localStorage.setItem(
    "transferData",
    JSON.stringify({
      recipientCuentaId,
      amount,
      recipientCedula,
      bancoId,
      descripcion,
    })
  );
  window.location.href = "confirmTransfer.html";
}

async function handleTransferToTDC() {
  const tarjetaId = document.getElementById("tarjeta").value;
  const amount = document.getElementById("amount").value;

  localStorage.setItem(
    "transferData",
    JSON.stringify({
      tarjetaId,
      amount,
    })
  );
  window.location.href = "confirmTransfer.html";
}
