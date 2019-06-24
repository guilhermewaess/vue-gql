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
                    hide-details
                    v-model="searchTerm"
                    @input="handleSearchPosts">
      </v-text-field>

      <v-card dark
              v-click-outside="cleanSearch"
              v-if="searchResults.length"
              class="search-results-card">
        <v-list>
          <v-list-tile @click="goToPost(result._id)"
                       v-for="result in searchResults"
                       :key="result._id">
            <v-list-tile-title>
              {{ result.title }} -
              <span class="font-weight-thin">
                {{ formatDescription(result.description) }}
              </span>
            </v-list-tile-title>
            <v-list-tile-action v-if="checkIfIsUserFavorite(result._id)">
              <v-icon color="red">fa-heart</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>

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
import ClickOutside from 'vue-click-outside';
import debounce from 'lodash-es/debounce';

import AppNavDrawerContent from './AppNavDrawerContent.vue';
import SEARCH_POSTS from '../../queries/searchPosts.gql';

export default {
  name: 'AppToolbar',
  components: {
    AppNavDrawerContent,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      showNavDrawer: false,
      animateFavoriteBadge: false,
      searchTerm: '',
      searchResults: [],
    };
  },
  methods: {
    // eslint-disable-next-line func-names
    handleSearchPosts: debounce(function () {
      if (this.searchTerm) {
        this.searchPosts();
      }
    }, 800),
    async searchPosts() {
      const variables = {
        searchTerm: this.searchTerm,
      };
      const {
        data: { searchPosts },
      } = await this.$apollo.query({
        query: SEARCH_POSTS,
        variables,
      });
      this.searchResults = searchPosts;
    },
    toggleNavDrawer() {
      this.showNavDrawer = !this.showNavDrawer;
    },
    signOut() {
      this.$store.dispatch('auth/signOut');
    },
    cleanSearch() {
      this.searchTerm = '';
      this.searchResults = [];
    },
    goToPost(postId) {
      this.cleanSearch();
      this.$router.push({ name: 'post', params: { postId } });
    },
    formatDescription(description) {
      const limit = 30;
      return description.length > limit
        ? `${description.slice(0, limit)}...`
        : description;
    },
    checkIfIsUserFavorite(id) {
      return this.userFavorites.some(post => post._id === id);
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
.search-results-card {
  position: absolute;
  width: 100vw;
  z-index: 1000;
  top: 100%;
  left: 0%;
}

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
