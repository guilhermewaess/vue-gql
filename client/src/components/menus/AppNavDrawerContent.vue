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
      <v-list-tile v-for="item in navItems"
                   :key="item.title"
                   :to="item.link">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          {{ item.title }}
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="isLogged"
                   @click="signOut">
        <v-list-tile-action>
          <v-icon>fa-sign-out-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Signout</v-list-tile-content>
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
    signOut() {
      this.$store.dispatch('auth/signOut');
    },
  },
  computed: {
    isLogged() {
      return this.$store.getters['auth/isLogged'];
    },
    navItems() {
      if (this.isLogged) {
        return [
          { icon: 'fa-comments', title: 'Posts', link: { name: 'posts' } },
          {
            icon: 'fa-file-alt',
            title: 'Create Post',
            link: { name: 'addPost' },
          },
          { icon: 'fa-user', title: 'Profile', link: { name: 'profile' } },
        ];
      }
      return [
        { icon: 'fa-comments', title: 'Posts', link: { name: 'posts' } },
        { icon: 'fa-sign-in-alt', title: 'Sign In', link: { name: 'signin' } },
      ];
    },
  },
};
</script>
