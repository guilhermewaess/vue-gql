<template>
  <v-app>
    <loading></loading>
    <app-toolbar></app-toolbar>
    <main>
      <v-container class="mt-5">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import AppToolbar from './components/menus/AppToolbar.vue';
import Loading from './components/misc/Loading.vue';

export default {
  name: 'App',
  components: {
    AppToolbar,
    Loading,
  },
};
</script>


<style lang="scss">
.fade-enter-active,
.fade-leave-action {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
