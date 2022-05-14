<template>
  <div>
    <div class="entry_body">
      <div class="body">
        <div class="author">投稿者:{{ posts.author.username }}</div>
        <div class="title">タイトル:{{ posts.title }}</div>
        <div>本文:{{ posts.body }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
    return {
      token: 'Token ' + this.$store.getters.token,
      posts: [],
      id: this.$route.params['id']
    }
  },
  created() {
    axios.get("/register/" + this.id + "/",
      {
        headers: {"Authorization": this.token}
      }
    )
    .then(response => {
      this.posts = response.data;
    });
  },
}
</script>

<style scoped>
.entry_body {
  width: 100%;
  background-color: #990000;
  border: 1px solid;
  padding: 2px;
}
.body {
  border: 1px solid;
  background-color: #fff;
  font-size: 20px;
  padding: 8px;
}
.author, .title {
  margin-bottom: 10px;
}
</style>