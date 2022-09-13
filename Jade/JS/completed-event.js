//* click之後只會顯示有done的物件。

completed.addEventListener("click", completedHandler);

function completedHandler(e) {
  taskList.innerHTML = tasks
    .map((task) => {
      if (task.isDone) {
        return `<div class="task" draggable="true" data-uuid="${task.uuid}">
        <div class="task__head ${
          task.isCollect ? "collect-mode" : ""
        }" data-uuid="${task.uuid}">
      <div class="task__head__main">
        <input class="task__checked" type="checkbox" name="checkbox" data-uuid="${
          task.uuid
        }" ${task.isDone ? "checked" : ""}/>
        <input
          type="name" 
          class="task__title"
          placeholder="type something here..."
          value="${task.title}"
          ${task.isFolded ? 'disabled="disabled"' : ""} />
      </div>
      <div class="task__head__icon" data-uuid="${task.uuid}">
        <button type="button" class="collect-button" data-uuid="${task.uuid}">
          <i class="${
            task.isCollect ? "fa-solid collect-color" : "fa-regular"
          } fa-star"></i>
        </button>
        <button type="button" class="edit-button" data-uuid="${task.uuid}">
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
    }" data-uuid="${task.uuid}">
      <div class="date">
        <h3>dateline</h3>
        <div class="date__input">
          <input type="date" placeholder="yyyy/mm/dd" value="${task.date}"/>
          <input type="datetime" placeholder="hh:mm" value="${task.datetime}"/>
        </div>
      </div>
      <div class="file">
        <h3>File</h3>
        <label for="file-${task.uuid}" data-uuid="${
          task.uuid
        }"><i class="fa-solid fa-square-plus"></i></label>
        <input id="file-${task.uuid}" type="file" data-uuid="${
          task.uuid
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
    <div class="task__status ${task.isFolded ? "folded" : ""}" data-uuid="${
          task.uuid
        }">
      <button class="delete-button" type="button" data-uuid="${task.uuid}">
        <i class="fa-regular fa-x"></i>
        <p>delete</p>
      </button>
      <button class="save-button" type="button" data-uuid="${task.uuid}">
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
    item.querySelector(".collect-button").addEventListener("click", taskClose)
  );

  [...taskList.children].forEach((item) =>
    item.querySelector(".edit-button").addEventListener("click", taskClose)
  );
  [...taskList.children].forEach((item) =>
    item.querySelector(".task__checked").addEventListener("click", checkedTask)
  );
}

function taskClose(e) {
  alert("the task has been closed!");
}
