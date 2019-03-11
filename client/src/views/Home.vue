<template>
  <v-container text-xs-center>
    <v-flex xs12>
      <v-carousel v-if="posts"
                  v-bind="{ 'cycle': true }"
                  interval="3000">
        <v-carousel-item v-for="post in posts"
                         :key="post._id"
                         :src="post.imgUrl">
          <h1 class="carousel__title">{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  created() {
    this.getCarouselPosts();
  },
  methods: {
    getCarouselPosts() {
      this.$store.dispatch('posts/getPosts');
    },
  },
  computed: {
    posts() {
      return this.$store.getters['posts/posts'];
    },
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
