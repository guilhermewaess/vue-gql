<template>
  <v-container fluid
               text-xs-center
               class="pa-0">
    <v-flex xs12>
      <carousel></carousel>
    </v-flex>
  </v-container>
</template>

<script>
import Carousel from '../components/misc/Carousel.vue';

export default {
  name: 'Home',
  components: {
    Carousel,
  },
};
</script>
