<template>
  <div>
    <h2>ログイン</h2>
    <div v-show="errorMessage">{{ errorMessage }}</div>
    <form>
      <div>
        <input
          type="text"
          name="username"
          placeholder="ユーザー名"
          v-model="userName"
          autocomplete="username"
          v-on:keydown.enter="submit"
        >
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          v-model="password"
          autocomplete="new-password"
          v-on:keydown.enter="submit"
        >
      </div>
      <button @click="submit" type="button" class="button">ログインする</button>
    </form>
  </div>
</template>

<script>
import axios from "../login-api";

export default {
  data() {
    return {
      userName: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    validation () {
      if (this.userName == '' || this.password == '') {
        this.errorMessage = '未入力の項目があります'
      }
    },
    submit: function() {
      this.errorMessage = ''
      this.validation();
      if (this.errorMessage != '') {
        return;
      }
      let formData = {
        'username': this.userName,
        'password': this.password,
      };
      axios.post("/login", formData)
      .then(response => {
        if (response.data.token == undefined) {
          this.errorMessage = response.data.message
          return;
        }
        this.$store.dispatch("updateToken", response.data.token);
        this.$router.push('pokemon')
      })
      .catch(response => {
        this.errorMessage = response.message
      });
    },
  },
};
</script>

<style scoped>
input {
  width: 600px;
  margin-bottom: 5px;
  padding: 5px;
  font-size: 18px;
}
button {
  display: flex;
}
.button {
  margin-top: 20px;
  display       : inline-block;
  border-radius : 5%;
  font-size     : 15pt;
  text-align    : center;
  cursor        : pointer;
  padding       : 13px 42px;
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