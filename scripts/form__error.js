const inputs = document.querySelectorAll(".form__input");
const castomeSelect = document.querySelector("#city");
const errorTemplate = document.querySelector("#form__error").content;
const phoneInput = document.querySelector("input[type=tel]");
const regExpPhone =
  /(^\+?[0-9]{1})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{2})[\s\+-:\(\)]*(\d{2})$/;
const regExpDigits = /[A-Za-zА-Яа-яЁё]/g;

function createErrorMsg(element, textError) {
  if (!element.nextSibling.err) {
    element.style.borderColor = "#f40934";
    element.style.marginBottom = "0";
    const errorElement = errorTemplate
      .querySelector(".form__error-container")
      .cloneNode(true);
    errorElement.querySelector(".form__error-img").src =
      "./images/form-error.svg";
    errorElement.querySelector(".form__error-text").textContent = textError;

    errorElement.err = true;
    element.after(errorElement);
  }
}

function deleteError(element) {
  if (element.nextSibling.err) {
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
  input.addEventListener("input", (event) => {
    if (event.target.validity.valid) {
      if (event.target.nextSibling.err) {
        deleteError(input);
      }
    }
    if (!event.target.validity.valid) {
      if (event.target.type !== "tel") {
        createErrorMsg(input, "пожалуйста, заполните это поле");
      }
    }
  });
});

castomeSelect.addEventListener("blur", (e) => {
  deleteError(castomeSelect);
});

phoneInput.addEventListener("input", () => {
  if (phoneInput.value.match(regExpDigits)) {
    phoneInput.value = phoneInput.value.replace(regExpDigits, "");
  } else {
    phoneInput.value = phoneInput.value.replace(regExpPhone, "+7($2)$3-$4-$5");
    if (phoneInput.nextSibling.err && phoneInput.value.match(regExpPhone)) {
      deleteError(phoneInput);
    }
  }
});
phoneInput.addEventListener("change", (event) => {
  if (!event.target.validity.valid) {
    createErrorMsg(
      phoneInput,
      "введите номер телефона в формате +7(xxx)xxx-xx-xx"
    );
  }
});
