import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

import Posts from './components/posts/Posts.vue';
import AddPost from './components/posts/AddPost.vue';
import Post from './components/posts/Post.vue';

import Profile from './components/auth/Profile.vue';
import Signin from './components/auth/Signin.vue';
import Signup from './components/auth/Signup.vue';
import authGuard from './guards/authGuard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
    },
    {
      path: '/posts/:postId',
      name: 'post',
      component: Post,
      props: true,
    },
    {
      path: '/post/add',
      name: 'addPost',
      component: AddPost,
      beforeEnter: authGuard,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: authGuard,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
