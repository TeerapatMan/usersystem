<template>
  <v-content fill-height justify-center>
      
  <v-card>
    
    <v-card-title>
      <h2>ตารางผู้ใช้</h2>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-flex xs1>
      <v-spacer></v-spacer>
      <v-btn color="success" v-model="dialog" @click="dialog = !dialog">+ เพิ่มข้อมูล</v-btn>
      <v-spacer></v-spacer>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    >
    <template slot="items" slot-scope="props">
        
        <td >{{ props.item.id }}</td>
        <td >{{ props.item.username }}</td>
        <td >{{ props.item.firstname }}</td>
        <td>
            <v-btn slot="activator" color="error" @click="deleteUser(props.item.id);" v-model="deleteUsers">ลบ</v-btn>
        </td>
    </template>

      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    <!-- start dialog -->
  <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">เพิ่มผู้ใช้งาน</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="username*" v-model="formAdd.username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" v-model="formAdd.password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="firstname" v-model="formAdd.firstname" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="lastname" v-model="formAdd.lastname" required></v-text-field>
              </v-flex>
              <p>ประเภทของผู้ใช้: {{ radios || 'null' }}</p>
              <v-flex xs12>
                <v-radio-group v-model="radios" :mandatory="false">
                  <v-radio label="teacher" value="teacher"></v-radio>
                  <v-radio label="admin" value="admin"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">ปิด</v-btn>
          <v-btn color="blue darken-1" flat @click="addUser();">บันบึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end dialog -->
  </v-card>
    </v-content>
</template>

<script>
import Store from "@/store";

export default {
  data: () => ({
    formAdd: {},
    search: "",
    deleteUsers: {},
    dialog: false,
    radios: "teacher",
    headers: [
      {
        text: "#",
        align: "left",
        value: "id",
        sortable: true
      },
      {
        text: "รหัสผู้ใช้",
        value: "username"
      },
      {
        text: "ฃื่อ",
        value: "firstname"
      },
      {
        text: "จัดการ",
        align: "left"
      }
    ],
    desserts: [
      // {
      //   id: "1",
      //   username: "peera",
      //   fullname: "peera",
      // },
    ]
  }),
  props: {
    source: String
  },
  methods: {
    getUser: async function() {
      console.log("getUser")
      let optionts = {
        token: localStorage.getItem("token")
      };
      await Store.dispatch("getUser", optionts);
      if (Store.state.users.status) {
        this.desserts = Store.state.users.users;
        console.log(this.desserts);
      }
    },
    deleteUser: async function(id) {
      let optionts = {
        token: localStorage.getItem("token"),
        id: id
      };
      await Store.dispatch("deleteUser", optionts);
      if (Store.state.deleteUser.status) {
        await this.getUser();
        alert(Store.state.deleteUser.msg);
      }
    },
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
    
  },
  async mounted() {
    await this.getUser();
  }
};
</script>