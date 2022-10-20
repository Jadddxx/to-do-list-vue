import { createRouter, createWebHistory } from "vue-router";
import MyTasks from "@/views/MyTasks.vue";
import Complete from "@/views/Complete.vue";
import InProgress from "@/views/InProgress.vue";

const router = createRouter({
  history: createWebHistory(base),
  base: "/to-do-list-vue/Jade/todo-Vuejs/dist/",
  routes: [
    {
      path: "/",
      name: "MyTasks",
      component: MyTasks,
    },
    {
      path: "/complete",
      name: "Complete",
      component: Complete,
    },
    {
      path: "/inProgress",
      name: "InProgress",
      component: InProgress,
    },
  ],
});

export default router;
