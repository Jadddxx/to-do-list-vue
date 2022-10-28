import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = [];
  return tasks;
});
