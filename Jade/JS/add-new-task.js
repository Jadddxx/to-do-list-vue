const taskAdd = document.querySelector(".task-add");
const taskList = document.querySelector(".task-list");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 一進來先抓local的東西刷新
addTaskList(tasks, taskList);

taskAdd.addEventListener("submit", addTaskTable);
taskList.addEventListener("click", saveTask);
taskList.addEventListener("click", editTask);
taskList.addEventListener("click", checkedTask);
taskList.addEventListener("click", collectTask);
taskList.addEventListener("click", deleteTask);

function addTaskTable(e) {
  e.preventDefault();
  const title = this.querySelector("input[type=text]").value;
  const taskItem = {
    title,
    date: "",
    datetime: "",
    comment: "",
    file: "",
    collect: false,
    folded: false,
    done: false,
  };

  tasks.push(taskItem);
  addTaskList(tasks, taskList);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  this.reset();
}

function saveTask(e) {
  if (!e.target.classList.contains("save-button")) return;
  const el = e.target;
  const index = el.dataset.index;
  // 選取現在的值
  const taskTitle = this.querySelector(
    `.task[data-index="${index}"] input[type="name"]`
  );
  const taskComment = this.querySelector(
    `.task__body[data-index="${index}"] textarea[name="text"]`
  );
  const taskDate = this.querySelector(
    `.task__body[data-index="${index}"] input[type="date"]`
  );
  const taskDatetime = this.querySelector(
    `.task__body[data-index="${index}"] input[type="datetime"]`
  );
  tasks[index].comment = taskComment.value;
  tasks[index].title = taskTitle.value;
  tasks[index].date = taskDate.value;
  tasks[index].datetime = taskDatetime.value;

  // 控制收合
  tasks[index].folded = !tasks[index].folded;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

function editTask(e) {
  // || edit icon沒用
  if (!e.target.classList.contains("edit-button")) return;

  const el = e.target;
  const index = el.dataset.index;

  tasks[index].folded = !tasks[index].folded;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

// 案的那個target一定要有data-index=.. 不然會抓不到index，所以等於所有要案的案件都要加上data-index=..
function checkedTask(e) {
  if (!e.target.classList.contains("task__checked")) return;

  const el = e.target;
  const index = el.dataset.index;
  tasks[index].done = !tasks[index].done;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

function collectTask(e) {
  if (!e.target.classList.contains("collect-button")) return;

  const el = e.target;
  const index = el.dataset.index;
  tasks[index].collect = !tasks[index].collect;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

function deleteTask(e) {
  if (!e.target.classList.contains("delete-button")) return;

  const el = e.target;
  const index = el.dataset.index;

  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

// function addFolded(e) {
//   if (!e.target.classList.contains("save-button")) return;
//   const el = e.target;
//   const index = el.dataset.index;
//   tasks[index].folded = !tasks[index].folded;

//   const taskTitle = document.querySelector(
//     `.task__title[data-index="${index}"]`
//   );
//   const taskHead = document.querySelector(`.task__head[data-index="${index}"]`);
//   const taskBody = document.querySelector(`.task__body[data-index="${index}"]`);
//   const taskStatus = document.querySelector(
//     `.task__status[data-index="${index}"]`
//   );

//   taskTitle.setAttribute("disabled", "disabled");
//   taskHead.classList.toggle("task__head_border");
//   taskBody.classList.toggle("folded");
//   taskStatus.classList.toggle("folded");

//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   addTaskList(tasks, taskList);
// }
// ${ task.folded ? `<div class="status__detail">
// <div class="status__detail__date">
//   <i class="fa-regular fa-calendar-days"></i>
//   <p>${task.date}</p>
// </div>
// <div class="status__detail__file">
//   <i class="fa-regular fa-file"></i>
//   <p>${task.file}</p>
// </div>
// <div class="status__detail__comment">
//   <i class="fa-regular fa-comment-dots"></i>
//   <p>${task.comment}</p>
// </div>
// </div>` : "" }

function addTaskList(tasks = [], taskList) {
  taskList.innerHTML = tasks
    .map((task, index) => {
      return `<div class="task" data-index="${index}" >
    <div class="task__head ${
      task.collect ? "collect-mode" : ""
    }" data-index="${index}">
  <div class="task__head__main">
    <input class="task__checked" type="checkbox" name="checkbox" data-index="${index}" ${
        task.done ? "checked" : ""
      }/>
    <input
      type="name" d
      class="task__title"
      placeholder="type something here..."
      value="${task.title}"
      ${task.folded ? 'disabled="disabled"' : ""} />
  </div>
  <div class="task__head__icon" data-index="${index}">
    <button type="button" class="collect-button" data-index="${index}">
      <i class="${
        task.collect ? "fa-solid collect-color" : "fa-regular"
      } fa-star"></i>
    </button>
    <button type="button" class="edit-button" data-index="${index}">
      <i class="fa-solid fa-pen"></i>
    </button>
  </div>
</div>
${
  task.folded
    ? `<div class="status__detail ${task.collect ? "collect-mode" : ""}">
${
  task.date === ""
    ? ""
    : `<div class="status__detail__date">
<i class="fa-regular fa-calendar-days"></i>
<p>${task.date}</p>
</div>`
}
${
  task.file === ""
    ? ""
    : `<div class="status__detail__file">
<i class="fa-regular fa-file"></i>
<p>${task.file}</p>
</div>`
}
${
  task.comment === ""
    ? ""
    : `<div class="status__detail__comment">
<i class="fa-regular fa-comment-dots"></i>
</div>`
}
</div>`
    : ""
}
<div class="task__body ${
        task.folded ? "folded" : "task-body-top-border"
      }" data-index="${index}">
  <div class="date">
    <h3>dateline</h3>
    <div class="date__input">
      <input type="date" placeholder="yyyy/mm/dd" value="${task.date}"/>
      <input type="datetime" placeholder="hh:mm" value="${task.datetime}"/>
    </div>
  </div>
  <div class="file">
    <h3>File</h3>
    <label for="file"><i class="fa-solid fa-square-plus"></i></label>
    <input id="file" type="file" name="" accept="" />
  </div>
  <div class="comment">
    <h3>comment</h3>
    <textarea
      name="text"
      cols="10"
      rows="4"
      placeholder="type your memo here..."
    >${task.comment === "" ? "" : task.comment}</textarea>
  </div>
</div>
<div class="task__status ${task.folded ? "folded" : ""}" data-index="${index}">
  <button class="delete-button" type="button" data-index="${index}">
    <i class="fa-regular fa-x"></i>
    <p>delete</p>
  </button>
  <button class="save-button" type="button" data-index="${index}">
    <i class="fa-regular fa-plus"></i>
    <p>save</p>
  </button>
</div>
</div>`;
    })
    .join("");
}

// 事件驅動
// function addTaskHandler() {
//   const taskInput = document.querySelector(".task-add input[type=text]");

//   const newTask = document.createElement("form");
//   newTask.classList.add("task");
//   newTask.innerHTML = `<div class="task__head task__head_border">
//   <div class="task__head__main">
//     <input type="checkbox" name="checkbox"/>
//     <input
//       type="name"
//       class="task__title"
//       placeholder="type something here..."
//       value="${taskInput.value}"
//     />
//   </div>
//   <div class="task__head__icon">
//     <button type="button" class="collect-button">
//       <i class="fa-regular fa-star"></i>
//     </button>
//     <button type="button" class="edit-button">
//       <i class="fa-solid fa-pen"></i>
//     </button>
//   </div>
// </div>
// <div class="task__body">
//   <div class="date">
//     <h3>dateline</h3>
//     <div class="date__input">
//       <input type="text" placeholder="yyyy/mm/dd" />
//       <input type="text" placeholder="hh:mm" />
//     </div>
//   </div>
//   <div class="file">
//     <h3>File</h3>
//     <label for="file"><i class="fa-solid fa-square-plus"></i></label>
//     <input id="file" type="file" name="" accept="" />
//   </div>
//   <div class="comment">
//     <h3>comment</h3>
//     <textarea
//       name=""
//       id="comment"
//       cols="10"
//       rows="4"
//       placeholder="type your memo here..."
//     ></textarea>
//   </div>
// </div>
// <div class="task__status">
//   <button class="delete-button" type="button">
//     <i class="fa-regular fa-x"></i>
//     <p>delete</p>
//   </button>
//   <button class="save-button" type="button">
//     <i class="fa-regular fa-plus"></i>
//     <p>save</p>
//   </button>
// </div>`;
//   taskInput.value = "";
//   // this.reset();

//   list.appendChild(newTask);
// }
