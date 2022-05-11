<template>
  <div>
    <h2>掲示板</h2>
    <div>
      <div>＜タイトル＞</div>
      <input
        id="title"
        type="text"
        v-model="title"
      >
      <div>＜本文＞</div>
      <textarea id="body" v-model="body"></textarea>
      <br>
      <button @click="createBody" class="button">投稿する</button>
    </div>
    <div class="entry_body">
      <div v-for="post in posts" :key="post.id" class="body">
        <div class="author">投稿者:{{ post.author.username }}</div>
        <div class="title">タイトル:{{ post.title }}</div>
        <div>本文:{{ post.body }}</div>
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
h2 {
  color: #990000;
  font-weight: bold;
}
input {
  width: 300px;
}
textarea {
  width: 400px;
  height: 100px;
}
.entry_body {
  width: 100%;
  background-color: #990000;
  margin-bottom: 20px;
  border: 1px solid;
  padding: 2px;
}
.body {
  border: 1px solid;
  background-color: #fff;
  margin-bottom: 2px;
  padding: 2px;
}
.author, .title {
  margin-bottom: 5px;
}
button {
  display: flex;
}
.button {
  margin-bottom: 20px;
  margin-top: 0;
  display       : inline-block;
  border-radius : 5%;
  font-size     : 12pt;
  text-align    : center;
  cursor        : pointer;
  padding       : 10px 22px;
  background    : #990000;
  color         : #ffffff;
  line-height   : 1em;
  transition    : .3s;
  box-shadow    : 2px 2px 3px #666666;
  border        : 2px solid #990000;
}
.button:hover {
  box-shadow    : none;
  color         : #990000;
  background    : #ffffff;
}
</style>