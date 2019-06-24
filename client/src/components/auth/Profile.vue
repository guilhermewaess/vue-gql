<template>
  <v-container class="text-xs-center">
    <v-flex sm6
            offset-sm3>
      <v-card class="white--text"
              color="secondary">
        <v-layout>
          <v-flex xs5>
            <v-img height="100%"
                   contain
                   :src="user.avatar"></v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ user.userName }}</div>
                <div>Joined {{ user.joinDate }}</div>
                <div class="hidden-xs-only font-weight-thin">
                  {{ user.favorites.length}} Favorites
                </div>
                <div class="hidden-xs-only font-weight-thin">
                  {{ getUserPosts.length }} Posts Added
                </div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-container v-if="!user.favorites.length">
      <v-layout row
                wrap>
        <v-flex xs12>
          <h2>You have no favorites. Go and add some :)</h2>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="mt-3"
                 v-else>
      <v-flex xs12>
        <h2 class="font-weight-light">Favorited:
          <span class="font-weight-regular">{{ user.favorites.length }}</span>
        </h2>
      </v-flex>
      <v-layout row
                wrap>
        <v-flex xs12
                sm6
                v-for="favorite in user.favorites"
                :key="favorite._id">
          <v-card class="mt-3
                         ml-1 mr-2
                         favorite-card"
                  @click="goToPost(favorite._id)"
                  hover>
            <v-img height="30vh"
                   :src="favorite.imgUrl"></v-img>
            <v-card-text>{{ favorite.title }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="!getUserPosts.length">
      <v-layout row
                wrap>
        <v-flex xs12>
          <h2>You have no posts yet. Go and add some!</h2>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="mt-3"
                 v-else>
      <v-flex xs12>
        <h2 class="font-weight-light">You have
          {{ getUserPosts.length }} Posts
        </h2>
      </v-flex>
      <v-layout row
                wrap>
        <v-flex xs12
                sm6
                v-for="post in getUserPosts"
                :key="post._id">
          <v-card class="mt-3 ml-1 mr-2"
                  hover>
            <v-btn color="info"
                   @click="loadPost(post)"
                   floating
                   fab
                   small
                   dark>
              <v-icon>fas fa-pencil-alt</v-icon>
            </v-btn>
            <v-btn @click="handleDeletePost(post._id)"
                   color="error"
                   floating
                   fab
                   small
                   dark>
              <v-icon>far fa-trash-alt</v-icon>
            </v-btn>
            <v-img height="30vh"
                   :src="post.imgUrl">
            </v-img>
            <v-card-text>
              {{ post.title }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-dialog xs12
                sm6
                offset-sm3
                persist
                v-model="showEditPostDialog">
        <v-card>
          <v-card-title class="headline grey lighten-2">Update Post</v-card-title>
          <v-container>

            <v-form @submit.prevent="handleEditPost">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="post.title"
                                label="Post Title"
                                type="text">
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="post.imgUrl"
                                label="Image"
                                type="text">
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <img :src="post.imgUrl"
                       height="300px">
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-select multiple
                            v-model="post.categories"
                            :items="categoriesOptions"
                            label="Categories"
                            type="text">
                  </v-select>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-textarea required
                              v-model="post.description"
                              label="Description"
                              type="text">
                  </v-textarea>
                </v-flex>
              </v-layout>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit"
                       class="success--text"
                       flat>Update</v-btn>
                <v-btn type="button"
                       class="error--text"
                       flat
                       @click="showEditPostDialog = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script>
import GET_USER_POSTS from '../../queries/getUserPosts.gql';
import UPDATE_POST from '../../queries/updatePost.gql';
import DELETE_POST from '../../queries/deletePost.gql';

export default {
  name: 'Profile',
  data() {
    return {
      getUserPosts: [],
      showEditPostDialog: false,
      post: {
        title: '',
        imgUrl: '',
        categories: '',
        description: '',
      },
      categoriesOptions: [
        'Art',
        'Education',
        'Travel',
        'Photography',
        'Technology',
      ],
    };
  },
  apollo: {
    getUserPosts: GET_USER_POSTS,
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  methods: {
    goToPost(postId) {
      this.$router.push({ name: 'post', params: { postId } });
    },
    async handleEditPost() {
      const variables = { post: this.post };
      await this.$apollo.mutate({
        mutation: UPDATE_POST,
        variables,
        update: (cache, { data: { updatePost } }) => {
          const cacheData = cache.readQuery({
            query: GET_USER_POSTS,
          });
          const post = cacheData.getUserPosts.find(
            p => p._id === updatePost._id,
          );
          post.title = updatePost.title;
          post.imgUrl = updatePost.imgUrl;
          post.categories = updatePost.categories;
          post.description = updatePost.description;

          cache.writeQuery({
            query: GET_USER_POSTS,
            data: cacheData,
          });
        },
      });
      this.$store.dispatch('auth/refreshUserData');
      this.showEditPostDialog = false;
    },
    loadPost(post, showEditPostDialog = true) {
      const {
        _id, title, imgUrl, categories, description,
      } = post;
      this.showEditPostDialog = showEditPostDialog;
      this.post = {
        _id,
        title,
        imgUrl,
        categories,
        description,
      };
    },
    async handleDeletePost(postId) {
      const confirmMessage = 'Are you sure about deleting this post?';
      // eslint-disable-next-line no-alert
      if (window.confirm(confirmMessage)) {
        await this.$apollo.mutate({
          mutation: DELETE_POST,
          variables: { postId },
          update: (cache, { data: { deletePost } }) => {
            const cacheData = cache.readQuery({
              query: GET_USER_POSTS,
            });
            cacheData.getUserPosts = cacheData.getUserPosts.filter(
              p => p._id !== deletePost._id,
            );

            cache.writeQuery({
              query: GET_USER_POSTS,
              data: cacheData,
            });
          },
        });
        this.$store.dispatch('auth/refreshUserData');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.favorite-card:hover {
  cursor: pointer;
}
</style>
