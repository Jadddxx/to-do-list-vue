<script setup>
import { ref } from "vue";
let tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);
let title = ref("");

// 初始化的物件 fn, 確保一直產生新的物件
const initTask = () => ({
  id: Date.now(),
  title: "",
  date: "",
  datetime: "",
  comment: "",
  file: "",
  isCollect: false,
  isFolded: false,
  isDone: false,
});

const newTaskObject = ref(initTask());

let newTask = ref(false);
const addTasks = () => {
  // 把區塊打開
  newTask.value = true;
  // 把title 的值 賦值給 新的task
  newTaskObject.value.title = title.value;
};

const pushToTasks = (currentObject) => {
  currentObject.isFolded = true;
  // 把newTaskObject 加進去
  tasks.value = [currentObject, ...tasks.value];

  localStorage.setItem("tasks", JSON.stringify(tasks.value));
  // 讓這塊區塊消失
  newTask.value = false;

  // 如果要消除它就必須出現
  clearNewTaskObject();
};

const clearNewTaskObject = () => {
  // 把title清空
  title.value = "";
  // 用一個初始值去賦值給newTaskObject
  newTaskObject.value = initTask();
};

const deleteItem = function (currentObject, task) {
  const index = currentObject.indexOf(task);
  currentObject.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(currentObject));
};
</script>

<template>
  <pre>{{ newTaskObject }}</pre>
  <form class="task-add">
    <button type="submit" @click.prevent="addTasks()">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
    <input type="text" placeholder="add task" v-model="title" />
  </form>
  <template v-if="newTask">
    <div class="task" draggable="true" :key="newTaskObject.id">
      <div class="task__head">
        <div class="task__head__main">
          <input
            class="task__checked"
            type="checkbox"
            name="checkbox"
            v-model="newTaskObject.isDone" />
          <input
            type="name"
            class="task__title"
            placeholder="type something here..."
            v-model="newTaskObject.title" />
        </div>
        <div class="task__head__icon">
          <button type="button" class="collect-button">
            <font-awesome-icon icon="fa-solid fa-star" />
          </button>
          <button type="button" class="edit-button">
            <font-awesome-icon icon="fa-solid fa-pen" />
          </button>
        </div>
      </div>
      <div class="task__body task-body-top-border">
        <div class="date">
          <h3>dateline</h3>
          <div class="date__input">
            <input
              type="date"
              placeholder="yyyy/mm/dd"
              v-model="newTaskObject.date" />
            <input
              type="datetime"
              placeholder="hh:mm"
              v-model="newTaskObject.datetime" />
          </div>
        </div>
        <div class="file">
          <h3>File</h3>
          <label :for="'file' + newTaskObject.id">
            <font-awesome-icon icon="fa-solid fa-square-plus" />
          </label>
          <input :id="'file' + newTaskObject.id" type="file" name="file" />
          <div class="fileNameBox"></div>
        </div>
        <div class="comment">
          <h3>comment</h3>
          <textarea
            name="text"
            cols="10"
            rows="4"
            placeholder="type your memo here..."
            v-model="newTaskObject.comment"></textarea>
        </div>
      </div>
      <div class="task__status">
        <button class="delete-button" type="button" @click="newTask = false">
          <font-awesome-icon icon="fa-solid fa-x" />
          <p>delete</p>
        </button>
        <button
          class="save-button"
          type="button"
          @click.prevent="pushToTasks(newTaskObject)">
          <font-awesome-icon icon="fa-solid fa-plus" />
          <p>save</p>
        </button>
      </div>
    </div>
  </template>
  <template v-if="tasks">
    <div class="task" draggable="true" v-for="task in tasks" :key="task.id">
      <div :class="['task__head', task.isCollect ? 'collect-mode' : '']">
        <div class="task__head__main">
          <input
            class="task__checked"
            type="checkbox"
            name="checkbox"
            v-model="task.isDone" />
          <input
            type="name"
            class="task__title"
            placeholder="type something here..."
            :value="task.title"
            :disabled="task.isFolded" />
        </div>
        <div class="task__head__icon">
          <button
            type="button"
            :class="['collect-button', task.isCollect ? 'collect-color' : '']"
            @click="task.isCollect = !task.isCollect">
            <font-awesome-icon icon="fa-star fa-solid" />
          </button>
          <button
            type="button"
            class="edit-button"
            @click="task.isFolded = !task.isFolded">
            <font-awesome-icon icon="fa-solid fa-pen" />
          </button>
        </div>
      </div>
      <div
        v-if="task.isFolded"
        :class="['status__detail', task.isCollect ? 'collect-mode' : '']">
        <div v-if="task.date" class="status__detail__date">
          <font-awesome-icon icon="fa-solid fa-calendar-days" />
          <p>{{ task.date }}</p>
        </div>
        <div v-if="task.file" class="status__detail__file">
          <font-awesome-icon icon="fa-solid fa-file" />
        </div>
        <div v-if="task.comment" class="status__detail__comment">
          <font-awesome-icon icon="fa-solid fa-comment-dots" />
        </div>
      </div>
      <div
        :class="[
          'task__body',
          task.isFolded ? 'folded' : 'task-body-top-border',
        ]">
        <div class="date">
          <h3>dateline</h3>
          <div class="date__input">
            <input type="date" placeholder="yyyy/mm/dd" v-model="task.date" />
            <input
              type="datetime"
              placeholder="hh:mm"
              v-model="task.datetime" />
          </div>
        </div>
        <div class="file">
          <h3>File</h3>
          <label :for="'file' + task.id">
            <font-awesome-icon icon="fa-solid fa-square-plus" />
          </label>
          <input :id="'file' + task.id" type="file" name="file" />
          <div class="fileNameBox">{{ task.file }}</div>
        </div>
        <div class="comment">
          <h3>comment</h3>
          <textarea
            name="text"
            cols="10"
            rows="4"
            placeholder="type your memo here..."
            v-model="task.comment"></textarea>
        </div>
      </div>
      <div :class="['task__status', task.isFolded ? 'folded' : '']">
        <button
          class="delete-button"
          type="button"
          @click="deleteItem(tasks, task)">
          <i class="fa-regular fa-x"></i>
          <p>delete</p>
        </button>
        <button
          class="save-button"
          type="button"
          @click="task.isFolded = !task.isFolded">
          <i class="fa-regular fa-plus"></i>
          <p>save</p>
        </button>
      </div>
    </div>
  </template>
  <pre>{{ tasks }}</pre>
</template>

<style lang="scss" scoped>
.task-add {
  @include flex(row, 10px);
  align-items: center;
  padding: 9px 32px;
  margin-top: 20px;
  border-radius: 5px;
  border: 2px $body_bg solid;
  background-color: white;

  button[type="submit"] {
    background-color: transparent;
    border: 1px solid transparent;
    height: 24px;
    width: 24px;
    padding: 0;
    .fa-plus {
      @include icon_justify(-5px);
      font-size: 35px;
      left: -3px;
      color: $body_bg;
      font-style: normal;
    }
  }

  input[type="text"] {
    @include input-add;
    margin-top: 0;
    padding: 0 5px;
    font-size: 30px;
  }
}

.file label {
  font-size: 30px;
}
</style>
