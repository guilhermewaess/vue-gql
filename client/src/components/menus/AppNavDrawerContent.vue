<template>
  <div>
    <v-toolbar color="accent"
               dark
               flat>
      <v-toolbar-side-icon @click="toggleNavDrawer"></v-toolbar-side-icon>
      <router-link to="/"
                   tag="span"
                   style="cursor: pointer">
        <h1 class="title pl-3">Vue Gql</h1>
      </router-link>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile v-for="item in navItems" :key="item.title" :to="item.link">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          {{ item.title }}
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'AppNavDrawerContent',
  methods: {
    toggleNavDrawer() {
      this.$emit('toggleNavDrawer');
    },
  },
  data() {
    return {
      navItems: [
        { icon: 'fa-comment', title: 'Posts', link: '/posts' },
        { icon: 'fa-sign-in-alt', title: 'Sign In', link: '/signin' },
        { icon: 'fa-user-plus', title: 'Sign Up', link: '/signup' },
      ],
    };
  },
};
</script>
