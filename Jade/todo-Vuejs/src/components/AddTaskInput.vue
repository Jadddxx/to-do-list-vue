<script setup>
import { ref } from "vue";
let tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);
let title = ref("");
let newTask = ref(false);

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
</script>

<template>
  <form class="task-add">
    <button type="submit" @click.prevent="addTasks()">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
    <input type="text" placeholder="add task" v-model="title" />
  </form>
</template>

<style lang="scss" scoped></style>
