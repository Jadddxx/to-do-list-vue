<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";
import AddTaskInput from "@/components/AddTaskInput.vue";
import TaskLeft from "@/components/TaskLeft.vue";
import { useTasksStore } from "@/store/tasksStore.js";

// const tasks = storeToRefs(useTasksStore());

// import {
//   newTaskChangeFile,
//   taskChangeFile,
//   saveTask,
//   saveFolded,
//   saveCollect,
//   saveDone,
//   saveDragEnd,
// } from "@/javascript/saveTask.js";

const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);
let title = ref("");
let fileName = ref("");
const drag = ref(false);

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

// add task
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

// save

const newTaskChangeFile = (event) => {
  newTaskObject.value.file = event.target.files[0].name;
  fileName.value = event.target.files[0].name;
};

const taskChangeFile = (event, element) => {
  element.file = event.target.files[0].name;
  fileName.value = event.target.files[0].name;
};

const saveTask = (element) => {
  element.isFolded = true;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const saveFolded = (element) => {
  element.isFolded = !element.isFolded;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const saveCollect = (element) => {
  element.isCollect = !element.isCollect;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const saveDone = (element) => {
  element.isDone = !element.isDone;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

// drag-drop save

const saveDragEnd = () => {
  drag.value = false;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};
</script>

<template>
  <!-- <AddTaskInput /> -->
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
            <font-awesome-icon icon="far fa-star" />
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
          <input
            :id="'file' + newTaskObject.id"
            type="file"
            name="file"
            @change="newTaskChangeFile($event)" />

          <div class="fileNameBox">{{ fileName }}</div>
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
    <draggable
      class="task-list"
      v-model="tasks"
      @start="drag = true"
      @end="saveDragEnd()"
      item-key="id">
      <template #item="{ element }">
        <div class="task">
          <div :class="['task__head', element.isCollect ? 'collect-mode' : '']">
            <div class="task__head__main">
              <input
                class="task__checked"
                type="checkbox"
                name="checkbox"
                v-model="element.isDone" />
              <input
                type="name"
                class="task__title"
                placeholder="type something here..."
                :value="element.title"
                :disabled="element.isFolded" />
            </div>
            <div class="task__head__icon">
              <button
                type="button"
                :class="[
                  'collect-button',
                  element.isCollect ? 'collect-color' : '',
                ]"
                @click="saveCollect(element)">
                <font-awesome-icon
                  :icon="`${element.isCollect ? 'fa-star' : 'far fa-star'}`" />
              </button>
              <button
                type="button"
                :class="['edit-button', element.isFolded ? '' : 'edit-color']"
                @click="saveFolded(element)">
                <font-awesome-icon icon="fa-pen" />
              </button>
            </div>
          </div>
          <div
            v-if="element.isFolded"
            :class="[
              'status__detail',
              element.isCollect ? 'collect-mode' : '',
            ]">
            <div v-if="element.date" class="status__detail__date">
              <font-awesome-icon icon="fa-solid fa-calendar-days" />
              <p>{{ element.date }}</p>
            </div>
            <div v-if="element.file" class="status__detail__file">
              <font-awesome-icon icon="fa-solid fa-file" />
            </div>
            <div v-if="element.comment" class="status__detail__comment">
              <font-awesome-icon icon="fa-solid fa-comment-dots" />
            </div>
          </div>
          <div
            :class="[
              'task__body',
              element.isFolded ? 'folded' : 'task-body-top-border',
            ]">
            <div class="date">
              <h3>dateline</h3>
              <div class="date__input">
                <input
                  type="date"
                  placeholder="yyyy/mm/dd"
                  v-model="element.date" />
                <input
                  type="datetime"
                  placeholder="hh:mm"
                  v-model="element.datetime" />
              </div>
            </div>
            <div class="file">
              <h3>File</h3>
              <label :for="'file' + element.id">
                <font-awesome-icon icon="fa-solid fa-square-plus" />
              </label>
              <input
                :id="'file' + element.id"
                type="file"
                name="file"
                @change="taskChangeFile($event, element)" />
              <div class="fileNameBox">{{ element.file }}</div>
            </div>
            <div class="comment">
              <h3>comment</h3>
              <textarea
                name="text"
                cols="10"
                rows="4"
                placeholder="type your memo here..."
                v-model="element.comment"></textarea>
            </div>
          </div>
          <div :class="['task__status', element.isFolded ? 'folded' : '']">
            <button
              class="delete-button"
              type="button"
              @click="deleteItem(tasks, element)">
              <font-awesome-icon icon="fa-solid fa-x" />
              <p>delete</p>
            </button>
            <button
              class="save-button"
              type="button"
              @click="saveTask(element)">
              <font-awesome-icon icon="fa-solid fa-plus" />
              <p>save</p>
            </button>
          </div>
        </div>
      </template>
    </draggable>
    <TaskLeft :length="tasks.length" :is-done="'left'" />
  </template>
</template>

<style lang="scss" scoped>
.container {
  @include breakpoints(768px) {
    max-width: 620px;
  }
}
.file label {
  font-size: 30px;
}

.edit-color {
  color: $primary;
}
</style>
