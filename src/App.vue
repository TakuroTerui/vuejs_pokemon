<template>
  <div>
    <nav class="navbar fixed-top">
      <router-link
        to="/pokemon"
        tag="span"
        class="navbar-brand"
      >
        ポケモンずかん
      </router-link>
      <span class="logout">
        <a class="logout_a" href="">
          Logout
        </a>
      </span>
    </nav>
    <div style="width: 1000px; margin: auto; padding-top: 100px;">
      <transition
        name="fade"
        mode="out-in"
        @before-enter="beforeEnter"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    beforeEnter() {
      this.$root.$emit('triggerScroll');
    },
  }
}
</script>

<style scoped>
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid;
  background: radial-gradient(#5577AA, #1E90FF);
}
.logout {
  font-size: 15px;
  text-align: right;
}
.logout_a {
  color: #fff;
  text-decoration: underline;
}
.navbar-brand {
  font-size: 28px;
  cursor: pointer;
  color:#fff;
}
</style>
