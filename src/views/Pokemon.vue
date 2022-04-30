<template>
  <div>
    <h1>ポケモン図鑑</h1>
    <ul>
      <li v-for="post in posts" :key="post.name">
        <img v-bind:src="post.image" width="150" height="150">
        <div class="name">{{ post.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import pokeAxios from "../pokemon-api";

export default {
    data() {
    return {
      token: "Token 1b04149e54bf6003dfe75d96fcd3be385cbae135",
      posts: [],
      next: null,
      previous: null
    }
  },
  created() {
    axios.get("/pokemon/",
      {
        headers: {"Authorization": this.token}
      }
    )
    .then(response => {
      this.next = response.data.next;
      this.previous = response.data.previous;
      this.posts = response.data.results;
      this.posts.forEach((post, index) => {
        pokeAxios.get(String(post.id))
        .then(response => {
          this.posts[index]['image'] = response.data.sprites.front_default;
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
  },
}
</script>

<style scoped>
ul {
  padding: 0;
}
li {
  display: inline-block;
  width: 15%;
  cursor: pointer;
  margin: 10px;
}
li:hover {
  background-color: #F2F2F2;
}
.name, img {
  margin: auto;
  text-align: center;
}
</style>
