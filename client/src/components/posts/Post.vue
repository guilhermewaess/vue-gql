<template>
  <v-container v-if="getPost"
               class="mt-3"
               flexbox
               center>
    <v-layout row
              wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card-title>
            <h1>{{ getPost.title }}</h1>
            <v-btn large
                   icon
                   v-if="user">
              <v-icon color="grey">fa-heart</v-icon>
            </v-btn>
            <h3 class="ml-3 font-weight-thin">{{ getPost.likes }} LIKES</h3>
            <v-spacer></v-spacer>
            <v-icon @click="goToPreviousPage"
                    color="info"
                    large>fa-arrow-left</v-icon>
          </v-card-title>

          <v-tooltip right>
            <span>Click to enlarge image</span>
            <v-img @click="toggleImageDialog"
                   slot="activator"
                   :src="getPost.imgUrl"
                   id="post__image">
            </v-img>
          </v-tooltip>

          <v-dialog v-model="dialog">
            <v-card>
              <v-img :src="getPost.imgUrl"
                     height="80vh">
              </v-img>
            </v-card>
          </v-dialog>

          <v-card-text>
            <span v-for="(category, index) in getPost.categories"
                  :key="index">
              <v-chip class="mb-3"
                      color="accent"
                      text-color="white">
                {{category}}
              </v-chip>
            </span>
            <h3>{{getPost.description}}</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <div class="mt-3">
      <v-layout class="mb-3"
                v-if="user">
        <v-flex xs12>
          <v-form @submit.prevent="handleAddPostMessage">
            <v-layout row>
              <v-flex xs12>
                <v-text-field clearable
                              append-outer-icon="fa-share-square"
                              label="Add Message"
                              type="text"
                              prepend-icon="far fa-envelope"
                              required
                              v-model="message.messageBody"
                              @click:append-outer="handleAddPostMessage">
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>

      <v-layout row
                wrap>
        <v-flex xs12>
          <v-list subheader
                  two-line>
            <v-subheader>Messages ({{getPost.messages.length}})</v-subheader>
            <template v-for="message in getPost.messages">
              <v-divider :key="message._id"></v-divider>

              <v-list-tile avatar
                           inset
                           :key="message.title">
                <v-list-tile-avatar>
                  <img :src="message.messageUser.avatar"
                       alt="">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>
                    {{message.messageBody}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{message.messageUser.userName}}
                    <span class="grey--text text--lighten-1 hidden-xs-only">
                      {{message.messageDate}}
                    </span>
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action class="hidden-xs-only">
                  <v-icon color="grey">far fa-comments</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import GET_POST from '../../queries/getPost.gql';
import ADD_POST_MESSAGE from '../../queries/addPostMessage.gql';

export default {
  name: 'Post',
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      message: {
        messageBody: '',
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  apollo: {
    getPost: {
      query: GET_POST,
      variables() {
        return {
          postId: this.postId,
        };
      },
    },
  },
  methods: {
    async handleAddPostMessage() {
      const post = {
        messageBody: this.message.messageBody,
        postId: this.postId,
      };
      await this.$apollo.mutate({
        mutation: ADD_POST_MESSAGE,
        variables: {
          postMessage: post,
        },
        update: (cache, { data: { addPostMessage } }) => {
          const data = cache.readQuery({
            query: GET_POST,
            variables: {
              postId: this.postId,
            },
          });
          data.getPost.messages.unshift(addPostMessage);
          cache.writeQuery({
            query: GET_POST,
            variables: {
              postId: this.postId,
            },
            data,
          });
        },
      });
    },
    goToPreviousPage() {
      this.$router.go(-1);
    },
    toggleImageDialog() {
      if (window.innerWidth > 500) {
        this.dialog = !this.dialog;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#post__image {
  height: 400px !important;
}
</style>
