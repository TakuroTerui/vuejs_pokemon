<template>
  <div>
    <h2>パーティー</h2>
    <table>
      <tr>
        <th></th>
        <td>なまえ</td>
        <td>HP</td>
        <td>タイプ</td>
        <td>こうげき</td>
        <td>ぼうぎょ</td>
        <td>とくこう</td>
        <td>とくぼう</td>
        <td>すばやさ</td>
        <td class="delete_td"></td>
      </tr>
      <tr v-for="post in posts" :key="post.uuid">
        <th>
          <router-link :to="{name: 'pokemonDetail', params: {id: post.id}}" tag="img" :src="post.image" class="list_img"></router-link>
        </th>
        <td>{{ post.name }}</td>
        <td>{{ post.hit_points }}</td>
        <td>
          <img
            v-for="type in post.type"
            :key="type.id"
            :src="require(`@/assets/img/${type}.jpeg`)"
            width="50"
          >
        </td>
        <td>{{ post.attack }}</td>
        <td>{{ post.defense }}</td>
        <td>{{ post.special_attack }}</td>
        <td>{{ post.special_defense }}</td>
        <td>{{ post.speed }}</td>
        <td class="delete_td"><div @click="deletePokemon(post.party_id)" class="delete">×</div></td>
      </tr>
    </table>
    <div v-show="posts.length < 6" @click="showModal" class="btn_wrapper">
      <div class="icon icon--plus" style="float: left;">
        <span class="icon__mark"></span>
      </div>
      <div class="btn_label">追加する</div>
    </div>
    <div v-show="modal" id="overlay" @click.self="hideModal">
      <div id="content">
        <span @click="hideModal" class="batsu"></span>
        <tr class="header">
          <th>No</th>
          <th>なまえ</th>
          <th>タイプ</th>
          <th>こうげき</th>
          <th>ぼうぎょ</th>
          <th>とくこう</th>
          <th>とくぼう</th>
          <th>すばやさ</th>
        </tr>
        <div class="list">
          <tr class="list_body" v-for="pokemon in pokemons" :key="pokemon.name" @click="register(pokemon.id)">
            <td>{{ pokemon.id }}</td>
            <td>{{ pokemon.name }}</td>
            <td>{{ pokemon.hit_points }}</td>
            <td>{{ pokemon.attack }}</td>
            <td>{{ pokemon.defense }}</td>
            <td>{{ pokemon.special_attack }}</td>
            <td>{{ pokemon.special_defense }}</td>
            <td>{{ pokemon.speed }}</td>
          </tr>
        </div>
      </div>
    </div>
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
      pokemons: '',
      modal: false
    };
  },
  mounted() {
    axios.get("/party/",
      {
        headers: {"Authorization": this.token}
      }
    )
    .then(response => {
      this.posts = response.data.party
      this.pokemons = response.data.pokemon
      for (let i = 0; i < response.data.party.length; i++) {
        let id = String(response.data.party[i].id)
        pokeAxios.get(id)
        .then(response => {
          this.$set(this.posts[i], 'image', response.data.sprites.front_default);
          let uuid = new Date().getTime().toString();
          this.$set(this.posts[i], 'uuid', uuid);
        });
      }
    });
  },
  methods: {
    showModal () {
      this.modal = true
    },
    hideModal () {
      this.modal = false
    },
    register (id) {
      let formData = {
        'id': id,
      };
      let token = 'Token ' + this.$store.getters.token
      axios.post("/party/", formData, {headers: {'Authorization': token}})
      .then(response => {
        console.log(response)
        this.$router.go({path: '/party', force: true})
      });
    },
    deletePokemon (id) {
      let partyId = String(id)
      axios.delete("/party/" + partyId + '/',
        {
          headers: {"Authorization": this.token}
        }
      )
    .then(response => {
      console.log(response)
      this.$router.go({path: '/party', force: true})
    });
    }
  }
};
</script>

<style scoped>
table {
  border: 1px solid;
  background-color: #FAFAFA;
  border-collapse: collapse;
  margin-bottom: 20px;
}
tr {
  height: 40px;
  border: none;
}
td {
  width: 100px;
  text-align: center;
}
.list_img {
  cursor: pointer;
  height: 80px;
}
.delete_td {
  width: 40px;
}
.list_body:hover {
  background-color: #DDDDDD;
}
.list_body:first-child:hover {
  background-color: #DDDDDD;
}
.btn_wrapper {
  margin: 20px 0 0 20px;
  cursor: pointer;
}
.icon {
  position: relative;
  width: 20px;
  height: 20px;
  background: #ccc;
  border-radius: 50%;
  margin-right: 5px;
  margin-top: 3px;
}
.icon::before, .icon--plus::after {
  position: absolute;
  top: 9px;
  left: 50%;
  content: '';
  display: inline-block;
  width: 13px;
  height: 13px;
  border-top: 2px solid #fff;
  transform: translateX(-50%);
}
.icon--plus:after {
  top: 3px;
  left: -3px;
  transform: rotate(90deg);
}
.btn_label {
  float: left;
}
#overlay{
  z-index:1;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
#content{
  z-index: 2;
  width: 50%;
  height: 60%;
  padding: 1em;
  background:#fff;
}
.header > th {
  width: 12.95%;
}
.header {
  cursor: default;
}
.header:hover {
  background-color: #fff;
}
.list {
  width: 100%;
  height: 85%;
  overflow: auto;
  overflow: scroll;
}
p {
  cursor: pointer;
  margin: 0;
}
p:hover {
  background-color: #FAFAFA;
}
.batsu {
  cursor: pointer;
  margin-left: auto;
  display: block;
  position: relative;
  width: 20px;
  height: 20px;
}
.batsu::before, .batsu::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 20px;
  background: #333;
}
.batsu::before {
  transform: translate(-50%,-50%) rotate(45deg);
}
.batsu::after {
  transform: translate(-50%,-50%) rotate(-45deg);
}
.delete{
  font-size: 100%;
  font-weight: bold;
  border: 1px solid #999;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 1.8em;
  line-height: 1.8em;
  cursor: pointer;
  transition: .2s;
}
.delete:hover{
  background: red;
  border-color: red;
  color: #FFF;
}
</style>