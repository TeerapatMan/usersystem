<template>
    <v-app>
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          
          <v-list-tile v-else :key="item.text" :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </template>
      </v-list>
    </v-navigation-drawer>

    
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue-grey lighten-2"
      dark
      app
      fixed
    >
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <img src="@/assets/UPLogo.png" alt="UPLogo" width="35px">
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <span class="hidden-sm-and-down">มหาวิทยาลัยพะเยา</span>
      </v-toolbar-title>
      <v-text-field
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        flat
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn to="/main" icon>
        <v-icon>home</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container >
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      drawer: true,
      isAdmin: false,

      itemsTeacher: [
        { 
            path: '/main/teacher',
            icon: 'add_box', 
            text: 'เมนูครู'
        },
      ],

      itemsAdmin: [
        { 
            path: '/main/manageUser',
            icon: 'person_add', 
            text: 'จัดการผู้ใช้'
        },
      ],

      items: [
        { 
            path: '/main/setting',
            icon: 'settings', 
            text: 'ตั้งค่าบัญชี' 
        },
        {  
            path: '/logout',
            icon: 'account_circle', 
            text: 'ออกจากระบบ' 
        },
      ],
      
      
    }),
    props: {
      source: String
    },
    methods: {
        setMenu: async function(){
            let token  = await localStorage.getItem('token')
            let _dataToken = token.split('.')
            var decodedString = this.b64DecodeUnicode(_dataToken[0]);
            let dataToken = JSON.parse(decodedString);
            this.items = (dataToken.role_id == 2) ? this.itemsAdmin.concat(this.items): this.itemsTeacher.concat(this.items);
        },
        b64DecodeUnicode(str) {
            return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            }).join(''))
        }

        
    },
    async created() {
      await this.setMenu();
    }
  }
</script>
