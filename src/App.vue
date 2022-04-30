<template>
  <div style="width: 700px; margin: auto; padding-top: 50px;">
    <h3>掲示板に投稿する</h3>
    <label for="name">ニックネーム</label>
    <input
      id="name"
      type="text"
      v-model="name"
    >
    <br>
    <br>
    <label for="comment">コメント</label>
    <textarea id="comment" v-model="comment"></textarea>
    <br>
    <button @click="createComment">コメントをサーバーに送る</button>
    <h2>掲示板</h2>

    <router-view name="header"></router-view>
    <transition
      name="fade"
      mode="out-in"
      @before-enter="beforeEnter"
    >
      <router-view></router-view>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      comment: "",
      token: "Token 1b04149e54bf6003dfe75d96fcd3be385cbae135"
    }
  },
  created() {
    axios.get(
      "http://127.0.0.1:8000/api/register/",
      {
        headers: {"Authorization": this.token}
      }
    )
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods: {
    beforeEnter() {
      this.$root.$emit('triggerScroll');
    },
    createComment() {
      axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          "status": "public",
          "title": this.name,
          "body": this.comment,
        },
        {
          headers: {"Authorization": this.token}
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      this.name = "";
      this.comment = "";
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
</style>
