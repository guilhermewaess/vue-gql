<template>
  <v-carousel v-if="canShowCaroulsel"
              v-bind="{ 'cycle': true }"
              interval="3000">
    <v-carousel-item v-for="post in posts"
                     :key="post._id"
                     :src="post.imgUrl">
      <h1 class="carousel__title">{{post.title}}</h1>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  created() {
    this.$store.dispatch('posts/getPosts');
  },
  methods: {
  },
  computed: {
    posts() { return this.$store.getters['posts/posts']; },
    canShowCaroulsel() { return this.posts.length > 0; },
  },
};
</script>

<style lang="scss" scoped>
.carousel__title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 0.3125rem 0.3125rem 0 0;
  padding: 2rem;
  margin: 0 auto;
  bottom: 3.125rem;
  left: 0;
  right: 0;
}
</style>
