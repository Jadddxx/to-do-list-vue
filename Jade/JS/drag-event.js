const allTasks = document.querySelectorAll(".task");

allTasks.forEach((task) => {
  task.addEventListener("dragstart", dragHandler);
});

taskList.addEventListener("drop", dropHandler);
taskList.addEventListener("dragover", dropoverHandler);
taskList.addEventListener("dragenter", cancelDefault);

let moveTarget;

function dragHandler(e) {
  console.log("drag start");
  moveTarget = e.target;
  console.log(moveTarget);
  e.dataTransfer.setData("text/plain", e.target.dataset.uuid);
}

function dropHandler(e) {
  cancelDefault(e);
  const moveTargetUuid = e.dataTransfer.getData("text/plain");
  moveTarget = document.querySelector(`.task[data-uuid="${moveTargetUuid}"]`);
  const overItemUuid = overItem.dataset.uuid;
  let moveTargetIndex;
  let overItemIndex;
  console.log(moveTargetUuid);
  console.log(overItemUuid);

  tasks.forEach((task, index) => {
    if (task.uuid === Number(moveTargetUuid)) {
      moveTargetIndex = index;
    }
    if (task.uuid === Number(overItemUuid)) {
      overItemIndex = index;
    }
  });

  if (overItem.classList.contains("borderAbove")) {
    // -取代原本overItem的位置，再把原本的moveTarget刪掉
    taskList.insertBefore(moveTarget, overItem);
    // -moveTarget的index大於overItem的index
    if (moveTargetIndex > overItemIndex) {
      tasks.splice(overItemIndex, 0, tasks[moveTargetIndex]);
      tasks.splice(moveTargetIndex + 1, 1);
      // -moveTarget的index小於overItem的index
    } else if (moveTargetIndex < overItemIndex) {
      tasks.splice(overItemIndex, 0, tasks[moveTargetIndex]);
      tasks.splice(moveTargetIndex, 1);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskList(tasks, taskList);
  }
  if (overItem.classList.contains("borderBelow")) {
    // -取代overItem + 1的位置，再把原本的moveTarget刪掉
    taskList.insertBefore(moveTarget, overItem.nextElementSibling);
    tasks.splice(overItemIndex, 0, tasks[moveTargetIndex]);
    tasks.splice(moveTargetIndex, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskList(tasks, taskList);
  }

  cancelOverItem(e);
}

let overItem = null;

function dropoverHandler(e) {
  cancelDefault(e);
  cancelOverItem(e);

  // !如果有經過task之間的空格是task-list要避掉
  if (e.target !== moveTarget && !e.target.classList.contains("task-list")) {
    overItem = e.target.closest(".task");
    console.log(
      overItem.querySelector(".task__head__main").children[1].value,
      "drag ovveeeeeer"
    );

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
