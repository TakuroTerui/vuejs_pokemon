<template>
  <div>
    <h1>{{ posts.name }}</h1>
    <img :src="posts.backDefault" width="200" height="200">
    <img :src="posts.frontDefault" width="200" height="200">
    <img :src="posts.backShiny" width="200" height="200">
    <img :src="posts.frontShiny" width="200" height="200">
    <table>
      <tr>
        <th>タイプ</th>
        <td>
          <img
            v-for="post in posts.pokemons"
            :key="post.id"
            :src="require(`@/assets/img/${post.type_name}.jpeg`)"
            width="40"
          >
        </td>
      </tr>
      <tr>
        <th>HP</th>
        <td>{{ posts.hit_points }}</td>
      </tr>
      <tr>
        <th>こうげき</th>
        <td>{{ posts.attack }}</td>
      </tr>
      <tr>
        <th>ぼうぎょ</th>
        <td>{{ posts.defense }}</td>
      </tr>
      <tr>
        <th>とくこう</th>
        <td>{{ posts.special_attack }}</td>
      </tr>
      <tr>
        <th>とくぼう</th>
        <td>{{ posts.special_defense }}</td>
      </tr>
      <tr>
        <th>すばやさ</th>
        <td>{{ posts.speed }}</td>
      </tr>
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
      id: this.$route.params['id'],
      posts: [],
      page: 2,
      pokeCount: 151
    }
  },
  mounted() {
    axios.get("/pokemon/" + this.id,
      {
        headers: {"Authorization": this.token}
      }
    )
    .then(response => {
      this.posts = response.data;
      pokeAxios.get(String(this.posts.id))
      .then(response => {
        console.log(this.posts.pokemons)
        this.$set(this.posts, 'frontDefault', response.data.sprites.front_default);
        this.$set(this.posts, 'backDefault', response.data.sprites.back_default);
        this.$set(this.posts, 'frontShiny', response.data.sprites.front_shiny);
        this.$set(this.posts, 'backShiny', response.data.sprites.back_shiny);
      });
    });
  },
}
</script>

<style scoped>
table {
  border: 1px solid;
  background-color: #FAFAFA;
}
tr {
  height: 40px;
}
th, td {
  width: 100px;
  text-align: center;
}
th {
  letter-spacing: 4px;
}
</style>
