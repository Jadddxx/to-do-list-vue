<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
let tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);
let title = ref("");
let fileName = ref("");
const drag = ref(false);

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

const saveDragEnd = () => {
  drag.value = false;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};
</script>

<template>
  <draggable
    class="task-list"
    v-model="tasks"
    @start="drag = true"
    @end="saveDragEnd()"
    item-key="id">
    <template #item="{ element }">
      <div v-if="element.isDone === true">
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
                <font-awesome-icon icon="fa-solid fa-pen" />
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
      </div>
    </template>
  </draggable>
</template>

<style lang="scss" scoped>
.file label {
  font-size: 30px;
}

.edit-color {
  color: $primary;
}
</style>
