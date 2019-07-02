<template>
  <v-container fluid
               grid-list-xl>

    <v-layout row
              wrap
              v-if="infiniteScrollPosts">
      <v-flex xs12
              sm6
              v-for="post in infiniteScrollPosts.posts"
              :key="post._id">
        <v-card hover>
          <v-img @click.native="goToPost(post._id)"
                 :src="post.imgUrl"
                 height="30vh"
                 lazy>
          </v-img>
          <v-card-actions>
            <v-card-title primary>
              <div>
                <div class="headline">{{post.title}}</div>
                <span class="grey--text">
                  {{post.likes}} likes - {{ post.messages.length}} comments
                </span>
              </div>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon @click="showPostCreator = !showPostCreator">
                {{`fa-chevron-${showPostCreator ? 'up' : 'down'}`}}
              </v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text class="grey lighten-4"
                         v-show="showPostCreator">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src="post.createdBy.avatar"
                       alt="">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title class="text--primary">
                    {{post.createdBy.userName}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title class="font-weight-thin">
                    Added {{post.createdDate}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon
                         right
                         ripple>
                    <v-icon color="grey lighten-1">fa-info</v-icon>
                  </v-btn>
                </v-list-tile-action>

              </v-list-tile>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout column
              v-if="showMoreEnabled">
      <v-flex xs12>
        <v-layout justify-center
                  row>
          <v-btn color="info"
                 @click="showMorePosts">Show More Posts</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import INFINITE_SCROLL_POSTS from '../../queries/infiniteScrollPosts.gql';

const pageSize = 2;
export default {
  name: 'Posts',
  data() {
    return {
      pagination: {
        pageNum: 1,
        pageSize,
      },
      showPostCreator: false,
      showMoreEnabled: true,
    };
  },
  apollo: {
    infiniteScrollPosts: {
      query: INFINITE_SCROLL_POSTS,
      variables: {
        pagination: {
          pageNum: 1,
          pageSize,
        },
      },
      fetchPolicy: 'network-only',
    },
  },
  methods: {
    showMorePosts() {
      this.pagination.pageNum += 1;
      // Fetch more data and transform the original result
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        // New variables
        variables: {
          pagination: {
            pageNum: this.pagination.pageNum,
            pageSize: this.pagination.pageSize,
          },
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
          const { hasMore } = fetchMoreResult.infiniteScrollPosts;

          this.showMoreEnabled = hasMore;

          return {
            infiniteScrollPosts: {
              __typename: previousResult.infiniteScrollPosts.__typename, // eslint-disable-line
              // Merging the tag list
              posts: [...previousResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore,
            },
          };
        },
      });
    },
    goToPost(postId) {
      this.$router.push({ name: 'post', params: { postId } });
    },
  },
};
</script>
