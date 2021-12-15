const clockForm = document.querySelector(".js-clock"),
  clockText = document.querySelector(".js-clock-text");

function printClock() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  clockText.innerText = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;
}

function init() {
  printClock();
  setInterval(printClock, 1000);
}
init();
