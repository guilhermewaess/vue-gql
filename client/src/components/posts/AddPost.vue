<template>
  <v-container text-xs-center
               mt-5
               pt-5>
    <v-layout row
              wrap>
      <v-flex xs12
              sm8
              offset-sm2>
        <h1 class="primary--text">Add Post</h1>
      </v-flex>
    </v-layout>

    <v-layout row
              wrap>
      <v-flex xs12
              sm8
              offset-sm2>
        <v-form @submit.prevent="handleAddPost">
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

          <v-layout row>
            <v-flex xs12>
              <v-btn color="info"
                     type="submit">
                Submit
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AddPost',
  data() {
    return {
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
  methods: {
    handleAddPost() {
      this.$store.dispatch('posts/addPost', this.post);
    },
  },
};
</script>
