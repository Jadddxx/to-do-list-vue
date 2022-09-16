<script setup>
import { ref } from "vue";
const currentActive = ref(true);
const isActive1 = ref(false);
const isActive2 = ref(false);
</script>

<template>
  <nav class="navbar navbar-expand-md p-0">
    <div class="container-fluid p-0">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link"
              data-nav="0"
              href="#"
              :class="currentActive ? 'active' : ''"
              @click="
                currentActive = true;
                isActive1 = false;
                isActive2 = false;
              "
              >my tasks</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-nav="1"
              href="#"
              :class="isActive1 ? 'active' : ''"
              @click="
                isActive1 = true;
                isActive2 = false;
                currentActive = false;
              "
              >in progress</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-nav="2"
              href="#"
              :class="isActive2 ? 'active' : ''"
              @click="
                isActive2 = true;
                isActive1 = false;
                currentActive = false;
              "
              >completed</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  background-color: $primary;

  .container-fluid {
    button {
      padding: 10px;
    }

    .navbar-collapse {
      justify-content: unset;

      .navbar-nav {
        width: 100%;
        .nav-item {
          flex: 1 0 0;
          text-align: left;

          .nav-link.active {
            color: $font--hover;
            @include breakpoints(768px) {
              border-bottom: 3px solid $primary--dark;
            }
          }

          .nav-link {
            padding: 15px 20px;
            color: $primary--dark;
            @include subtitle;

            text-align: left;
            @include breakpoints(768px) {
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
