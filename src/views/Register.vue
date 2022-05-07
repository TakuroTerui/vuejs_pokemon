<template>
  <div>
    <h2>新規登録</h2>
    <div v-show="errorMessage">{{ errorMessage }}</div>
    <form>
      <div>
        <input type="text" name="username" placeholder="ユーザー名" v-model="userName" autocomplete="username">
      </div>
      <div>
        <input type="email" name="email" placeholder="xxxxxx@example.com" v-model="email" autocomplete="email">
      </div>
      <div>
        <input type="password" name="password" placeholder="パスワード" v-model="password" autocomplete="new-password">
      </div>
      <div>
        <input type="password" name="confirm" placeholder="パスワード（確認用）" v-model="confirm" autocomplete="new-password">
      </div>
      <button @click="submit" type="button" class="button">登録する</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      confirm: '',
      errorMessage: ''
    };
  },
  methods: {
    validation () {
      if (this.userName == '' || this.email == '' || this.password == '' || this.confirm == '') {
        this.errorMessage = '未入力の項目があります'
      }
      if (this.password != this.confirm) {
        this.errorMessage = 'パスワードとパスワード（確認用）が異なります'
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
        'email': this.email,
        'password': this.password,
      };
      axios.post("/users/", formData)
      .then(response => {
        if (response.data.token == undefined) {
          this.setMessage(response.data);
          return;
        }
        this.$store.dispatch("updateToken", response.data.token);
        this.$router.push('pokemon')
      });
    },
    setMessage (data) {
      if (data.username != undefined) {
        this.errorMessage = data.username
        return;
      }
      if (data.email != undefined) {
        this.errorMessage = data.email
        return;
      }
      if (data.password != undefined) {
        this.errorMessage = data.password
        return;
      }
    }
  },
};
</script>

<style scope>
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