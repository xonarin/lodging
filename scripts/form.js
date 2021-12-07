"use strict";

const backButton = document.querySelector(".form__button_type_back");
const form = document.querySelector(".form");
const categories = {
  cafe: "/form-cafe-1.html",
  master: "/form-lection.html",
  party: "/form-party-1.html",
  other: "/form-other.html",
};
const categories2 = {
  cafe: "./form-cafe-2.html",
  master: "./form-lection-2.html",
  party: "./form-party-2.html",
  other: "./form-other-2.html",
};

function nextPage(elements, obj) {
  elements.forEach((element) => {
    if (window.location.href.includes(obj[element])) {
      window.location.href = categories2[element];
    }
  });
}

backButton.addEventListener("click", () => {
  window.location.href = "./form-category.html";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  nextPage(Object.keys(categories), categories);
});
