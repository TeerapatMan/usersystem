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
    
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    >

    <template slot="items" slot-scope="props">
        
        <td >{{ props.item.id }}</td>
        <td >{{ props.item.username }}</td>
        <td >{{ props.item.fullname }}</td>
        <td >{{ props.item.create_datetime }}</td>
        
        <td>
            <v-btn slot="activator" color="primary" @click="previewUser(props.item);">แก้ไข</v-btn>
            <v-btn slot="activator" color="error" @click="confirmDeleteUser(props.item);">ลบ</v-btn>
        </td>
    </template>

      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
        </v-card>


<!-- start dialog Edit-->
<v-dialog v-model="dialogEdit" persistent max-width="700px" >
    <v-card>
        <v-card-title
            class="grey lighten-4 py-3 title"
        >
            แก้ไขผู้ใช้
        </v-card-title>

                <v-tabs
                    v-model="tab"
                    color="cyan"
                    grow
                >
                    <v-tab v-for="item in items" :key="item">
                    {{ item }}
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                    <v-card flat v-if="item=='แก้ไขวิชา'" height="350px">
                    <v-card-text>

                        <v-container grid-list-sm class="pa-4">
                        <v-layout row wrap>
                            <v-flex xs12 align-center justify-space-between>

                            </v-flex>
                            <v-flex xs6>
                            <v-text-field
                                prepend-icon="picture_in_picture"
                                placeholder="รหัสวิชา"
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                            <v-text-field
                                placeholder="หน่วยกิต"
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                            <v-text-field
                                placeholder="หน่วยกิต"
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                            <v-text-field
                                prepend-icon="chrome_reader_mode"
                                placeholder="ชื่อวิชา"
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                            <v-textarea 
                                prepend-icon="notes"
                                placeholder="คำอธิบายรายวิชา"
                            ></v-textarea>
                            </v-flex>
                        </v-layout>
                        </v-container>

                    </v-card-text>
                </v-card>
                
                    <v-card flat v-else-if="item=='คะแนนวิชา'" height="350px">
                        <v-card-text>
                        {{text}}
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
                    
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="dialogEdit = false">Cancel</v-btn>
                <v-btn flat @click="dialogEdit = false">Save</v-btn>
            </v-card-actions>
    </v-card>
</v-dialog>
<!-- end dialog Edit -->

<!-- start dialog Delete-->
<v-dialog v-model="dialogDelete" persistent max-width="700px" >
    <v-card>
        <v-card-title
            class="grey lighten-4 py-3 title"
        >
            ยืนยันการลบ
        </v-card-title>

                <v-tabs
                    v-model="tab"
                    color="cyan"
                    grow
                >
                    <v-tab v-for="item in items" :key="item">
                    {{ item }}
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                    <v-card flat v-if="item=='แก้ไขวิชา'" height="350px">
                    <v-card-text>

                        <v-container grid-list-sm class="pa-4">
                        <v-layout row wrap>
                            <v-flex xs12 align-center justify-space-between>

                            </v-flex>
                            <v-flex xs6>
                            <v-text-field
                                prepend-icon="picture_in_picture"
                                placeholder="รหัสวิชา"
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                            <v-text-field
                                placeholder="หน่วยกิต"
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                            <v-text-field
                                placeholder="หน่วยกิต"
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                            <v-text-field
                                prepend-icon="chrome_reader_mode"
                                placeholder="ชื่อวิชา"
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                            <v-textarea 
                                prepend-icon="notes"
                                placeholder="คำอธิบายรายวิชา"
                            ></v-textarea>
                            </v-flex>
                        </v-layout>
                        </v-container>

                    </v-card-text>
                </v-card>
                
                    <v-card flat v-else-if="item=='คะแนนวิชา'" height="350px">
                        <v-card-text>
                        {{text}}
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
                    
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="dialogDelete = false">Cancel</v-btn>
                <v-btn flat @click="dialogDelete = false">Save</v-btn>
            </v-card-actions>
    </v-card>
</v-dialog>
<!-- end dialog Delete -->



    </v-content>
</template>

<script>
export default {
  data: vm => ({
      search: "",
      dialogEdit: false,
      dialogDelete: false,
      tab: null,
      text: "sss",
      items: ["แก้ไขวิชา", "คะแนนวิชา"],
      headers: [
        {
          text: "#",
          align: "left",
          value: "id",
          sortable: true,
        },
        { 
          text: "รหัสผู้ใช้",
          value: "username"
        },
        { 
          text: "ชื่อ - นามสกุล",
          value: "fullname"
        },
        { 
          text: "วันที่",
          value: "create_datetime"
        },
        {
          text: "จัดการ",
          align: "left",
        }
      ],
      desserts: [
        {
          value: false,
          id: "1",
          username: "แคลคูลัส",
          fullname: "Teerapat",
          create_datetime: "2018-01-13 12:11:00",
        },
        {
          value: false,
          id: "2",
          username: "แคลคูลัส",
          fullname: "Teerapat",
          create_datetime: "2018-01-13 12:11:00",
        },
        {
          value: false,
          id: "3",
          username: "แคลคูลัส",
          fullname: "Teerapat",
          create_datetime: "2018-01-13 12:11:00",
        },
        {
          value: false,
          id: "4",
          username: "แคลคูลัส",
          fullname: "Teerapat",
          create_datetime: "2018-01-13 12:11:00",
        },
        {
          value: false,
          id: "5",
          username: "แคลคูลัส",
          fullname: "Teerapat",
          create_datetime: "2018-01-13 12:11:00",
        },
        {
          value: false,
          id: "6",
          username: "แคลคูลัส",
          fullname: "Teerapat",
          create_datetime: "2018-01-13 12:11:00",
        },
        {
          value: false,
          id: "8",
          username: "แคลคูลัส",
          fullname: "Teerapat",
          create_datetime: "2018-01-13 12:11:00",
        },
        {
          value: false,
          id: "7",
          username: "แคลคูลัส",
          fullname: "Teerapat",
          create_datetime: "2018-01-13 12:11:00",
        },
        
      ]
  }),
  methods:{
      previewUser: async function(item){
          console.log("previewUser")
          console.log(item)
          this.dialogEdit = !this.dialogEdit;
      },
      confirmDeleteUser: async function(item){
          console.log("confirmDeleteUser")
          console.log(item)
        //   this.dialogEdit = !this.dialogEdit;
          this.dialogDelete = !this.dialogDelete;
      }
  },
//   async mounted(){
//       await this.previewUser();
//   }
};
</script>