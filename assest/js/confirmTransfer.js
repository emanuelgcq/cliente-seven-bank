document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("confirm-clave")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      const claveEspecial = document.getElementById("clave").value;
      await confirmTransfer(claveEspecial);
    });
  document.getElementById("cancel-clave").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("transferData");
    window.location.href = "transfer.html";
  });
});

async function confirmTransfer(claveEspecial) {
  const transferData = JSON.parse(localStorage.getItem("transferData"));

  try {
    let response;
    if (transferData.tarjetaId) {
      response = await axiosInstance.post("/transfer-tdc", {
        ...transferData,
        claveEspecial,
      });
    } else {
      response = await axiosInstance.post("/bank-transfer", {
        ...transferData,
        claveEspecial,
      });
    }

    const transactionId = response.data.transaction.transaccionId;
    handleTransferSuccess(transactionId, transferData);
  } catch (error) {
    console.log("as", error.response.data.message);
    if (error.response.data.message) {
      alert(error.response.data.message);
    }
  }
}

function handleTransferSuccess(transactionId, transferData) {
  // Replace form with success message
  const formContainer = document.getElementById("form-container");
  formContainer.innerHTML = `
      <div id="success-message">
        <h2>Transferencia Exitosa</h2>
        <p>La transferencia se ha realizado con éxito.</p>
        <p>ID de Transacción: ${transactionId}</p>
        <div class="btn-container">
          <button id="save-btn">Continuar</button>
          ${
            transferData.tarjetaId
              ? ""
              : `<button id="register-btn">Registrar beneficiario</button>`
          }
        </div>
        <div id="beneficiary-container" class="hidden">
          <form id="add-beneficiary">
            <label for="alias">Alias</label>
            <input type="text" id="alias" name="alias" />
            <button id="add-beneficiary">Guardar</button>
          </form>
        </div>
      </div>
    `;
  document.getElementById("save-btn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("transferData");
    window.location.href = "transfer.html";
  });
  document.getElementById("register-btn").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("beneficiary-container").classList.remove("hidden");
  });
  document
    .getElementById("add-beneficiary")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const response = await axiosInstance.post("/add-beneficiary", {
          alias: document.getElementById("alias").value,
          cuentaId: transferData.recipientCuentaId,
        });
        alert(response.data.message);
        window.location.href = "transfer.html";
      } catch (error) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    });
}

// document
//   .getElementById("add-beneficiary")
//   .addEventListener("change", function () {
//     const aliasContainer = document.getElementById("alias-container");
//     if (this.checked) {
//       aliasContainer.classList.remove("hidden");
//     } else {
//       aliasContainer.classList.add("hidden");
//     }
//   });
