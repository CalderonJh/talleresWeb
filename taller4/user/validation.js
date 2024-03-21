const NO_ERROR = "NO_ERROR";

document
  .querySelector("#user-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validateUser();
  });

document.querySelectorAll("input").forEach((inputElement) => {
  inputElement.addEventListener("input", function () {
    inputElement.classList.remove("border-danger");
    let smallElementId = inputElement.id + "-error";
    document.getElementById(smallElementId).classList.add("d-none");
    document.getElementById("user-form").classList.remove("not-valid");
  });
});

document
  .getElementById("document-type")
  .addEventListener("change", function () {
    document.getElementById("document-type").classList.remove("border-danger");
    let smallElementId = "document-type-error";
    document.getElementById(smallElementId).classList.add("d-none");
    document.getElementById("user-form").classList.remove("not-valid");
  });

const validateInput = (input, validator) => {
  const err = validator(input.value);
  if (err !== NO_ERROR) {
    input.classList.add("border-danger");
    const errorElement = document.getElementById(input.id + "-error");
    errorElement.innerText = err;
    errorElement.classList.remove("d-none");
    document.getElementById("user-form").classList.add("not-valid");
  }
};

const validateUser = () => {
  const nameInput = document.getElementById("name");
  const lastNameInput = document.getElementById("last-name");
  const addressInput = document.getElementById("address");
  const documentType = document.getElementById("document-type");
  const documentNumber = document.getElementById("document-number");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const password2Input = document.getElementById("confirm-password");

   const userForm = document.getElementById("user-form");
    validateInput(nameInput, nameValidator);
    validateInput(lastNameInput, lastNameValidator);
    validateInput(addressInput, addressValidator);
    validateInput(documentType, documentTypeValidator);
    validateInput(documentNumber, documentNumberValidator);
    validateInput(phoneInput, phoneNumberValidator);
    validateInput(emailInput, emailValidator);
    validateInput(passwordInput, passwordValidator);
    validateInput(password2Input, confirmPasswordValidator);

  if (!userForm.classList.contains("not-valid")) {
    document.getElementById("user-form").reset();
    alert("Datos enviados correctamente");
  }
};

function nameValidator(value) {
  if (!value) return "Nombre es requerido";
  if (value.length < 2) return "Nombre demasiado corto";
  if (value.length > 25) return "Nombre demasiado largo";
  return NO_ERROR;
}

function lastNameValidator(value) {
  if (!value) return "Apellido es requerido";
  if (value.length < 2) return "Apellido demasiado corto";
  if (value.length > 25) return "Apellido demasiado largo";
  return NO_ERROR;
}

function addressValidator(value) {
  if (!value) return "Dirección es requerida";
  const keywords = ["cll", "cra", "av", "anv", "trans"];
  for (const keyword of keywords)
    if (value.startsWith(keyword)) return NO_ERROR;
  return "Especifique cll, cra, av, anv, o trans";
}

function documentTypeValidator(value) {
  if (value === "Seleccione...") return "Seleccione un tipo de documento";
  return NO_ERROR;
}

function documentNumberValidator(value) {
  if (!value) return "Número de documento es requerido";
  if (!value.match(/^[A-Za-z0-9]+$/))
    return "Solo letras y números son permitidos";
  if (value.length < 10) return "Número de documento demasiado corto";
  if (value.length > 20) return "Número de documento demasiado largo";
  return NO_ERROR;
}

function phoneNumberValidator(value) {
  if (!value) return "Número de teléfono es requerido";
  if (!/^[0-9+]*$/.test(value)) return "Solo números son permitidos";

  if (value.length < 7) return "Número de teléfono demasiado corto";
  if (value.length > 20) return "Número de teléfono demasiado largo";
  return NO_ERROR;
}

function emailValidator(value) {
  if (!value) return "Email es requerido";
  if (!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
    return "Correo electrónico inválido";
  return NO_ERROR;
}

function passwordValidator(value) {
  if (!value) return "Contraseña es requerida";
  if (value.length < 5) return "Contraseña demasiado corta";
  if (value.length > 20) return "Contraseña demasiado larga";
  if (!/[A-Z]/.test(value)) return "Al menos una mayúscula";
  if (!/[a-z]/.test(value)) return "Al menos una minúscula";
  if (!/[0-9]/.test(value)) return "Al menos un número";
  if (!/^[a-zA-Z0-9#%/&]*$/.test(value))
    return "Solo caracteres alfanuméricos y #, %, /, &";
  return NO_ERROR;
}

function confirmPasswordValidator(value) {
  if (!value) return "Confirmar contraseña";
  if (value !== document.getElementById("password").value)
    return "Las contraseñas no coinciden";
  return NO_ERROR;
}
