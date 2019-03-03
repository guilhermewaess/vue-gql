<template>
  <v-container text-xs-center v-if="getPosts">
    <v-flex xs12>
      <v-carousel v-bind="{ 'cycle': true}"
                  interval="3000">
        <v-carousel-item v-for="post in getPosts"
                         :key="post._id"
                         :src="post.imgUrl">
          <h1 class="carousel__title">{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'Home',
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            imgUrl
            categories
            description
            createdDate
            likes
            createdBy {
              userName
            }
          }
        }
      `,
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
