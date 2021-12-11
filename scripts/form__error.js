const inputs = document.querySelectorAll(".form__input");
const customeSelect = document.querySelector(".form__input_type_select");
const errorTemplate = document.querySelector("#form__error").content;
const phoneInput = document.querySelector("input[type=tel]");
const regExpPhone =
  /(^\+?[0-9]{1})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{2})[\s\+-:\(\)]*(\d{2})$/;
const regExpAphabet = /[A-Za-zА-Яа-яЁё]/g;
const sities = document.querySelectorAll(".form__select-item");
const selectContainer = document.querySelector(".form__select-container");

function createErrorMsg(element, textError) {
  if (!element.nextSibling.err) {
    element.style.borderColor = "#f40934";
    element.style.outlineColor = "#f40934";
    element.style.marginBottom = "0";
    if (customeSelect.nextElementSibling.err) {
      selectContainer.style.marginBottom = "0";
    }
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
    element.style = "";
    if (selectContainer.style.marginBottom === "0px") {
      selectContainer.style = "";
    }
    element.nextSibling.remove();
  }
}

inputs.forEach((input) => {
  input.addEventListener("invalid", (event) => {
    if (!event.target.validity.valid) {
      if (event.target.placeholder === "выберите из списка") {
        createErrorMsg(input, "пожалуйста, выберите город");
        customeSelect.setCustomValidity("выберите город из списка");
      } else if (event.target.type === "tel") {
        createErrorMsg(
          input,
          "введите номер телефона в формате +7(xxx)xxx-xx-xx"
        );
      } else {
        createErrorMsg(input, "пожалуйста, заполните это поле");
      }
    }
  });

  input.addEventListener("change", (event) => {
    if (event.target.validity.valid) {
      if (event.target.nextSibling.err) {
        deleteError(input);
      }
    } else {
      if (event.target.type !== "tel") {
        createErrorMsg(input, "пожалуйста, заполните это поле");
      } else {
        createErrorMsg(
          input,
          "введите номер телефона в формате +7(xxx)xxx-xx-xx"
        );
      }
    }
  });
});

sities.forEach((sity) => {
  sity.addEventListener("click", () => {
    if (sity.classList.contains("form__select-item_type_selected")) {
      deleteError(customeSelect);
      customeSelect.setCustomValidity("");
    }
  });
});

phoneInput.addEventListener("input", () => {
  if (phoneInput.value.match(regExpAphabet)) {
    phoneInput.value = phoneInput.value.replace(regExpAphabet, "");
  } else {
    phoneInput.value = phoneInput.value.replace(regExpPhone, "+7($2)$3-$4-$5");
    if (phoneInput.nextSibling.err && phoneInput.value.match(regExpPhone)) {
      deleteError(phoneInput);
    }
  }
});
