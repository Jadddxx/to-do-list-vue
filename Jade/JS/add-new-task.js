const taskAdd = document.querySelector(".task-add");
const taskList = document.querySelector(".task-list");
// 如果localStorage有東西就抓裡面的task
// const tasks = [];
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 一進來先抓local的東西刷新
addTaskList(tasks, taskList);

taskAdd.addEventListener("submit", addTaskTable);

function addTaskTable(e) {
  e.preventDefault();
  const title = this.querySelector("input[type=text]").value;
  const taskItem = {
    id: Date.now(),
    title,
    date: "",
    datetime: "",
    comment: "",
    file: "",
    isCollect: false,
    isFolded: false,
    isDone: false,
  };

  tasks.push(taskItem);
  addTaskList(tasks, taskList);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  this.reset();
}

function saveTask(e) {
  const el = e.target;
  const id = el.dataset.id;
  // ! 這個拿到的是字串！

  // ?這邊用this.querySelector / document.querySelector 有什麼差別？
  const taskTitle = document.querySelector(
    `.task[data-id="${id}"] input[type="name"]`
  );

  const taskComment = document.querySelector(
    `.task__body[data-id="${id}"] textarea[name="text"]`
  );

  const taskDate = document.querySelector(
    `.task__body[data-id="${id}"] input[type="date"]`
  );
  const taskDatetime = document.querySelector(
    `.task__body[data-id="${id}"] input[type="datetime"]`
  );

  tasks.forEach((task, index) => {
    if (task.id === Number(id)) {
      tasks[index].comment = taskComment.value;
      tasks[index].title = taskTitle.value;
      tasks[index].date = taskDate.value;
      tasks[index].datetime = taskDatetime.value;
      tasks[index].isFolded = !tasks[index].isFolded;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

function editTask(e) {
  const el = e.target;
  const id = el.dataset.id;
  tasks.forEach((task) => {
    if (task.id === Number(id)) {
      task.isFolded = !task.isFolded;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

function checkedTask(e) {
  const el = e.target;
  const id = el.dataset.id;
  tasks.forEach((task) => {
    if (task.id === Number(id)) {
      task.isDone = !task.isDone;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

function collectTask(e) {
  const el = e.target;
  const id = el.dataset.id;
  tasks.forEach((task) => {
    if (task.id === Number(id)) {
      task.isCollect = !task.isCollect;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

function deleteTask(e) {
  const el = e.target;
  const id = el.dataset.id;
  let index1;
  tasks.forEach((task, index) => {
    if (task.id === Number(id)) {
      index1 = index;
    }
  });
  tasks.splice(index1, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

// !有change再動
function fileTask(e) {
  const el = e.target;
  const id = el.dataset.id;
  const fileName = el.files[0].name;

  tasks.forEach((task) => {
    if (task.id === Number(id)) {
      task.file = fileName;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskList(tasks, taskList);
}

function addTaskList(tasks = [], taskList) {
  taskList.innerHTML = tasks
    .map((task) => {
      return `<div class="task" draggable="true" data-id="${task.id}">
    <div class="task__head ${task.isCollect ? "collect-mode" : ""}" data-id="${
        task.id
      }">
  <div class="task__head__main">
    <input class="task__checked" type="checkbox" name="checkbox" data-id="${
      task.id
    }" ${task.isDone ? "checked" : ""}/>
    <input
      type="name" 
      class="task__title"
      placeholder="type something here..."
      value="${task.title}"
      ${task.isFolded ? 'disabled="disabled"' : ""} />
  </div>
  <div class="task__head__icon" data-id="${task.id}">
    <button type="button" class="collect-button" data-id="${task.id}">
      <i class="${
        task.isCollect ? "fa-solid collect-color" : "fa-regular"
      } fa-star"></i>
    </button>
    <button type="button" class="edit-button" data-id="${task.id}">
      <i class="fa-solid fa-pen"></i>
    </button>
  </div>
</div>
${
  task.isFolded
    ? `<div class="status__detail ${task.isCollect ? "collect-mode" : ""}">
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
        task.isFolded ? "folded" : "task-body-top-border"
      }" data-id="${task.id}">
  <div class="date">
    <h3>dateline</h3>
    <div class="date__input">
      <input type="date" placeholder="yyyy/mm/dd" value="${task.date}"/>
      <input type="datetime" placeholder="hh:mm" value="${task.datetime}"/>
    </div>
  </div>
  <div class="file">
    <h3>File</h3>
    <label for="file-${task.id}" data-id="${
        task.id
      }"><i class="fa-solid fa-square-plus"></i></label>
    <input id="file-${task.id}" type="file" data-id="${
        task.id
      }" name="" accept="" />
    ${task.file === "" ? "" : `<div class="fileNameBox">${task.file}</div>`}
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
<div class="task__status ${task.isFolded ? "folded" : ""}" data-id="${task.id}">
  <button class="delete-button" type="button" data-id="${task.id}">
    <i class="fa-regular fa-x"></i>
    <p>delete</p>
  </button>
  <button class="save-button" type="button" data-id="${task.id}">
    <i class="fa-regular fa-plus"></i>
    <p>save</p>
  </button>
</div>
</div>`;
    })
    .join("");

  [...taskList.children].forEach((item) =>
    item.querySelector(".collect-button").addEventListener("click", collectTask)
  );

  [...taskList.children].forEach((item) =>
    item.querySelector(".edit-button").addEventListener("click", editTask)
  );

  [...taskList.children].forEach((item) =>
    item.querySelector(".task__checked").addEventListener("click", checkedTask)
  );

  [...taskList.children].forEach((item) =>
    item.querySelector(".delete-button").addEventListener("click", deleteTask)
  );

  [...taskList.children].forEach((item) =>
    item.querySelector(".save-button").addEventListener("click", saveTask)
  );

  [...taskList.children].forEach((item) =>
    item
      .querySelector(`input[type="file"]`)
      .addEventListener("change", fileTask)
  );
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
