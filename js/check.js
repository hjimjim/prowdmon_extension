const Checking = Check.prototype;
const PR_NUM = 3;
let pr_array = new Array(PR_NUM);

function Check(){
    this.form = document.querySelector(".info-li");
    this.button = document.querySelector(".info-btn");
    this.Engine();
}

function CheckToggle() {
    var values = document.getElementsByName("check");
    for (var i=0; i<values.length; i++) {
      if(values[i].checked){
        pr_array.push(i);
      }
    }
    document.querySelector(".intext").value = "dddd";
}

Checking.Engine = function(){
    console.log("89898989");
    this.form.addEventListener('submit', CheckToggle);
}

new Check();