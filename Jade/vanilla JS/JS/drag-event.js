const allTasks = document.querySelectorAll(".task");

allTasks.forEach((task) => {
  task.addEventListener("dragstart", dragHandler);
});

taskList.addEventListener("drop", dropHandler);
taskList.addEventListener("dragover", dragoverHandler);
taskList.addEventListener("dragenter", cancelDefault);

let moveTarget;

function dragHandler(e) {
  if (e.target.closest(".task").getAttribute("draggable")) {
    console.log("drag start");
    moveTarget = e.target.closest(".task");
  } else {
    console.log("not draggable target");
  }
}

function dropHandler(e) {
  const moveTargetId = moveTarget.dataset.id;
  const overItemId = overItem.dataset.id;
  let moveTargetIndex;
  let overItemIndex;
  // console.log(moveTarget.querySelector(".task__head__main").children[1].value);
  // console.log(overItem.querySelector(".task__head__main").children[1].value);

  tasks.forEach((task, index) => {
    if (task.id === Number(moveTargetId)) {
      moveTargetIndex = index;
    }
    if (task.id === Number(overItemId)) {
      overItemIndex = index;
    }
  });

  if (overItem.classList.contains("borderAbove")) {
    taskList.insertBefore(moveTarget, overItem);

    // -moveTarget的index大於overItem的index
    if (moveTargetIndex > overItemIndex) {
      tasks.splice(overItemIndex, 0, tasks[moveTargetIndex]);
      tasks.splice(moveTargetIndex + 1, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));
      // -moveTarget的index小於overItem的index
    } else if (moveTargetIndex < overItemIndex) {
      tasks.splice(overItemIndex, 0, tasks[moveTargetIndex]);
      tasks.splice(moveTargetIndex, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
  if (overItem.classList.contains("borderBelow")) {
    taskList.insertBefore(moveTarget, overItem.nextElementSibling);

    // -取代overItem + 1的位置，再把原本的moveTarget刪掉
    if (moveTargetIndex < overItemIndex) {
      tasks.splice(overItemIndex + 1, 0, tasks[moveTargetIndex]);
      tasks.splice(moveTargetIndex, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else if (moveTargetIndex > overItemIndex) {
      tasks.splice(overItemIndex + 1, 0, tasks[moveTargetIndex]);
      tasks.splice(moveTargetIndex + 1, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  cancelOverItem(e);
}

let overItem = null;

function dragoverHandler(e) {
  e.preventDefault();
  cancelOverItem(e);

  // !如果有經過task之間的空格是task-list要避掉
  if (e.target !== moveTarget && !e.target.classList.contains("task-list")) {
    overItem = e.target.closest(".task");
    // console.log(
    //   overItem.querySelector(".task__head__main").children[1].value,
    //   "drag ovveeeeeer"
    // );

    if (e.offsetY > overItem.offsetHeight / 2) {
      overItem.classList.add("borderBelow");
    } else {
      overItem.classList.add("borderAbove");
    }
  }
}

function cancelDefault(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

function cancelOverItem(e) {
  if (!overItem) return;
  overItem.classList.remove("borderBelow");
  overItem.classList.remove("borderAbove");
  overItem = null;
}
