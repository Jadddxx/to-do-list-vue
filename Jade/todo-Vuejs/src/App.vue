<script setup>
import Navbar1 from "./components/Navbar1.vue";
import AddTask from "./components/AddTask.vue";
import TaskList1 from "./components/TaskList1.vue";
</script>

<template>
  <header>
    <div class="container p-0">
      <Navbar1></Navbar1>
    </div>
  </header>
  <main>
    <div class="container p-0">
      <AddTask></AddTask>
      <TaskList1></TaskList1>
    </div>
  </main>
</template>

<style scoped lang="scss">
body {
  background-color: $font--light;
}
.container {
  @include breakpoints(768px) {
    max-width: 620px;
  }
}
</style>
