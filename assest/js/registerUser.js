// BASE_URL = "http://localhost:3001"
BASE_URL = "https://servidor-seven-bank.onrender.com";

const registerUser = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      cedula: user.ident,
      nombre: user.name,
      numero: user.phone,
      usuario: user.usuario,
      correo: user.mail,
      contrasena: user.password,
      apellido: user.lastname,
      direccion: user.country,
    });
    localStorage.removeItem("newUser");
    localStorage.setItem("cuentaId", response.data.account.cuentaId);
    localStorage.setItem("accessToken", response.data.accessToken);
    window.location.href = "registerComplete.html";
  } catch (error) {
    if (error.response.data.message) {
      alert(error.response.data.message);
    }
  }
};

// Obtener referencia al botón de cancelar
const cancBtn = document.getElementById("form-canc-btn");

// Obtener referencias a los campos de entrada
const registerUserForm = document.getElementById("registerUserForm");
const inputs = document.querySelectorAll("#registerUserForm input");

const expresiones = {
  nameUser: /^[a-zA-Z0-9\_\-\*]{7,14}$/, // Letras, numeros, guion, guion_bajo y asterisco
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{7,}$/,
};

const campos = {
  nameUser: false,
  password: false,
};

/*funcion que se va a ejecutar mas abajo por cada input para validar*/
/*identificar y ubicar cada campo*/

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nameUser":
      validarCampo(expresiones.nameUser, e.target, "nameUser");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      validarCPassword();
      break;
    case "cpassword":
      validarCPassword();
      break;
  }
};

/*se crea una funcion general para utilizarla varias veces con cada campo*/

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`group-${campo}`)
      .classList.remove("group-form-incorrect");
    document
      .getElementById(`group-${campo}`)
      .classList.add("group-form-correct");
    document
      .querySelector(`#group-${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#group-${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#group-${campo} .form-input-error`)
      .classList.remove("form-input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`group-${campo}`)
      .classList.add("group-form-incorrect");
    document
      .getElementById(`group-${campo}`)
      .classList.remove("group-form-correct");
    document
      .querySelector(`#group-${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#group-${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#group-${campo} .form-input-error`)
      .classList.add("form-input-error-activo");
    campos[campo] = false;
  }
};

/*se crea una funcion diferente para validar que ambas contraseñas coincidan*/

const validarCPassword = () => {
  const inputPassword = document.getElementById("password");
  const inputCPassword = document.getElementById("cpassword");

  if (inputPassword.value !== inputCPassword.value) {
    document
      .getElementById(`group-cpassword`)
      .classList.add("group-form-incorrect");
    document
      .getElementById(`group-cpassword`)
      .classList.remove("group-form-correct");
    document
      .querySelector(`#group-cpassword i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#group-cpassword i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#group-cpassword .form-input-error`)
      .classList.add("form-input-error-activo");
    campos["password"] = false;
  } else {
    document
      .getElementById(`group-cpassword`)
      .classList.remove("group-form-incorrect");
    document
      .getElementById(`group-cpassword`)
      .classList.add("group-form-correct");
    document
      .querySelector(`#group-cpassword i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#group-cpassword i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#group-cpassword .form-input-error`)
      .classList.remove("form-input-error-activo");
    if (expresiones.password.test(inputPassword.value)) {
      campos["password"] = true;
    }
  }
};

/*va a validar en todas las cajitas (campos de input)*/

inputs.forEach((input) => {
  input.addEventListener(
    "keyup",
    validarFormulario
  ); /*al presionar y levantar una tecla*/
  input.addEventListener(
    "blur",
    validarFormulario
  ); /*al dar un click fuera del campo */
});

/*aqui va a validar al presionar el boton crear cuenta*/

registerUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (campos.nameUser && campos.password) {
    const data = {};
    inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    const user = { ...JSON.parse(localStorage.getItem("newUser")) };
    user.password = data.password;
    user.usuario = data.nameUser;
    await registerUser(user);
  } else {
    document
      .getElementById("form-message")
      .classList.add("form-message-activo");
  }
});

/*validacion del boton cancelar*/

cancBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registerUserForm.reset();
  window.location.href = "register.html";
  alert("¿Estas seguro de cancelar el proceso?");
});
