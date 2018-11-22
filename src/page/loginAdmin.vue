<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue-grey lighten-2">
                <v-toolbar-title>Login Admin</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" v-model="form_login.username" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" v-model="form_login.password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                  <router-link to="/" tag="v-card-text">Login User</router-link>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login();">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Store from '@/store'
import router from '@/router'
  export default {
    data: () => ({
      drawer: null,
      form_login: {}
    }),
    props: {
      source: String
    },
    methods:{
        login: async function() {
          if (!this.form_login.username || !this.form_login.password) {
              return alert('โปรดกรอกข้อมูลให้ครบถ้วน')
          }
          let optionts = {
              username: this.form_login.username,
              password: this.form_login.password,
              role: 'admin'
          };
          await Store.dispatch("login", optionts);
          if (Store.state.auth.status) {
              // this.$refs.newShop.hide()
              await localStorage.setItem('token',Store.state.auth.token)
              router.push('/main');
          } else if (!Store.state.auth.status) {
              alert(Store.state.auth.msg)
          }
        }
    }
  }
</script>

<style>

</style>
