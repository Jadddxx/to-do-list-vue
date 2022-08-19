const list = document.querySelector(".list");

// 必須用事件代理人，因為這樣動態新增的才可以吃到
list.addEventListener("click", clickHandler);

function clickHandler(e) {
  const taskBody = document.querySelector(".task__body");
  const taskStatus = document.querySelector(".task__status");
  const taskHead = document.querySelector(".task__head");

  // delete
  if (
    e.target.classList.contains("delete-button") ||
    e.target.classList.contains("fa-x") ||
    e.target.classList.contains("cancel-p")
  ) {
    list.removeChild(e.target.closest(".task"));
    // e.target.parentElement.parentElement.remove();
  }

  // save
  if (e.target.classList.contains("save-button")) {
    taskBody.classList.add("folded");
    taskStatus.classList.add("folded");

    taskHead.classList.remove("task__head_border");
  }

  // edit
  if (
    e.target.classList.contains("edit-button") ||
    e.target.classList.contains("fa-pen")
  ) {
    taskBody.classList.remove("folded");
    taskStatus.classList.remove("folded");

    taskHead.classList.add("task__head_border");
  }
}
