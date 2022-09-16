<script setup>
import { ref } from "vue";
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const title = ref("");

function addTaskTable() {
  const taskItem = {
    id: Date.now(),
    title: title.value,
    date: "",
    datetime: "",
    comment: "",
    file: "",
    isCollect: false,
    isFolded: false,
    isDone: false,
  };

  tasks.push(taskItem);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // 把title清掉
  title.value = "";
}
</script>

<template>
  <form class="task-add">
    <button type="submit" @click="addTaskTable()">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
    <input type="text" placeholder="add task" v-model="title" />
  </form>
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
</style>
