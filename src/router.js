import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('./views/Home.vue');
const Users = () => import('./views/Users.vue');
const UsersPosts = () => import('./views/UsersPosts.vue');
const UsersProfile = () => import('./views/UsersProfile.vue');
const Entry = () => import('./views/Entry.vue');

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
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
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