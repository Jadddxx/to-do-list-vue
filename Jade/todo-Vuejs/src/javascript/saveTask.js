import { computed, ref } from "vue";
const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);
let title = ref("");
let fileName = ref("");

const initTask = () => ({
  id: Date.now(),
  title: "",
  date: "",
  datetime: "",
  comment: "",
  file: "",
  isCollect: false,
  isFolded: false,
  isDone: false,
});

const newTaskObject = ref(initTask());

// save
// 是使用v-for 所以element 跟 tasks 是有關係的，如果拆出來將沒有關係
export const newTaskChangeFile = (event) => {
  newTaskObject.value.file = event.target.files[0].name;
  fileName.value = event.target.files[0].name;
};

export const taskChangeFile = (event, element) => {
  element.file = event.target.files[0].name;
  fileName.value = event.target.files[0].name;
};

export const saveTask = (element) => {
  element.isFolded = true;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

export const saveFolded = (element) => {
  element.isFolded = !element.isFolded;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

export const saveCollect = (element) => {
  element.isCollect = !element.isCollect;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

export const saveDone = (element) => {
  element.isDone = !element.isDone;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

// drag-drop save
const drag = ref(false);

export const saveDragEnd = () => {
  drag.value = false;
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};
