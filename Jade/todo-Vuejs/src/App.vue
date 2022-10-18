<script setup>
import TheNavigation from "@/components/TheNavigation.vue";
import AddTask from "./components/AddTask.vue";
import TaskList1 from "./components/TaskList1.vue";
</script>

<template>
  <header>
    <div class="container p-0">
      <TheNavigation />
    </div>
  </header>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.container {
  @include breakpoints(768px) {
    max-width: 620px;
  }
}
</style>
