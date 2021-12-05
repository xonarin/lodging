const phoneInput = document.querySelector("#tel");
let errorContainer;

const regExpPhone =
  /(^\+7|8{1})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{2})[\s\+-:\(\)]*(\d{2})$/;

let errorFlag = false;
phoneInput.addEventListener("change", (event) => {
  if (phoneInput.value.match(regExpPhone)) {
    phoneInput.value = phoneInput.value.replace(regExpPhone, "+7($2)$3-$4-$5");
    phoneInput.style = undefined;
    errorContainer.style.display = "none";
    errorFlag = false;
  } else if (!errorFlag) {
    phoneInput.style.borderColor = "#f40934";
    phoneInput.style.marginBottom = "0";
    const errorElement = errorTemplate
      .querySelector(".form__error-container")
      .cloneNode(true);
    errorElement.querySelector(".form__error-img").src =
      "./images/form-error.svg";
    errorElement.querySelector(".form__error-text").textContent =
      "пожалуйста, введите номер телефона в формате +7(xxx)xxx-xx-xx";
    phoneInput.after(errorElement);
    errorContainer = document.querySelector(".form__error-container");
    errorFlag = true;
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
