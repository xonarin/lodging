const inputs = document.querySelectorAll(".form__input");
const castomeSelect = document.querySelector("#city");
const errorTemplate = document.querySelector("#form__error").content;
const phoneInput = document.querySelector("input[type=tel]");
const regExpPhone =
  /(^\+7|8{1})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{2})[\s\+-:\(\)]*(\d{2})$/;
const regExpDigits = /[A-Za-zА-Яа-яЁё]/;
let errorImg;
let errorMsg;
let errorFlag = false;

function createErrorMsg(element, textError) {
  if (!element.style.marginBottom) {
    element.style.borderColor = "#f40934";
    element.style.marginBottom = "0";
    const errorElement = errorTemplate
      .querySelector(".form__error-container")
      .cloneNode(true);
    errorImg = errorElement.querySelector(".form__error-img").src =
      "./images/form-error.svg";
    errorMsg = errorElement.querySelector(".form__error-text").textContent =
      textError;
    element.after(errorElement);
  }
}

function deleteError(element) {
  if (errorMsg && errorImg) {
    element.style.borderColor = "";
    element.style.marginBottom = "";
    element.nextSibling.remove();
  }
}

inputs.forEach((input) => {
  input.addEventListener("invalid", (event) => {
    if (!event.target.validity.valid) {
      createErrorMsg(input, "пожалуйста, заполните это поле");
    }
  });
  input.addEventListener("change", (event) => {
    if (event.target.validity.valid) {
      deleteError(input);
    }
  });
});

castomeSelect.addEventListener("blur", () => {
  deleteError(castomeSelect);
});

phoneInput.addEventListener("change", (event) => {
  if (phoneInput.value.match(regExpDigits)) {
    phoneInput.value = "+7(";
  } else if (!phoneInput.value.match(regExpPhone)) {
    if (!errorFlag) {
      deleteError(phoneInput);
      createErrorMsg(
        phoneInput,
        "введите номер телефона в формате +7(xxx)xxx-xx-xx"
      );
      errorFlag = true;
    }
  } else {
    phoneInput.value = phoneInput.value.replace(regExpPhone, "+7($2)$3-$4-$5");
    phoneInput.style = undefined;
    deleteError(phoneInput);
    errorFlag = false;
    phoneInput.removeAttribute("minLength");
    phoneInput.removeAttribute("pattern");
  }
});
