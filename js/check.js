const Checking = Check.prototype;
const PR_NUM = 3;
let pr_array = new Array(PR_NUM);

function Check(){
    this.div = document.querySelector(".info-li");
    this.button = document.querySelector(".info-btn");
    this.logo = document.querySelector(".logo");
    this.Engine();
}
function showInfo() {
  $('.info-wrapper').removeClass('closed');
}
function CheckToggle(evt) {
    var values = document.getElementsByName("check");
    for (var i=0; i<values.length; i++) {
      if(values[i].checked){
        $(`.prowdmon${i}`).addClass('active');
        pr_array[i] = i;
      } else{
        $(`.prowdmon${i}`).removeClass('active');
      }
    }
    saveCheck(pr_array);

    if (!$('.info-wrapper').hasClass('closed')) {
        $('.info-wrapper').addClass('closed');
        console.log("hhhhhhh")
        evt.preventDefault();
    }
}
function saveCheck(values) {
  localStorage.setItem("value_array", JSON.stringify(values));
}

function loadCheck() {
  const loadedCheck = localStorage.getItem("value_array");
  var values = JSON.parse(loadedCheck);
  var check = false;
  for (let i=0; i<PR_NUM; i++) {
      if(values[i]){
        $(`.prowdmon${i}`).addClass('active');
        check = true;
      }
  }
  if(check){
    $('.info-wrapper').addClass('closed');
  }
}
Checking.Engine = function(){
    console.log("89898989");
    this.button.addEventListener('click', CheckToggle);
    this.logo.addEventListener('click',showInfo);
    loadCheck();
}

new Check();