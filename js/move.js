let isDragging = false;
let shiftX, shiftY;
let zidx;

const Moving = Move.prototype;

const IMG_NUM = 31;
const dragElements = new Array(IMG_NUM);
function Move(){
    for (let i = 0; i<IMG_NUM; i++) {
        dragElements[i] = document.querySelector(`.prowdmon${i}`);
    }
    this.Engine();
}


Moving.Engine = function(){
    for (let i = 0; i<IMG_NUM; i++) {
        dragElements[i].addEventListener('mousedown', event => {
            if (!dragElements[i]) return;
            event.preventDefault();
            dragElements[i].ondragstart = function() {
                return false;
            };
            if(!event.srcElement.classList.contains('draggable')){
                return false;
            }
            startDrag(event);
        });
        dragElements[i].addEventListener('dblclick', event => {
            if (!dragElements[i]) return;
            event.preventDefault();
            dragElements[i].ondragstart = function() {
                return false;
            };
            if(event.srcElement.style.zIndex == "1") {
                console.log(event.srcElement, event.srcElement.style.zIndex);
                event.srcElement.style.zIndex="0";
            } else {
                console.log(event.srcElement, event.srcElement.style.zIndex);
                event.srcElement.style.zIndex="1";
            }
            saveLocation(event);
        });
    }
}

function onMouseUp(event) {
    finishDrag(event);
    saveLocation(event);
}

function onMouseMove(event) {
    moveAt(event);
}

// on drag start:
//   remember the initial shift
//   move the element position:fixed and a direct child of body
function startDrag(event) {
    let element = event.srcElement;
    let clientX = event.clientX;
    let clientY = event.clientY;

    if(isDragging) { return; }
    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';
    zidx = element.style.zIndex;
    console.log(zidx);
    element.style.zIndex = 2;

    //moveAt(event);
}


// switch to absolute coordinates at the end, to fix the element in the document
function finishDrag(event) {
    if(!isDragging) {
        return;
    }

    isDragging = false;

    let dragElement = event.srcElement;
    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
    
    dragElement.style.zIndex = zidx;
    
}



function moveAt(event) {
    // new window-relative coordinates
    let dragElement = event.srcElement;
    let clientX = event.clientX;
    let clientY = event.clientY;

    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // check if the new coordinates are below the bottom window edge
    let newBottom = newY + dragElement.offsetHeight; // new bottom

    // below the window? let's scroll the page
    if (newBottom > document.documentElement.clientHeight) {
        // window-relative coordinate of document end
        let docBottom = document.documentElement.getBoundingClientRect().bottom;

        // scroll the document down by 10px has a problem
        // it can scroll beyond the end of the document
        // Math.min(how much left to the end, 10)
        let scrollY = Math.min(docBottom - newBottom, 10);

        // calculations are imprecise, there may be rounding errors that lead to scrolling up
        // that should be impossible, fix that here
        if (scrollY < 0) scrollY = 0;

        window.scrollBy(0, scrollY);

        // a swift mouse move make put the cursor beyond the document end
        // if that happens -
        // limit the new Y by the maximally possible (right at the bottom of the document)
        newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // check if the new coordinates are above the top window edge (similar logic)
    if (newY < 0) {
        // scroll up
        let scrollY = Math.min(-newY, 10);
        if (scrollY < 0) scrollY = 0; // check precision errors

        window.scrollBy(0, -scrollY);
        // a swift mouse move can put the cursor beyond the document start
        newY = Math.max(newY, 0); // newY may not be below 0
    }


    // limit the new X within the window boundaries
    // there's no scroll here so it's simple
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
        newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
}

function saveLocation(event) {
    const X = event.target.style.left;
    const Y = event.target.style.top;
    const element = event.target.classList[1];
    const zindex = event.srcElement.style.zIndex;
    const location = {element, X, Y, zindex};
    localStorage.setItem(`${element}`, JSON.stringify(location));
}

function loadLocation() {
    for (let i=0; i<IMG_NUM; i++) {
        const loadedLocation = localStorage.getItem(`prowdmon${i}`);
        const parseIcon = JSON.parse(loadedLocation);
        if (!parseIcon) continue;
        let drag1 = document.querySelector("."+parseIcon.element);
        drag1.style.left = parseIcon.X;
        drag1.style.top = parseIcon.Y;
        drag1.style.position = 'absolute';
        drag1.style.zIndex = ""+parseIcon.zindex;
    }
}

function init() {
    loadLocation();
}

init();
new Move();