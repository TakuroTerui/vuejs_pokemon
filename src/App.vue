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
      <span class="ball">
        <img :src="require('@/assets/img/icons8.png')" height="35">
      </span>
      <span class="logout">
        <router-link to="/predict" v-show="token" class="predict">画像検索</router-link>
        <a class="logout_a" href="" v-show="token" @click="logout">
          ログアウト
        </a>
        <router-link to="/login" v-show="!token" class="login">ログイン</router-link>
        <router-link to="/register" v-show="!token">新規登録</router-link>
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
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  methods: {
    beforeEnter() {
      this.$root.$emit('triggerScroll');
    },
    logout() {
      this.$store.dispatch("updateToken", '');
      this.$router.push('login')
    }
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
  padding: 1rem 1rem;
  border-bottom: 1px solid;
  background-color: #fff;
}
.logout {
  font-size: 15px;
  text-align: right;
  margin: 0 0 0 auto;
}
.logout_a {
  text-decoration: underline;
}
.navbar-brand {
  font-size: 28px;
  cursor: pointer;
}
.ball {
  text-align: left;
}
.predict, .login {
  margin-right: 10px;
}
</style>
