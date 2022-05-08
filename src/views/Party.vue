<template>
  <div>
    <h2>パーティー</h2>
    <table>
      <tr>
        <th></th>
        <td>なまえ</td>
        <td>HP</td>
        <td>こうげき</td>
        <td>ぼうぎょ</td>
        <td>とくこう</td>
        <td>とくぼう</td>
        <td>すばやさ</td>
      </tr>
      <router-link v-for="post in posts" :key="post.uuid" :to="{name: 'pokemonDetail', params: {id: post.id}}" tag="tr">
        <th><img :src="post.image"></th>
        <td>{{ post.name }}</td>
        <td>{{ post.hit_points }}</td>
        <td>{{ post.attack }}</td>
        <td>{{ post.defense }}</td>
        <td>{{ post.special_attack }}</td>
        <td>{{ post.special_defense }}</td>
        <td>{{ post.speed }}</td>
      </router-link>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import pokeAxios from "../pokemon-api";

export default {
  data() {
    return {
      token: 'Token ' + this.$store.getters.token,
      posts: [],
      userName: '',
      email: '',
      password: '',
      confirm: '',
      errorMessage: ''
    };
  },
  mounted() {
    axios.get("/party/",
      {
        headers: {"Authorization": this.token}
      }
    )
    .then(response => {
      this.posts = response.data
      for (let i = 0; i < response.data.length; i++) {
        let id = String(response.data[i].id)
        pokeAxios.get(id)
        .then(response => {
          this.$set(this.posts[i], 'image', response.data.sprites.front_default);
          let uuid = new Date().getTime().toString();
          this.$set(this.posts[i], 'uuid', uuid);
        });
      }
    });
  },
};
</script>

<style scope>
table {
  border: 1px solid;
  background-color: #FAFAFA;
  border-collapse: collapse;
}
tr {
  height: 40px;
  border: none;
  cursor: pointer;
}
tr:hover {
  background-color: #DDDDDD;
}
tr:first-child {
  cursor: default;
}
tr:first-child:hover {
  background-color: #FAFAFA;
}
td {
  width: 100px;
  text-align: center;
}
</style>