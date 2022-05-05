<template>
  <div>
    <ul class="scroll_area">
      <li v-for="post in posts" :key="post.uuid">
        <router-link :to="{name: 'pokemonDetail', params: {id: post.id}}" tag="div">
          <img v-bind:src="post.image" width="150" height="150">
          <div class="name">{{ post.name }}</div>
        </router-link>
      </li>
      <div v-show="posts.length !== pokeCount" class="loader">Loading...</div>
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
      page: 2,
      pokeCount: 151
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
          let uuid = new Date().getTime().toString();
          this.$set(this.posts[index], 'uuid', uuid);
        });
      });
    });
  },
  methods: {
    checkScrollArea () {
      let bodyHeight = document.body.clientHeight // bodyの高さを取得
      let windowHeight = window.innerHeight // windowの高さを取得
      let bottomPoint = bodyHeight - windowHeight // ページ最下部までスクロールしたかを判定するための位置を計算
      let currentPos = window.pageYOffset // スクロール量を取得
      if (bottomPoint <= currentPos && this.page <= 6) {
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
            let uuid = new Date().getTime().toString();
            this.$set(this.posts[index], 'uuid', uuid);
          });
        });
        this.page++;
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
.loader,
.loader:after {
  border-radius: 50%;
  width: 6em;
  height: 6em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid #F2F2F2;
  border-right: 1.1em solid #F2F2F2;
  border-bottom: 1.1em solid red;
  border-left: 1.1em solid red;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
