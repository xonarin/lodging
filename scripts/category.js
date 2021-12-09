"use strict";

const selectCategories = document.querySelectorAll(".form__input_type_radio-custom");
const nextButton = document.querySelector(".form__button_type_next");
const backButton = document.querySelector(".form__button_type_back");
const form = document.querySelector(".form");
const categories = {
  cafe: "./form-cafe-1.html",
  lection: "./form-lection.html",
  party: "./form-party-1.html",
  other: "./form-other.html",
};

function nextPage(elements, obj) {
  elements.forEach((element) => {
    if (element.checked) {
      element.checked = false;
      window.location.href = obj[element.value];
    }
  });
}

selectCategories.forEach((category) => {
  category.addEventListener("change", () => {
    nextButton.classList.add("form__button_active");
    nextButton.disabled = false;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  nextPage(selectCategories, categories);
});
backButton.addEventListener("click", () => {
  selectCategories.forEach((category) => {
    if (category.checked) {
      category.checked = false;
    }
  });
  window.location.href = "./index.html";
});
