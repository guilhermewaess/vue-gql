<template>
  <v-app>
    <v-toolbar fixed
               color="primary"
               dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
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
                    hide-details>
      </v-text-field>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat
               v-for="item of horizonalNavItems"
               :key="item.title"
               :to="item.link">
          <v-icon left
                  class="hidden-sm-only"> {{ item.icon }} </v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <v-container class="mt-4">
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      horizonalNavItems: [
        { icon: 'fa-comment', title: 'Posts', link: '/posts' },
        { icon: 'fa-sign-in-alt', title: 'Sign In', link: '/signin' },
        { icon: 'fa-user-plus', title: 'Sign Up', link: '/signup' },
      ],
    };
  },
};
</script>


<style lang="scss">
</style>
