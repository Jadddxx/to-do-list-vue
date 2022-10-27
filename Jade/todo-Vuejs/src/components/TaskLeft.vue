<script setup>
defineProps({
  length: Number,
  isDone: String,
});
</script>

<template>
  <p class="task-left">
    <i>{{ length }} tasks {{ isDone }}</i>
  </p>
</template>

<style>
.task-left {
  margin-top: 30px;
  font-size: 16px;
  text-align: right;
  color: rgb(144, 143, 143);
}
</style>
