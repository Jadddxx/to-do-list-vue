import { createRouter, createWebHistory } from "vue-router";
import MyTasks from "@/views/MyTasks.vue";
import Complete from "@/views/Complete.vue";
import InProgress from "@/views/InProgress.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/to-do-list-vue/Jade/todo-Vuejs/dist/",
      name: "MyTasks",
      component: MyTasks,
    },
    {
      path: "/to-do-list-vue/Jade/todo-Vuejs/dist/complete",
      name: "Complete",
      component: Complete,
    },
    {
      path: "/to-do-list-vue/Jade/todo-Vuejs/dist/inProgress",
      name: "InProgress",
      component: InProgress,
    },
  ],
});

export default router;
