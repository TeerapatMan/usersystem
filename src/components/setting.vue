<template>
    <v-app>
        <v-content fluid fill-height>
                <v-layout align-center justify-center>
                <v-flex xs12 sm8 md6>
                    <v-card class="elevation-12">
                    <v-toolbar dark color="blue-grey lighten-2">
                        <v-toolbar-title>แก้ไขรหัสผ่าน</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="รหัสเก่า" type="password" v-model="formPass.password"></v-text-field>
                            <v-text-field label="รหัสใหม่" type="password" v-model="formPass.repassword"></v-text-field>
                            <v-text-field label="ยืนยันรหัสใหม่" type="password" v-model="formPass.newpassword"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="updatePass()">ยืนยัน</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-flex>
                </v-layout>
        </v-content>
    </v-app>
</template>

<script>
import Store from "@/store";
export default {
  data: () => ({
    drawer: null,
    formPass:{}
  }),
  props: {
    source: String
  },
  methods: {
    addUser: async function() {
      let optionts = {
        username: this.formAdd.username,
        password: this.formAdd.password,
        firstname: this.formAdd.firstname,
        lastname: this.formAdd.lastname,
        role: this.radios,
        token: localStorage.getItem("token")
      };
      await Store.dispatch("addUser", optionts);
      if (Store.state.addUser.status) {
        this.dialog = false;
        await this.getUser();
        alert(Store.state.addUser.msg);
        this.formAdd = {};
        this.radios = "teacher";
      }
    },
    updatePass: async function() {
    alert("จะได้หรือไม่ได้ว่ะ ควย!!!!")
      let optionts = {
        password: this.formPass.password,
        repassword: this.formPass.repassword,
        newpassword: this.formPass.newpassword,
        token: localStorage.getItem("token")
      };
      await Store.dispatch("updatePass", optionts);
      if (Store.state.updatePass.status) {
        await localStorage.setItem('token',Store.state.updatePass.token)
        alert(Store.state.updatePass.msg);
        this.formPass = {};
      }
    }
  }
};
</script>