const list = document.querySelector(".list");

// 必須用事件代理人，因為這樣動態新增的才可以吃到
// 所以必須很多if
list.addEventListener("click", clickHandler);

function clickHandler(e) {
  const taskHead = document.querySelector(".task__head");
  const taskTitle = document.querySelector(".task__title");
  const taskBody = document.querySelector(".task__body");
  const taskStatus = document.querySelector(".task__status");

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
    e.target.closest(".task").childNodes[2].classList.add("folded"); //task_body
    e.target.closest(".task").childNodes[4].classList.add("folded"); //task_status
    e.target
      .closest(".task")
      .childNodes[0].classList.remove("task__head_border"); //task_head
    e.target
      .closest(".task")
      .childNodes[0].childNodes[1].childNodes[3].setAttribute(
        "disabled",
        "disabled"
      );

    // taskBody.classList.add("folded");
    // taskStatus.classList.add("folded");
    // taskTitle.setAttribute("disabled", "disabled");
    // taskHead.classList.remove("task__head_border");
    // taskBody.classList.add("folded");
  }

  // edit
  if (
    e.target.classList.contains("edit-button") ||
    e.target.classList.contains("fa-pen")
  ) {
    e.target.closest(".task").childNodes[2].classList.toggle("folded"); //task_body
    e.target.closest(".task").childNodes[4].classList.toggle("folded"); //task_status
    e.target
      .closest(".task")
      .childNodes[0].classList.toggle("task__head_border"); //task_head
    e.target
      .closest(".task")
      .childNodes[0].childNodes[1].childNodes[3].removeAttribute("disabled"); //按壓edit關起來時不會增加input disable

    // taskBody.classList.toggle("folded");
    // taskStatus.classList.toggle("folded");
    // taskTitle.removeAttribute("disabled");

    // taskHead.classList.add("task__head_border");
  }
}
