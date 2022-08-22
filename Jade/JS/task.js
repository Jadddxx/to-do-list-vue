const list = document.querySelector(".list");

// 必須用事件代理人，因為這樣動態新增的才可以吃到
// 所以必須很多if
list.addEventListener("click", clickHandler);

function clickHandler(e) {
  let targetParent = e.target.closest(".task");

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
    targetParent.children[1].classList.add("folded"); //task_body
    targetParent.children[2].classList.add("folded"); //task_status
    targetParent.children[0].classList.remove("task__head_border"); //task_head
    targetParent.children[0].children[0].children[1].setAttribute(
      "disabled",
      "disabled"
    );
  }

  // edit
  if (
    e.target.classList.contains("edit-button") ||
    e.target.classList.contains("fa-pen")
  ) {
    targetParent.children[1].classList.toggle("folded"); //task_body
    targetParent.children[2].classList.toggle("folded"); //task_status
    targetParent.children[0].classList.toggle("task__head_border"); //task_head
    targetParent.children[0].children[0].children[1].removeAttribute(
      "disabled"
    );
    //按壓edit關起來時不會增加input disable
  }

  // collect
  if (
    e.target.classList.contains("collect-button") ||
    e.target.classList.contains("fa-star")
  ) {
    targetParent.classList.toggle("collect-mode"); //task
    // targetParent.children[1].classList.toggle("collect-mode"); //task_body
  }
}
