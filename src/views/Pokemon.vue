<template>
  <div>
    <h1>ポケモン図鑑</h1>
    <ul class="scroll_area">
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
      addPosts: [],
      page: 2
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.checkScrollArea, {
      capture: true
    });
  },
  mounted() {
    window.addEventListener('scroll', this.checkScrollArea, {
      capture: true
    });
    axios.get("/pokemon/",
      {
        headers: {"Authorization": this.token}
      }
    )
    .then(response => {
      this.posts = response.data.results;
      this.posts.forEach((post, index) => {
        pokeAxios.get(String(post.id))
        .then(response => {
          this.$set(this.posts[index], 'image', response.data.sprites.front_default);
        });
      });
      console.log('mounted str');
      console.log(this.posts);
      console.log('mounted fin');
    });
  },
  methods: {
    checkScrollArea () {
      let bodyHeight = document.body.clientHeight // bodyの高さを取得
      let windowHeight = window.innerHeight // windowの高さを取得
      let bottomPoint = bodyHeight - windowHeight // ページ最下部までスクロールしたかを判定するための位置を計算
      let currentPos = window.pageYOffset // スクロール量を取得
      if (bottomPoint <= currentPos && this.page < 7) {
        setTimeout(this.addPost, 2000);
      }
    },
    addPost () {
      axios.get("/pokemon/" + "?page=" + this.page,
        {
          headers: {"Authorization": this.token}
        }
      )
      .then(response => {
        this.addPosts = response.data.results;
        this.posts = this.posts.concat(this.addPosts);
        this.addPosts.forEach((post, index) => {
          index = index + (this.page - 1) * 30
          pokeAxios.get(String(post.id))
          .then(response => {
            this.$set(this.posts[index], 'image', response.data.sprites.front_default);
          });
        });
        this.page++;
        console.log('methods str');
        console.log(this.posts);
        console.log('methods fin');
      });
    }
  }
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
.scroll_area {
  overflow-y: scroll;
}
</style>
