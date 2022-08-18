const add = document.querySelector(".add");
const cancel = document.querySelector(".cancel");
const task = document.querySelector("main .task");
const list = document.querySelector(".list");
const todo = document.querySelector(".todo");

add.addEventListener("click", addHandler);

function addHandler() {
  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.innerHTML = `<div class="task__head task__head_border">
  <div class="task__head__main">
    <input type="checkbox" name="checkbox" id="checkTodo" />
    <label class="todotitle" for="checkTodo"></label>
  </div>
  <div class="task__head__icon">
    <div class="collect_icon"><i class="fa-regular fa-star"></i></div>
    <div class="edit_icon"><i class="fa-solid fa-pen"></i></div>
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
    <p>delete</p>
  </button>
</div>`;
  newTask.childNodes[0].childNodes[1].childNodes[3].textContent = todo.value;

  list.appendChild(newTask);
}

// 必須用事件代理人，因為這樣動態新增的才可以吃到
list.addEventListener("click", cancelHandler);

function cancelHandler(e) {
  if (e.target.classList.contains("cancel")) {
    e.target.parentElement.parentElement.remove();
  }

  // if (e.target.classList.contains("fa-regular")) {
  //   e.target.parentElement.parentElement.remove();
  // }
}
