<script setup>
// 如果tasks新增，自動跑computed

import { computed } from "@vue/runtime-core";

const taskItem = computed(() => {
  return tasks;
});
</script>

<template>
  <template v-if="addNewTask">
    <div class="task" draggable="true" :key="newTaskTable.id">
      <div
        :class="['task__head', newTaskTable.isCollect ? 'collect-mode' : '']">
        <div class="task__head__main">
          <input
            class="task__checked"
            type="checkbox"
            name="checkbox"
            :checked="newTaskTable.isDone" />
          <input
            type="name"
            class="task__title"
            placeholder="type something here..."
            :value="title"
            :disabled="newTaskTable.isFolded" />
        </div>
        <div class="task__head__icon">
          <button type="button" class="collect-button">
            <font-awesome-icon
              :icon="[
                'fa-star',
                newTaskTable.isCollect
                  ? 'fa-regular collect-color'
                  : 'fa-solid',
              ]" />
          </button>
          <button type="button" class="edit-button">
            <font-awesome-icon icon="fa-solid fa-pen" />
          </button>
        </div>
      </div>
      <div
        v-if="!newTaskTable.isFolded"
        :class="[
          'status__detail',
          newTaskTable.isCollect ? 'collect-mode' : '',
        ]">
        <div v-if="newTaskTable.date" class="status__detail__date">
          <i class="fa-regular fa-calendar-days"></i>
          <p>{{ newTaskTable.date }}</p>
        </div>
        <div v-if="newTaskTable.file" class="status__detail__file">
          <i class="fa-regular fa-file"></i>
        </div>
        <div v-if="newTaskTable.comment" class="status__detail__comment">
          <i class="fa-regular fa-comment-dots"></i>
        </div>
      </div>
      <div
        :class="[
          'task__body',
          newTaskTable.isFolded ? 'folded' : 'task-body-top-border',
        ]">
        <div class="date">
          <h3>dateline</h3>
          <div class="date__input">
            <input
              type="date"
              placeholder="yyyy/mm/dd"
              v-model="newTaskTable.date" />
            <input
              type="datetime"
              placeholder="hh:mm"
              v-model="newTaskTable.datetime" />
          </div>
        </div>
        <div class="file">
          <h3>File</h3>
          <label :for="'file' + newTaskTable.id">
            <font-awesome-icon icon="fa-solid fa-square-plus" />
          </label>
          <input :id="'file' + newTaskTable.id" type="file" name="file" />
          <div class="fileNameBox">{{ task.file }}</div>
        </div>
        <div class="comment">
          <h3>comment</h3>
          <textarea
            name="text"
            cols="10"
            rows="4"
            placeholder="type your memo here..."></textarea>
        </div>
      </div>
      <div class="task__status">
        <button class="delete-button" type="button">
          <i class="fa-regular fa-x"></i>
          <p>delete</p>
        </button>
        <button
          class="save-button"
          type="button"
          @click.prevent="tasks.push(newTaskTable)">
          <i class="fa-regular fa-plus"></i>
          <p>save</p>
        </button>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped></style>
