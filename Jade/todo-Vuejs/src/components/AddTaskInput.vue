<script setup>
import { ref } from "vue";
import { useTasksStore } from "../store/tasksStore";

const taskStore = useTasksStore();
let title = ref("");
let newTask = ref(false);
const handleAdd = () => {
  taskStore.addTask({
    id: Date.now(),
    title: title.value,
    date: "",
    datetime: "",
    comment: "",
    file: "",
    isCollect: false,
    isFolded: false,
    isDone: false,
  });
  title.value = "";
};
</script>

<template>
  <form class="task-add">
    <button type="submit" @click.prevent="handleAdd">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
    <input type="text" placeholder="add task" v-model="title" />
  </form>
</template>

<style lang="scss" scoped></style>
