<template>
  <div>
    <v-navigation-drawer app
                         temporary
                         fixed
                         v-model="showNavDrawer">
      <app-nav-drawer-content @toggleNavDrawer="toggleNavDrawer"></app-nav-drawer-content>
    </v-navigation-drawer>

    <v-toolbar fixed
               color="primary"
               dark>
      <v-toolbar-side-icon @click="toggleNavDrawer"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/"
                     tag="span"
                     style="cursor:pointer;">Vue Gql</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field flex
                    prepend-icon="fa-search"
                    placeholder="Search posts"
                    color="accent"
                    single-line
                    hide-details></v-text-field>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat
               v-for="item of navItems"
               :key="item.title"
               :to="item.link">
          <v-icon left
                  class="hidden-sm-only">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import AppNavDrawerContent from './AppNavDrawerContent.vue';

export default {
  name: 'AppToolbar',
  components: {
    AppNavDrawerContent,
  },
  data() {
    return {
      showNavDrawer: false,
      navItems: [
        { icon: 'fa-comment', title: 'Posts', link: '/posts' },
        { icon: 'fa-sign-in-alt', title: 'Sign In', link: '/signin' },
        { icon: 'fa-user-plus', title: 'Sign Up', link: '/signup' },
      ],
    };
  },
  methods: {
    toggleNavDrawer() {
      this.showNavDrawer = !this.showNavDrawer;
    },
  },
};
</script>
