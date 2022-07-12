// import { createDialog } from "./alertDialog";

export function validateInputs(toValid) {
  for (let key in toValid) {
    let el = toValid[key];
    if (!checkFunction(el.value, el.regex) || !el.value.trim()) {
      //   errorDialog(`Podano niepoprawne ${el.label}!`);
      return el.label;
    }
  }
  return "";
}

export function validatePesel(pesel) {
  const regex = /^[0-9]/;
  if (pesel.length !== 11 || !regex.test(pesel)) {
    // errorDialog(`Podano niepoprawny pesel!`);
    return false;
  }
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    if (i % 4 == 0) {
      sum += (+pesel[i] * 1) % 10;
    } else if (i % 4 == 1) {
      sum += (+pesel[i] * 3) % 10;
    } else if (i % 4 == 2) {
      sum += (+pesel[i] * 7) % 10;
    } else {
      sum += (+pesel[i] * 9) % 10;
    }
  }
  sum %= 10;
  const checkNumber = 10 - sum;
  if (
    +pesel[10] !== checkNumber ||
    +pesel.slice(4, 6) > 31 ||
    +pesel.slice(2, 4) % 20 > 12
  ) {
    // errorDialog(`Podano niepoprawny pesel!`);
    return false;
  }
  return true;
}

export function checkFunction(elemVal, regex) {
  let value = elemVal || "";
  if (regex) {
    if (!value.trim() || !regex.test(value)) {
      return false;
    }
  } else if (!value.trim()) {
    return false;
  }
  return true;
}
