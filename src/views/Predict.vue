<template>
  <div class="contents">
    <div v-show="!predict">
      <label v-show="!uploadedImage" class="input-item__label">
        <input type="file" name="file" @change="onFileChange" id="file"/>
      </label>
      <div class="preview-item">
        <img
          v-show="uploadedImage"
          class="preview-item-file"
          :src="uploadedImage"
          alt=""
          height="300"
        />
        <div v-show="uploadedImage" class="preview-item-btn">
          <p class="preview-item-name">ファイル:{{ img_name }}</p>
          <button @click="remove">ファイルを削除する</button>
          <button v-show="uploadedImage" @click="upload" class="button" type="submit">
            ポケモンを判定
          </button>
        </div>
      </div>
    </div>

    <div v-show="predict">
      <h2>このポケモンは{{predict.proba}}%の確率で「{{ predict.pokemon_name }}」です</h2>
      <img
        class="preview-item-file"
        :src="uploadedImage"
        height="300"
      />
      <router-link
        :to="{name: 'pokemonDetail', params: {id: predict.label}}"
        tag="img"
        :src="predictImage"
        height="300"
        class="predict_image"
      >
      </router-link>
      <button>もう一度検索する</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import pokeAxios from "../pokemon-api";

export default {
  data() {
    return {
      uploadedImage: '',
      img_name: '',
      predict: '',
      predictImage: ''
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
      this.img_name = files[0].name;
    },
    // アップロードした画像を表示
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    remove() {
      this.uploadedImage = false;
      let obj = document.getElementById('file');
      obj.value = '';
    },
    upload: function() {
      // FormData を利用して File を POST する
      let formData = new FormData();
      formData.append('file', this.uploadedImage);
      formData.append('name', this.img_name);
      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios.post("/predict/", formData, config)
      .then(response => {
        this.predict = response.data
        pokeAxios.get(String(this.predict.label))
        .then(response => {
          this.predictImage = response.data.sprites.front_default
        });
      });
    }
  },
};
</script>

<style scope>
.preview-item {
  padding-bottom: 20px;
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
.predict_image {
  cursor: pointer;
}
.predict_image:hover {
  background-color: #DDDDDD;
}
</style>