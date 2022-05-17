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
        <router-link tag="div" :to="{name: 'entryDetail', params: {id: post.id}}" class="body_link">
          <div class="author">投稿者:{{ post.author.username }}</div>
          <div class="title">タイトル:{{ post.title }}</div>
          <div>本文:{{ post.body }}</div>
        </router-link>
        <div class="favorite">
          <i class="far fa-heart"></i>
        </div>
      </div>
    </div>
    <div class="pager">
      <ul class="pagination">
        <li v-show="previous"><a @click="changePage('previous')"><span>«</span></a></li>
        <li v-show="next"><a @click="changePage('next')"><span>»</span></a></li>
      </ul>
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
      posts: [],
      next: '',
      previous: '',
      page: 1
    }
  },
  created() {
    axios.get("/register/?page=" + this.page,
      {
        headers: {"Authorization": this.token}
      }
    )
    .then(response => {
      this.posts = response.data.results;
      this.next = response.data.next
      this.previous = response.data.previous
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
    },
    changePage(type) {
      if (type == 'next') {
        this.page++;
      }
      if (type == 'previous') {
        this.page--;
      }
      axios.get("/register/?page=" + this.page,
        {
          headers: {"Authorization": this.token}
        }
      )
      .then(response => {
        this.posts = response.data.results;
        this.next = response.data.next
        this.previous = response.data.previous
      });
    }
  }
}
</script>

<style scoped>
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
.body_link {
  cursor: pointer;
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
.pager ul.pagination {
  text-align: center;
  margin: 0;
  padding: 0;
}
.pager .pagination li {
  display: inline;
  margin: 0 2px;
  padding: 0;
  display: inline-block;
  background:#990000;
  width: 50px;
  height: 50px;
  text-align: center;
  position: relative;
}
.pager .pagination li a{
  vertical-align: middle;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display:table;
  color: #fff;
  text-decoration: none;
}
.pager .pagination li a span{
  display:table-cell;
  vertical-align:middle;
}
.pager .pagination li a:hover,
.pager .pagination li a.active{
  color: #000;
  background: #ffffff;
}
.not_active {
  background: #ffffff;
}
.favorite {
  margin-left: 5px;
}
</style>