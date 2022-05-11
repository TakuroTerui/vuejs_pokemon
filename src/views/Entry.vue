<template>
  <div>
    <div>
      <h3>掲示板に投稿する</h3>
      <div>＜タイトル＞</div>
      <input
        id="title"
        type="text"
        v-model="title"
      >
      <div>＜本文＞</div>
      <textarea id="body" v-model="body"></textarea>
      <br>
      <button @click="createBody">投稿する</button>
    </div>
    <h2>掲示板</h2>
    <div class="entry_body">
      <div v-for="post in posts" :key="post.id">
        <div>名前:{{ post.author.username }}</div>
        <div>タイトル:{{ post.title }}</div>
        <div>本文:{{ post.body }}</div>
        <br>
      </div>
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
      token: 'Token ' + this.$store.getters.token,
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
      });
      this.title = "";
      this.body = "";
    }
  }
}
</script>

<style scope>
input {
  width: 300px;
}
textarea {
  width: 400px;
  height: 100px;
}
.entry_body {
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
  border: 1px solid;
}
</style>