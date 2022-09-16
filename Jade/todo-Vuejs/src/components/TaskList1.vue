<script setup>
// 如果tasks新增，自動跑computed

import { computed } from "@vue/runtime-core";

const taskItem = computed(() => {
  return tasks;
});
</script>

<template>
  <ul class="task-list" v-for="task in tasks" :key="task">
    {{
      taskItem
    }}
  </ul>
</template>

<style lang="scss" scoped></style>
