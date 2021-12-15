const Searching = Search.prototype;

function Search(){
    this.keyword = document.querySelector('input[name = "search"]');
    this.button = document.querySelector('.search-icon');
    this.form = document.querySelector('.search-box');
    this.ss = document.querySelector('.close');
    this.Engine();
}

function searchToggle(evt) {
    if (!$('.search-wrapper').hasClass('active')) {
        $('.search-wrapper').addClass('active');
        evt.preventDefault();
        $('.search-wrapper').find('.search-input').val('');
    }
    else if ($('.search-wrapper').hasClass('active') && $('.close').closest('.input-holder').length == 0) {
        $('.search-wrapper').removeClass('active');
    }
}

Searching.Engine = function(){
    this.button.addEventListener('click', searchToggle);
    this.ss.addEventListener('click', searchToggle);
    this.form.addEventListener('submit', e => {
            e.preventDefault();
            let keyword = this.keyword.value;
            console.log(keyword)
            location.href = 'https://www.google.co.kr/search?q=' + keyword;
    });
}

new Search();


