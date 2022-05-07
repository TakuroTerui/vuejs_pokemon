<template>
  <div>
    <h3>掲示板に投稿する</h3>
    <label for="title">タイトル</label>
    <input
      id="title"
      type="text"
      v-model="title"
    >
    <br>
    <br>
    <label for="body">本文</label>
    <textarea id="body" v-model="body"></textarea>
    <br>
    <button @click="createBody">投稿する</button>
    <h2>掲示板</h2>
    <div v-for="post in posts" :key="post.id">
      <div>名前:{{ post.author.username }}</div>
      <div>タイトル:{{ post.title }}</div>
      <div>本文:{{ post.body }}</div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
    return {
      title: "",
      body: "",
      token: "Token 1b04149e54bf6003dfe75d96fcd3be385cbae135",
      posts: []
    }
  },
  created() {
    axios.get("/register/",
      {
        headers: {"Authorization": this.token}
      }
    )
    .then(response => {
      this.posts = response.data.results;
      console.log(response.data.results);
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods: {
    createBody() {
      axios.post(
        "/register/",
        {
          "status": "public",
          "title": this.title,
          "body": this.body,
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
      this.title = "";
      this.body = "";
    }
  }
}
</script>