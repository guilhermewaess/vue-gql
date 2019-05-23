<template>
  <v-container text-xs-center
               mt-5
               pt-5>
    <v-layout row
              wrap>
      <v-flex xs12
              sm8
              offset-sm2>
        <h1>Welcome!</h1>
      </v-flex>
    </v-layout>

    <v-layout row
              wrap>
      <v-flex xs12
              sm8
              offset-sm2>
        <v-card color="secondary"
                dark>

          <v-container>
            <v-form>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="username"
                                prepend-icon="far fa-user"
                                label="Username"
                                type="text">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="password"
                                prepend-icon="fas fa-unlock-alt"
                                label="Password"
                                type="password">
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row
                        wrap
                        justify-end>

                <v-flex xs4>
                  <v-btn block
                         color="accent"
                         type="submit">
                    Signin
                  </v-btn>
                </v-flex>

              </v-layout>
            </v-form>
            <v-divider dark></v-divider>
            <h3>
              Don't Have an account yet? Or Want to use social?
            </h3>

            <v-layout row
                      justify-space-between>
              <v-flex xs5>
                <v-btn block
                       color="accent">
                  <v-icon left
                          dark>
                    fab fa-facebook
                  </v-icon>
                  Facebook
                </v-btn>
              </v-flex>

              <v-flex xs5>
                <v-btn block
                       color="accent"
                       @click="signInWithGoogle">
                  <v-icon left
                          dark>
                    fab fa-google
                  </v-icon>
                  Google
                </v-btn>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-btn block
                       disabled
                       color="accent">
                  Create a local account (coming soon) :(
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    signInWithGoogle() {
      this.$store.dispatch('auth/loginWithGoogle');
    },
  },
};
</script>

<style lang="scss" scoped>
.signup__link {
  color: #fff;
}
</style>
