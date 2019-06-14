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

        <v-btn flat
               :to="{ name: 'profile'}"
               v-if="isLogged">
          <v-icon left
                  class="hidden-sm-only">fa-user</v-icon>
          <v-badge color="blue darken-2">
            <template v-slot:badge>
              <span :class="{ 'shake': animateFavoriteBadge }">
                {{ userFavorites.length }}
              </span>
            </template>
            Profile
          </v-badge>
        </v-btn>

        <v-btn flat
               v-if="isLogged"
               @click="signOut">
          <v-icon class="hidden-sm-only"
                  left>
            fa-sign-out-alt
          </v-icon>
          Signout
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
      animateFavoriteBadge: false,
    };
  },
  methods: {
    toggleNavDrawer() {
      this.showNavDrawer = !this.showNavDrawer;
    },
    signOut() {
      this.$store.dispatch('auth/signOut');
    },
  },
  computed: {
    isLogged() {
      return this.$store.getters['auth/isLogged'];
    },
    userFavorites() {
      return this.$store.getters['auth/userFavorites'];
    },
    navItems() {
      if (this.isLogged) {
        return [
          { icon: 'fa-comments', title: 'Posts', link: { name: 'posts' } },
        ];
      }
      return [
        { icon: 'fa-comments', title: 'Posts', link: { name: 'posts' } },
        { icon: 'fa-sign-in-alt', title: 'Sign In', link: { name: 'signin' } },
      ];
    },
  },
  watch: {
    userFavorites(value) {
      if (value) {
        this.animateFavoriteBadge = true;
        setTimeout(() => {
          this.animateFavoriteBadge = false;
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shake {
  animation: shake 1s;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
