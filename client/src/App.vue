<template>
  <v-app>
    <app-toolbar></app-toolbar>
    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import AppToolbar from './components/menus/AppToolbar.vue';

export default {
  name: 'App',
  components: {
    AppToolbar,
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
