var dragged;

function dragstart_handler(ev) {
    console.log("dragstart handler")
    // 데이터 전달 객체에 대상 요소의 id를 추가합니다.
    ev.dataTransfer.setData("text/html", ev.target.id);
    console.log("drastart over")
}

function drop_handler(ev) {
    console.log("drop start")
    ev.preventDefault();
    // 대상의 id를 가져와 대상 DOM에 움직인 요소를 추가합니다.
    const data = ev.dataTransfer.getData("text/html");
    ev.dataTransfer.dropEffect = "move";
   }

document.addEventListener('DOMContentLoaded', () => {
    // id를 통해 element를 가져옵니다.
    const element = document.getElementById("pw1");
    // 'dragstart' 이벤트 리스터를 추가합니다.
    element.addEventListener("dragstart", dragstart_handler);
    // element.addEventListener("dragdrop", dragstart_handler);
});

document.addEventListener("dragend", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    const element = document.getElementById("pw1");
    element.addEventListener("dragend", dragdrop_handler);
}, false);


// /* events fired on the draggable target */
// document.addEventListener("drag", function(event) {
//     console.log("drag")
// }, false);

// document.addEventListener("dragend", function(event) {
//     console.log("dragend")
//   // reset the transparency
//   event.target.style.opacity = "";
// }, false);

// /* events fired on the drop targets */
// document.addEventListener("dragover", function(event) {
//     console.log("dragover")
//   // prevent default to allow drop
//   event.preventDefault();
// }, false);
