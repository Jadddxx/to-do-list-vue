<script setup>
import { reactive, ref } from "vue";
const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);
let title = ref("");
let newTask = ref(false);

const initTmp = {
  id: Date.now(),
  title: title,
  date: "",
  datetime: "",
  comment: "",
  file: "",
  isCollect: false,
  isFolded: false,
  isDone: false,
};

const newTaskTable = reactive({ ...initTmp });

const pushTaskArray = (pushArray, currentArray) => {
  currentArray.isFolded = true;
  pushArray.push(currentArray);
  localStorage.setItem("tasks", JSON.stringify(pushArray));
  // 把title清掉
  clearFeedback(currentArray);
  newTask = false;
};

const clearFeedback = (currentArray) => {
  // for (const key in currentArray) {
  //   currentArray[key] = "";
  // }
  Object.assign(currentArray, initTmp);
};

const addNewTask = () => {
  newTask = true;
  // title.value = "";
};

const folded = (task) => {
  console.log("here");
  task.isFolded = !task.isFolded;
};
</script>

<template>
  <div>{{ newTaskTable }}</div>
  <form class="task-add">
    <button type="submit" @click.prevent="newTask = true">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
    <input type="text" placeholder="add task" v-model="title" />
  </form>
  <template v-if="newTask">
    <div class="task" draggable="true" :key="newTaskTable.id">
      <div class="task__head">
        <div class="task__head__main">
          <input class="task__checked" type="checkbox" name="checkbox" />
          <input
            type="name"
            class="task__title"
            placeholder="type something here..."
            v-model="newTaskTable.title" />
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
          <div class="fileNameBox"></div>
        </div>
        <div class="comment">
          <h3>comment</h3>
          <textarea
            name="text"
            cols="10"
            rows="4"
            placeholder="type your memo here..."
            v-model="newTaskTable.comment"></textarea>
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
          @click.prevent="pushTaskArray(tasks, newTaskTable)">
          <font-awesome-icon icon="fa-solid fa-plus" />
          <p>save</p>
        </button>
      </div>
    </div>
  </template>
  <template v-if="tasks">
    <div class="task" draggable="true" v-for="task in tasks" :key="task.id">
      <div :class="['task__head', task.isCollect ? 'collect-mode' : '']">
        <div class="task__head__main">
          <input
            class="task__checked"
            type="checkbox"
            name="checkbox"
            :checked="task.isDone" />
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
            @click="task.isCollect = !task.isCollect">
            <font-awesome-icon icon="fa-star fa-solid" />
          </button>
          <button type="button" class="edit-button" @click="folded(task)">
            <font-awesome-icon icon="fa-solid fa-pen" />
          </button>
        </div>
      </div>
      <div
        v-if="!task.isFolded"
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
          <input :id="'file' + task.id" type="file" name="file" />
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
      <div :class="['task__status', task.isFolded ? 'folded' : '']">
        <button class="delete-button" type="button">
          <i class="fa-regular fa-x"></i>
          <p>delete</p>
        </button>
        <button
          class="save-button"
          type="button"
          @click="task.isFolded = !task.isFolded">
          <i class="fa-regular fa-plus"></i>
          <p>save</p>
        </button>
      </div>
    </div>
  </template>
  <div>{{ tasks }}</div>
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

.file label {
  font-size: 30px;
}
</style>
