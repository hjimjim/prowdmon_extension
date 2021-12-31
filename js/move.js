const IMG_NUM = 31;
const dragElements = new Array(IMG_NUM);
function Move(){
    for (let i = 0; i<IMG_NUM; i++) {
        dragElements[i] = document.querySelector(`.prowdmon${i}`);
        dragElement(dragElements[i]);
    }
}

//Make the DIV element draggagle:
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; zidx=0;
  elmnt.onmousedown = dragMouseDown;
  elmnt.ondblclick = changeZIndex;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    zidx = e.target.style.zIndex;
    e.target.style.zIndex = 2;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    elmnt.style.zIndex = zidx;
    saveLocation();
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function changeZIndex(e) {
    e = e || window.event;
    e.preventDefault();
      if(elmnt.style.zIndex == "1") {
        elmnt.style.zIndex="0";
      } else {
        elmnt.style.zIndex="1";
      }
      saveLocation();
  }

  function saveLocation() {
    const X = elmnt.style.left;
    const Y = elmnt.style.top;
    const name = elmnt.classList[1];
    const zindex = elmnt.style.zIndex;
    const location = {name, X, Y, zindex};
    localStorage.setItem(`${name}`, JSON.stringify(location));
  }
}

function loadLocation() {
    for (let i=0; i<IMG_NUM; i++) {
        const loadedLocation = localStorage.getItem(`prowdmon${i}`);
        const parseIcon = JSON.parse(loadedLocation);
        if (!parseIcon) continue;
        let drag1 = document.querySelector("."+parseIcon.name);
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