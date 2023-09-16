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
  try {
    document.getElementById(
      "account-element"
    ).innerText = `Bienvenido ${user.nombre} ${user.apellido}`;
    document.getElementById("balance-element").innerHTML = `Balance: ${
      account.balance
    } ${CURRENCY_SYMBOL[account.Banco.moneda]}`;
    document.getElementById(
      "user-element"
    ).innerHTML = `${user.nombre} ${user.apellido}`;
  } catch (error) {}
}
