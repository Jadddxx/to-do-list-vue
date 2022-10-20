<script setup></script>

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
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" data-nav="0" :to="{ name: 'MyTasks' }"
              >my tasks</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              data-nav="1"
              :to="{ name: 'inProgress' }"
              >in progress</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              data-nav="2"
              :to="{ name: 'complete' }"
              >completed</router-link
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

          .nav-link {
            padding: 15px 20px;
            color: $primary--dark;
            @include subtitle;

            text-align: left;
            @include breakpoints(768px) {
              text-align: center;
            }
          }

          .router-link-active.router-link-exact-active {
            color: $font--hover;
            @include breakpoints(768px) {
              border-bottom: 3px solid $primary--dark;
            }
          }
        }
      }
    }
  }
}
</style>
