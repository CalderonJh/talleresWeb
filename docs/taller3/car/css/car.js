const divRegisterPreferences = document.getElementById(
  "div__preferences_toggle",
);
const divRegisterPreferencesOption = document.getElementById(
  "div__register_preferences_option",
);
const radioRegisterPreferencesYes = document.getElementById(
  "car-preferences-yes",
);
console.log(radioRegisterPreferencesYes);
divRegisterPreferencesOption.addEventListener("click", function () {
  if (radioRegisterPreferencesYes.checked)
    divRegisterPreferences.classList.remove("__hidden");
  else divRegisterPreferences.classList.add("__hidden");
});
