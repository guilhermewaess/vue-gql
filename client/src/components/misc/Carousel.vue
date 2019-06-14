<template>
  <v-carousel v-if="infiniteScrollPosts"
              v-bind="{ 'cycle': true }"
              interval="3000">
    <v-carousel-item v-for="post in infiniteScrollPosts.posts"
                     :key="post._id"
                     :src="post.imgUrl"
                     @click.native="goToPost(post._id)">
      <h1 class="carousel__title">{{post.title}}</h1>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import INFINITE_SCROLL_POSTS from '../../queries/infiniteScrollPosts.gql';

export default {
  name: 'Carousel',
  methods: {
    goToPost(postId) {
      this.$router.push({ name: 'post', params: { postId } });
    },
  },
  apollo: {
    infiniteScrollPosts: {
      query: INFINITE_SCROLL_POSTS,
      variables: {
        pagination: {
          pageNum: 1,
          pageSize: 10,
        },
      },
      fetchPolicy: 'network-only',
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
