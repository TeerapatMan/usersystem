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
                            <v-text-field name="oldpassword" label="Old Password" type="text"></v-text-field>
                            <v-text-field name="newpassword" label="New Password" id="password" type="password"></v-text-field>
                            <v-text-field name="confirmpassword" label="Confirm Password" type="text"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary">ยืนยัน</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-flex>
                </v-layout>
            
        </v-content>
    </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      }),
      props: {
        source: String
        }
  }
</script>