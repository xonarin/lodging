const inputs = document.querySelectorAll(".form__input");
const castomeSelect = document.querySelector("#city");
const errorTemplate = document.querySelector("#form__error").content;
const phoneInput = document.querySelector("input[type=tel]");
const regExpPhone =
  /(^\+7|8{1})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{2})[\s\+-:\(\)]*(\d{2})$/;
const regExpDigits = /[A-Za-zА-Яа-яЁё]/;
let errorFlag = false;

function createErrorMsg(element, textError) {
  if (!element.style.marginBottom) {
    element.style.borderColor = "#f40934";
    element.style.marginBottom = "0";
    const errorElement = errorTemplate
      .querySelector(".form__error-container")
      .cloneNode(true);
    errorElement.querySelector(".form__error-img").src =
      "./images/form-error.svg";
    errorElement.querySelector(".form__error-text").textContent = textError;
    errorFlag = true;
    element.after(errorElement);
  }
}

function deleteError(element) {
  element.style.borderColor = "";
  element.style.marginBottom = "";

  element.nextSibling.remove();
}

inputs.forEach((input) => {
  input.addEventListener("invalid", (event) => {
    if (!event.target.validity.valid) {
      createErrorMsg(input, "пожалуйста, заполните это поле");
    }
  });
  input.addEventListener("input", (event) => {
    if (event.target.validity.valid) {
      if (event.target.style.marginBottom) {
        deleteError(input);
      }
    }
    if (!event.target.validity.valid) {
      createErrorMsg(input, "пожалуйста, заполните это поле");
    }
  });
});

castomeSelect.addEventListener("blur", () => {
  deleteError(castomeSelect);
});

phoneInput.addEventListener("change", () => {
  if (phoneInput.value.match(regExpDigits)) {
    phoneInput.value = "+7(";
  } else {
    phoneInput.value = phoneInput.value.replace(regExpPhone, "+7($2)$3-$4-$5");
    if (errorFlag && phoneInput.validity.valid) {
      deleteError(phoneInput);
      errorFlag = false;
    }
  }
});
