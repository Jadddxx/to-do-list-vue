myTasks.addEventListener("click", myTasksHandler);
inProgress.addEventListener("click", inProgressHandler);

function myTasksHandler(e) {
  addTaskList(tasks, taskList);
  taskAdd.classList.remove("folded");
}

function inProgressHandler(e) {
  taskList.innerHTML = tasks
    .map((task, index) => {
      if (!task.done) {
        return `<div class="task" data-index="${index}" >
      <div class="task__head ${
        task.collect ? "collect-mode" : ""
      }" data-index="${index}">
    <div class="task__head__main">
      <input class="task__checked" type="checkbox" name="checkbox" data-index="${index}" ${
          task.done ? "checked" : ""
        } disabled="disabled"/>
      <input
        type="name" 
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
  <div class="task__status ${
    task.folded ? "folded" : ""
  }" data-index="${index}">
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
      }
    })
    .join("");

  taskAdd.classList.add("folded");

  [...taskList.children].forEach((item) =>
    item
      .querySelector(".collect-button")
      .addEventListener("click", changeToOtherPlace)
  );
  [...taskList.children].forEach((item) =>
    item
      .querySelector(".edit-button")
      .addEventListener("click", changeToOtherPlace)
  );
}

function changeToOtherPlace(e) {
  alert("Please go to My tasks and changing the task status.");
}
