const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

$(document).ready(function () {
  $("#register-form").submit(function (event) {
    event.preventDefault();
    validate();
  });
  $("#disease__checkbox").change(function () {
    const isActive = $("#disease__checkbox").prop("checked");
    if (isActive) $("#disease_checked__div").removeClass("hidden");
    else $("#disease_checked__div").addClass("hidden");
  });
  $("#contagion__checkbox").change(function () {
    const isActive = $("#contagion__checkbox").prop("checked");
    if (isActive) $("#textarea__div").removeClass("hidden");
    else $("#textarea__div").addClass("hidden");
  })
});

const months = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const nameInput = $("#name__input");
const lastnameInput = $("#last_name__input");
const dayInput = $("#dob-day");
const monthInput = $("#dob-month");
const yearInput = $("#dob-year");
const documentInput = $("#document__input");
const emailInput = $("#email__input");
const phoneInput = $("#phone__input");
const usernameInput = $("#username__input");
const passwordInput = $("#password__input");
const confirmPasswordInput = $("#confirm__input");

const validate = () => {
  validateName();
  validateAge();
  validateDocument();
  validateEmail();
  validateUsername();
  validatePassword();
};

const validateName = () => {
  const err = nameError(nameInput.val());
  if (!validateError(nameInput, err, "name")) validateLastname();
};

const validateLastname = () => {
  const err = lastnameError(lastnameInput.val());
  validateError(lastnameInput, err, "name");
};

const validateAge = () => {
  const year = parseInt(yearInput.val());
  const month = getMonthNumber(monthInput);
  const day = parseInt(dayInput.val());
  const err = ageError(day, month, year);
  console.log(day, month, year, err);
  if (!err) {
    showAge(day, month, year);
    monthInput.val(months[month]);
    dayInput.val(day);
    return;
  }
  if (err.includes("año")) dobInputError(yearInput, err);
  if (err.includes("mes")) dobInputError(monthInput, err);
  if (err.includes("día")) dobInputError(dayInput, err);
};

const validateDocument = () => {
  const err = documentNumberError(documentInput.val());
  validateError(documentInput, err, "document");
};

const validateEmail = () => {
  const err = emailError(emailInput.val());
  if (!validateError(emailInput, err, "contact")) validatePhoneNumber();
};

const validatePhoneNumber = () => {
  const err = phoneNumberError(phoneInput.val());
  validateError(phoneInput, err, "contact");
};

const validateUsername = () => {
  const err = usernameError(usernameInput.val());
  validateError(usernameInput, err, "username");
};

const validatePassword = () => {
  const err = passwordError(passwordInput.val());
  if (!validateError(passwordInput, err, "password")) confirmPassword();
};

const confirmPassword = () => {
  const err = confirmPasswordError(confirmPasswordInput.val());
  validateError(confirmPasswordInput, err, "password");
};

const validateError = (input, err, name) => {
  if (err) highlightBorder(input);
  const elementId = "#" + name + "__small";
  const small = $(elementId);
  console.log(small, elementId, err);
  small.text(err);
  small.css("color", "#f87171");
  return err.length > 0;
};

function calculateAge(day, month, year) {
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();

  let yearsOld = currentYear - year;
  let monthOld = currentMonth - month;
  let daysOld = currentDay - day;

  if (monthOld < 0 || (monthOld === 0 && daysOld < 0)) {
    yearsOld--;
    monthOld += 12;
    if (daysOld < 0) {
      monthOld--;
      daysOld += new Date(currentYear, currentMonth - 1, 0).getDate();
    }
  }

  return {
    years: yearsOld,
    months: monthOld,
    days: daysOld,
  };
}

const showAge = (dd, mm, yyyy) => {
  const age = calculateAge(dd, mm, yyyy);
  const msgSmall = $("#dob__small");
  const msg = getAgeMessage(age);
  msgSmall.css("color", "#eff6ff");
  msgSmall.text(msg);
};

const getAgeMessage = (age) => {
  const { years, months, days } = age;
  if (years < 0) return "Fecha de nacimiento inválida";
  if (years === 0 && months === 0 && days === 0) return "Recién nacido";
  if (years === 0 && months === 0) return `Tienes ${days} días`;
  if (years === 0) return `Tienes ${months} meses y ${days} días`;
  return `Tienes ${years} años, ${months} meses y ${days} días`;
};

