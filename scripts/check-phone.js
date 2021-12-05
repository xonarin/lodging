const phoneInput = document.querySelector("#tel");

const regExpPhone =
  /(^\+7|8{1})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{3})[\s\+-:\(\)]*(\d{2})[\s\+-:\(\)]*(\d{2})$/;

phoneInput.addEventListener("change", (e) => {
  if (phoneInput.value.match(regExpPhone)) {
    phoneInput.value = phoneInput.value.replace(regExpPhone, "+7($2)$3-$4-$5");
  } else {
    console.log("Вывести ошибку");
  }
});
