const InfoE = Info.prototype;

function Info(){
    this.form = document.querySelector('.info-wrapper');
    this.ss = document.querySelector('.close-info');
    this.Engine();
}

function InfoToggle(evt) {
    if (!$('.info-wrapper').hasClass('closed')) {
        $('.info-wrapper').addClass('closed');
        console.log("hhhhhhh")
        evt.preventDefault();
    }
    else if ($('.info-wrapper').hasClass('active') && $('.close').closest('.input-holder').length == 0) {
        // $('.info-wrapper').removeClass('active');
    }
}

InfoE.Engine = function(){
    console.log("aaaaaaa")
    this.ss.addEventListener('click', InfoToggle);
}

new Info();


