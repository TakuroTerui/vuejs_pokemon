import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index.js'

const Home = () => import('./views/Home.vue');
const Users = () => import('./views/Users.vue');
const UsersPosts = () => import('./views/UsersPosts.vue');
const UsersProfile = () => import('./views/UsersProfile.vue');
const Entry = () => import('./views/Entry.vue');
const Pokemon = () => import('./views/Pokemon.vue');
const PokemonDetail = () => import('./views/PokemonDetail.vue');
const Predict = () => import('./views/Predict.vue');
const Login = () => import('./views/Login.vue');
const Register = () => import('./views/Register.vue');
const Party = () => import('./views/Party.vue');
const EntryDetail = () => import('./views/EntryDetail.vue');

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Home,
      },
      beforeEnter(to, from, next) {
        next();
      }
    },
    {
      path: '/users/:id',
      components: {
        default: Users,
      },
      props: {
        default: true,
        header: false,
      },
      children: [
        {path: 'posts', component: UsersPosts},
        {path: 'profile', component: UsersProfile, name: 'users-id-profile'},
      ]
    },
    {
      path: "/entry",
      components: {
        default: Entry,
      },
    },
    {
      path: "/pokemon",
      components: {
        default: Pokemon,
      },
      beforeEnter: (to, from, next) => {
        let token = store.getters.token
        console.log(to, from)
        if (token == '') {
          next({path: '/login'})
          return false
        }
        next()
      },
    },
    {
      path: "/pokemon/:id",
      name: "pokemonDetail",
      components: {
        default: PokemonDetail,
      },
      beforeEnter: (to, from, next) => {
        let token = store.getters.token
        console.log(to, from)
        if (token == '') {
          next({path: '/login'})
          return false
        }
        next()
      },
    },
    {
      path: "/predict",
      components: {
        default: Predict,
      },
      beforeEnter: (to, from, next) => {
        let token = store.getters.token
        console.log(to, from)
        if (token == '') {
          next({path: '/login'})
          return false
        }
        next()
      },
    },
    {
      path: "/login",
      components: {
        default: Login,
      },
      beforeEnter: (to, from, next) => {
        let token = store.getters.token
        console.log(to, from)
        if (token != '') {
          next({path: '/pokemon'})
          return false
        }
        next()
      },
    },
    {
      path: "/register",
      components: {
        default: Register,
      },
      beforeEnter: (to, from, next) => {
        let token = store.getters.token
        console.log(to, from)
        if (token != '') {
          next({path: '/pokemon'})
          return false
        }
        next()
      },
    },
    {
      path: "/entry/:id",
      name: "entryDetail",
      components: {
        default: EntryDetail,
      },
      beforeEnter: (to, from, next) => {
        let token = store.getters.token
        console.log(to, from)
        if (token == '') {
          next({path: '/login'})
          return false
        }
        next()
      },
    },
    {
      path: "/party",
      components: {
        default: Party,
      },
      beforeEnter: (to, from, next) => {
        let token = store.getters.token
        console.log(to, from)
        if (token == '') {
          next({path: '/pokemon'})
          return false
        }
        next()
      },
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      this.app.$root.$once('triggerScroll', () => {
        let position = {x: 0, y: 0}
        if (savedPosition) {
          position = savedPosition;
        }
        if (to.hash) {
          position = {
            selector: to.hash,
          };
        }
        resolve(position);
      })
    })
  }
})