const getMonthNumber = () => {
  const value = monthInput.val();
  let monthNumber = parseInt(value);
  if (isNaN(monthNumber) && value) {
    const monthsNames = Object.values(months);
    monthsNames.forEach((month, index) => {
      if (month.toLowerCase().includes(value.toLowerCase()))
        monthNumber = index + 1;
    });
  }
  return monthNumber;
};

function highlightBorder(jqInput, time = 300) {
  jqInput.css("border", "solid #dc2626 2px");
  // return
  setTimeout(function () {
    jqInput.css("border", "solid #eff6ff 2px");
  }, time);
}

const dobInputError = (jqInput, msg) => {
  const dobMessageSmall = $("#dob__small");
  highlightBorder(jqInput);
  dobMessageSmall.text(msg);
  dobMessageSmall.css("color", "#f87171");
};

const ageError = (day, month, year) => {
  if (!day) return "Ingrese un día";
  if (!month) return "El mes debe ser un número o un nombre válido";
  if (!year) return "Ingrese un año";

  if (day > 31 || day < 1) return "Ingrese un día valido";
  if (day > 30 && (month === 4 || month === 6 || month === 9 || month === 11))
    return "Ingrese un día valido";
  if (day > 29 && month === 2) return "Ingrese un día valido";

  if (month > 12 || month < 1) return "Ingrese un mes valido";

  if (year < currentYear - 120 || year > currentYear)
    return "Ingrese un año valido";
  if (year === currentYear) {
    if (month > currentMonth) return "Ingrese un mes valido";
    if (month === currentMonth && day > currentDay)
      return "Ingrese un día valido";
  }
  return "";
};

const nameError = (name) => {
  if (!name) return "Escriba un nombre";
  if (/\d/.test(name)) return "El nombre no puede contener números";
  if (name.length < 2) return "Nombre muy corto";
  return "";
};

const lastnameError = (lastname) => {
  if (!lastname) return "Escriba un apellido";
  if (/\d/.test(lastname)) return "El apellido no puede contener números";
  if (lastname.length < 2) return "Apellido muy corto";
  return "";
};

const documentNumberError = (documentNumber) => {
  if (!documentNumber) return "Ingrese un número de documento";
  if (!documentNumber.match(/^[0-9]+$/)) return "Solo números son permitidos";
  if (documentNumber.length < 7) return "Número de documento demasiado corto";
  if (documentNumber.length > 20) return "Número de documento demasiado largo";
  return "";
};

const phoneNumberError = (phone) => {
  if (!phone) return "Número de teléfono es requerido";
  if (!/^[0-9+]*$/.test(phone)) return "Solo números son permitidos";

  if (phone.length < 7) return "Número de teléfono demasiado corto";
  if (phone.length > 12) return "Número de teléfono demasiado largo";
  return "";
};

const emailError = (value) => {
  if (!value) return "Email es requerido";
  if (!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
    return "Correo electrónico inválido";
  return "";
};

const usernameError = (value) => {
  if (!value) return "Ingrese un username";
  if (value.length < 6) return "Username demasiado corto";
  if (!value.match(/^[A-Za-z0-9]+$/))
    return "Solo letras y números son permitidos";
  return "";
};

const passwordError = (password) => {
  if (!password) return "Contraseña es requerida";
  if (password.length < 5) return "Contraseña demasiado corta";
  if (password.length > 20) return "Contraseña demasiado larga";
  if (!/[A-Z]/.test(password)) return "Al menos una mayúscula";
  if (!/[a-z]/.test(password)) return "Al menos una minúscula";
  if (!/[0-9]/.test(password)) return "Al menos un número";
  if (!/^[a-zA-Z0-9#%/&]*$/.test(password))
    return "Solo caracteres alfanuméricos y #, %, /, &";
  return "";
};

const confirmPasswordError = (password2) => {
  if (!password2) return "Confirmar contraseña";
  if (password2 !== passwordInput.val()) return "Las contraseñas no coinciden";
  return "";
};
