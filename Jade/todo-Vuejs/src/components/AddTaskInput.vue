<script setup>
import { ref } from "vue";
let tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);
let title = ref("");

let newTask = ref(false);
const addTasks = () => {
  // 把區塊打開
  newTask.value = true;
  // 把title 的值 賦值給 新的task
  newTaskObject.value.title = title.value;
};
</script>

<template>
  <form class="task-add">
    <button type="submit" @click.prevent="addTasks()">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
    <input type="text" placeholder="add task" v-model="title" />
  </form>
  <!-- 只留上面 -->
  <template v-if="newTask">
    <div class="task" draggable="true" :key="newTaskObject.id">
      <div class="task__head">
        <div class="task__head__main">
          <input
            class="task__checked"
            type="checkbox"
            name="checkbox"
            v-model="newTaskObject.isDone" />
          <input
            type="name"
            class="task__title"
            placeholder="type something here..."
            v-model="newTaskObject.title" />
        </div>
        <div class="task__head__icon">
          <button type="button" class="collect-button">
            <font-awesome-icon icon="fa-solid fa-star" />
          </button>
          <button type="button" class="edit-button">
            <font-awesome-icon icon="fa-solid fa-pen" />
          </button>
        </div>
      </div>
      <div class="task__body task-body-top-border">
        <div class="date">
          <h3>dateline</h3>
          <div class="date__input">
            <input
              type="date"
              placeholder="yyyy/mm/dd"
              v-model="newTaskObject.date" />
            <input
              type="datetime"
              placeholder="hh:mm"
              v-model="newTaskObject.datetime" />
          </div>
        </div>
        <div class="file">
          <h3>File</h3>
          <label :for="'file' + newTaskObject.id">
            <font-awesome-icon icon="fa-solid fa-square-plus" />
          </label>
          <input
            :id="'file' + newTaskObject.id"
            type="file"
            name="file"
            @change="newTaskChangeFile($event)" />

          <div class="fileNameBox">{{ fileName }}</div>
        </div>
        <div class="comment">
          <h3>comment</h3>
          <textarea
            name="text"
            cols="10"
            rows="4"
            placeholder="type your memo here..."
            v-model="newTaskObject.comment"></textarea>
        </div>
      </div>
      <div class="task__status">
        <button class="delete-button" type="button" @click="newTask = false">
          <font-awesome-icon icon="fa-solid fa-x" />
          <p>delete</p>
        </button>
        <button
          class="save-button"
          type="button"
          @click.prevent="pushToTasks(newTaskObject)">
          <font-awesome-icon icon="fa-solid fa-plus" />
          <p>save</p>
        </button>
      </div>
    </div>
  </template>
  <template v-if="tasks">
    <div
      class="task-list"
      @drop="onDrop($event)"
      @dragover.prevent="overDrag($event)"
      @dragenter.prevent>
      <div
        class="task"
        v-for="task in tasks"
        :key="task.id"
        draggable="true"
        @dragstart="startDrag($event, task)">
        <div :class="['task__head', task.isCollect ? 'collect-mode' : '']">
          <div class="task__head__main">
            <input
              class="task__checked"
              type="checkbox"
              name="checkbox"
              v-model="task.isDone" />
            <input
              type="name"
              class="task__title"
              placeholder="type something here..."
              :value="task.title"
              :disabled="task.isFolded" />
          </div>
          <div class="task__head__icon">
            <button
              type="button"
              :class="['collect-button', task.isCollect ? 'collect-color' : '']"
              @click="saveCollect(task)">
              <font-awesome-icon icon="fa-star fa-solid" />
            </button>
            <button type="button" class="edit-button" @click="saveFolded(task)">
              <font-awesome-icon icon="fa-solid fa-pen" />
            </button>
          </div>
        </div>
        <div
          v-if="task.isFolded"
          :class="['status__detail', task.isCollect ? 'collect-mode' : '']">
          <div v-if="task.date" class="status__detail__date">
            <font-awesome-icon icon="fa-solid fa-calendar-days" />
            <p>{{ task.date }}</p>
          </div>
          <div v-if="task.file" class="status__detail__file">
            <font-awesome-icon icon="fa-solid fa-file" />
          </div>
          <div v-if="task.comment" class="status__detail__comment">
            <font-awesome-icon icon="fa-solid fa-comment-dots" />
          </div>
        </div>
        <div
          :class="[
            'task__body',
            task.isFolded ? 'folded' : 'task-body-top-border',
          ]">
          <div class="date">
            <h3>dateline</h3>
            <div class="date__input">
              <input type="date" placeholder="yyyy/mm/dd" v-model="task.date" />
              <input
                type="datetime"
                placeholder="hh:mm"
                v-model="task.datetime" />
            </div>
          </div>
          <div class="file">
            <h3>File</h3>
            <label :for="'file' + task.id">
              <font-awesome-icon icon="fa-solid fa-square-plus" />
            </label>
            <input
              :id="'file' + task.id"
              type="file"
              name="file"
              @change="taskChangeFile($event, task)" />
            <div class="fileNameBox">{{ task.file }}</div>
          </div>
          <div class="comment">
            <h3>comment</h3>
            <textarea
              name="text"
              cols="10"
              rows="4"
              placeholder="type your memo here..."
              v-model="task.comment"></textarea>
          </div>
        </div>
        <div :class="['task__status', task.isFolded ? 'folded' : '']">
          <button
            class="delete-button"
            type="button"
            @click="deleteItem(tasks, task)">
            <font-awesome-icon icon="fa-solid fa-x" />
            <p>delete</p>
          </button>
          <button class="save-button" type="button" @click="saveTask(task)">
            <font-awesome-icon icon="fa-solid fa-plus" />
            <p>save</p>
          </button>
        </div>
      </div>
    </div>
  </template>
  <pre>{{ tasks }}</pre>
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
