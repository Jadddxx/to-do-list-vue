const add = document.querySelector(".add");
const cancel = document.querySelector(".cancel");
const task = document.querySelector("main .task");
const list = document.querySelector(".list");
const main = document.querySelector("main");
const newTaskContainer = document.querySelector(".new-task-container");

newTaskContainer.addEventListener("click", addHandler);

function addHandler(e) {
  // 必須在newTaskContainer裡面的，不然在外面當時根本還沒產生，就讀不到
  const title = document.querySelector(".task__title");
  if (e.target.classList.contains("add")) {
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.innerHTML = `<div class="task__head task__head_border">
  <div class="task__head__main">
    <input type="checkbox" name="checkbox" id="check-todo" />
    <label class="todo-title" for="check-todo"></label>
  </div>
  <div class="task__head__icon">
    <button class="collect_icon"><i class="fa-regular fa-star"></i></button>
    <button class="edit_icon"><i class="fa-solid fa-pen"></i></button>
  </div>
</div>
<div class="task__body">
  <div class="date">
    <h3>dateline</h3>
    <div class="date__input">
      <input type="text" placeholder="yyyy/mm/dd" />
      <input type="text" placeholder="hh:mm" />
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
      name=""
      id="comment"
      cols="10"
      rows="4"
      placeholder="type your memo here..."
    ></textarea>
  </div>
</div>
<div class="task__status">
  <button class="cancel" type="reset">
    <i class="fa-regular fa-x"></i>
    <p class="cancel-p">delete</p>
  </button>
  <button class="add" type="button">
  <i class="fa-regular fa-plus"></i>
  <p>save</p>
  </button>
</div>`;
    newTask.childNodes[0].childNodes[1].childNodes[3].textContent = title.value;
    list.appendChild(newTask);
  }
}

// 必須用事件代理人，因為這樣動態新增的才可以吃到
list.addEventListener("click", cancelHandler);

function cancelHandler(e) {
  if (
    e.target.classList.contains("cancel") ||
    e.target.classList.contains("fa-regular") ||
    e.target.classList.contains("cancel-p")
  ) {
    list.removeChild(e.target.closest(".task"));
    // e.target.parentElement.parentElement.remove();
  }
}
