import { defineStore } from "pinia";

export const useTasksStore = defineStore("taskStore", {
  // 要直接回傳一個value，但是那個是一個物件，所以再用小括號包著
  state: () => ({
    tasks: [],
  }),
  getters: {
    isDone() {
      return this.tasks.filter((task) => task.isDone);
    },
    isDoneCount() {
      return this.tasks.reduce((previous, current) => {
        return current.isDone ? previous + 1 : previous;
      }, 0);
    },
    allCount() {
      return this.tasks.length;
    },
  },
  actions: {
    addTask(task) {
      this.tasks.unshift(task);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    toggleCollect(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.isCollect = !task.isCollect;
    },
    editTask(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.isFolded = !task.isFolded;
    },
    fileTask(event, element) {
      element.file = event.target.files[0].name;
    },
  },
  persist: true,
});
