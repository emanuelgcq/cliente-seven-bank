// Obtener referencia al botón de inicio de sesión
const loginBtn = document.getElementById("login-btn");

// Obtener referencia al botón de registrarme
const registerBtn = document.getElementById("register-btn");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    campos.name &&
    campos.lastname &&
    campos.phone &&
    campos.ident &&
    campos.mail &&
    campos.country
  ) {
    const newUser = {};
    inputs.forEach((input) => {
      newUser[input.name] = input.value;
    });
    console.log("newUser=", newUser);
    localStorage.setItem("newUser", JSON.stringify(newUser));
    window.location.href = "registerUser.html";
  } else {
    document
      .getElementById("form1-message")
      .classList.add("form1-message-activo");
  }
});

// Obtener referencia al botón de cancelar
const cancelBtn = document.getElementById("cancel-btn");

// Obtener referencias a los campos de entrada
const registerForm = document.getElementById("register-form");
const inputs = document.querySelectorAll("#register-form input");

const expresiones = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
  name: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
  lastname: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
  ident: /^\d{1,11}$/, // 1 a 14 numeros sin letras.
  phone: /^\d{1,11}$/, // 1 a 11 numeros.
  mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //correo
  country: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
};

const campos = {
  password: false,
  name: false,
  lastname: false,
  ident: false,
  phone: false,
  mail: false,
  country: false,
};

const validarForm = (e) => {
  switch (e.target.name) {
    case "name":
      validarCampo(expresiones.name, e.target, "name");
      break;
    case "lastname":
      validarCampo(expresiones.lastname, e.target, "lastname");
      break;
    case "ident":
      validarCampo(expresiones.ident, e.target, "ident");
      break;
    case "phone":
      validarCampo(expresiones.phone, e.target, "phone");
      break;
    case "mail":
      validarCampo(expresiones.mail, e.target, "mail");
      break;
    case "country":
      validarCampo(expresiones.country, e.target, "country");
      break;
  }
};

/*se crea una funcion general para utilizarla varias veces con cada campo*/

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`group-${campo}`)
      .classList.remove("group-form1-incorrect");
    document
      .getElementById(`group-${campo}`)
      .classList.add("group-form1-correct");
    document
      .querySelector(`#group-${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#group-${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#group-${campo} .form1-input-error`)
      .classList.remove("form1-input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`group-${campo}`)
      .classList.add("group-form1-incorrect");
    document
      .getElementById(`group-${campo}`)
      .classList.remove("group-form1-correct");
    document
      .querySelector(`#group-${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#group-${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#group-${campo} .form1-input-error`)
      .classList.add("form1-input-error-activo");
    campos[campo] = false;
  }
};

/*va a validar en todas las cajitas (campos de input)*/

inputs.forEach((input) => {
  input.addEventListener(
    "keyup",
    validarForm
  ); /*al presionar y levantar una tecla*/
  input.addEventListener(
    "blur",
    validarForm
  ); /*al dar un click fuera del campo */
});

/*validacion del boton cancelar para que devuelva al index*/

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.reset();
  window.location.href = "index.html";
  alert("¿Estas seguro de cancelar el proceso?");
});
