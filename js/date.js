const dateForm = document.querySelector(".js-date"),
  dateText = document.querySelector(".js-date-text");

function printDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  dateText.innerText = `${month}. ${day}. ${year}`;
}

function init() {
  printDate();
}

init();
