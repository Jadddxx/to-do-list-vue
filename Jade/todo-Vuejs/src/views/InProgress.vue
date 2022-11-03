<script setup>
import { ref } from "vue";
import { useTasksStore } from "@/store/tasksStore.js";
import draggable from "vuedraggable";
import AddTaskInputVue from "@/components/AddTaskInput.vue";
import TaskLeft from "@/components/TaskLeft.vue";

const taskStore = useTasksStore();
const drag = ref(false);

const saveDragEnd = () => {
  drag.value = false;
};
</script>

<template>
  <draggable
    class="task-list"
    v-model="taskStore.tasks"
    @start="drag = true"
    @end="saveDragEnd()"
    item-key="id">
    <template #item="{ element }">
      <template v-if="!element.isDone">
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
                @click="taskStore.toggleCollect(element.id)">
                <font-awesome-icon
                  :icon="`${element.isCollect ? 'fa-star' : 'far fa-star'}`" />
              </button>
              <button
                type="button"
                :class="['edit-button', element.isFolded ? '' : 'edit-color']"
                @click="taskStore.editTask(element.id)">
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
                @change="taskStore.fileTask($event, element)" />
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
              @click="taskStore.deleteTask(element.id)">
              <font-awesome-icon icon="fa-solid fa-x" />
              <p>delete</p>
            </button>
            <button
              class="save-button"
              type="button"
              @click="taskStore.editTask(element.id)">
              <font-awesome-icon icon="fa-solid fa-plus" />
              <p>save</p>
            </button>
          </div>
        </div>
      </template>
    </template>
  </draggable>
  <TaskLeft
    :length="taskStore.allCount - taskStore.isDoneCount"
    :is-done="'left'" />
</template>

<style scoped lang="scss">
.file label {
  font-size: 30px;
}
</style>
