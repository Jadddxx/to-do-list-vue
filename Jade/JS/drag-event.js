// *先讓task可以互相移動
// - 綁定container是可以被drop，每個task都是draggable=true
// - 依照位置來改變index值，所以會重新渲染畫面

// *替每個task加上before, after，之後判斷要加在前面後面
// - 會使用task的offsetY是否大小於1/2，判斷放前面後面

// todo 判斷task要被新增的位置，是在前面後面，然後讓兩個index值互相交換？
// -宣告被覆蓋的那個item，來比對判斷，然後用Node.insertBefore()

const allTasks = document.querySelectorAll(".task");

allTasks.forEach((task) => {
  task.addEventListener("dragstart", dragHandler);
});

function dragHandler(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.index);
}

taskList.addEventListener("drop", dropHandler);
taskList.addEventListener("dragenter", cancelDefault);
taskList.addEventListener("dragover", cancelDefault);

function dropHandler(e) {
  let index = e.dataTransfer.getData("text/plain");
  taskList.appendChild(document.querySelector(`.task[data-index="${index}"]`));
}

function cancelDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}
