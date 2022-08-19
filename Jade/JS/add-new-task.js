const taskAddButton = document.querySelector(".task-input__button");

taskAddButton.addEventListener("click", addTaskHandler);

function addTaskHandler() {
  const newTask = document.createElement("form");
  newTask.classList.add("task");
  newTask.innerHTML = `<div class="task__head task__head_border">
  <div class="task__head__main">
    <input type="checkbox" name="checkbox"/>
    <input
      type="name"
      class="task__title"
      placeholder="type something here..."
    />
  </div>
  <div class="task__head__icon">
    <button type="button" class="collect-button">
      <i class="fa-regular fa-star"></i>
    </button>
    <button type="button" class="edit-button"><i class="fa-solid fa-pen"></i></button>
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
  <button class="delete-button" type="button">
    <i class="fa-regular fa-x"></i>
    <p>delete</p>
  </button>
  <button class="save-button" type="button">
    <i class="fa-regular fa-plus"></i>
    <p>save</p>
  </button>

</div>`;

  list.appendChild(newTask);
}
