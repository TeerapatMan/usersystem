import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios'
Vue.use(Vuex)
const server_ip = 'http://127.0.0.1:3333/';
export default new Vuex.Store({
    state: {
        auth: [],
        users: [],
        deleteUser: [],
        addUser: [],
        updatePass: [],
    },
    mutations: {
        login(state, data) {
            state.auth = data
        },
        getUser(state, data) {
            state.users = data
        },
        deleteUser(state, data) {
            state.deleteUser = data
        },
        addUser(state, data) {
            state.addUser = data
        },
        updatePass(state, data) {
            state.updatePass = data
        },

    },
    actions: {
        async login(context, options) {
            let data = await axios.post(server_ip + "auth/login", options, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((r) => {
                return r.data
            })
            context.commit("login", data)
        },
        async getUser(context, options) {
            let data = await axios.get(server_ip + "users?token=" + options.token, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((r) => {
                return r.data
            })
            context.commit("getUser", data)
        },
        async deleteUser(context, options) {
            let data = await axios.get(server_ip + "usersDelete?id=" + options.id + "&token=" + options.token, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((r) => {
                return r.data
            })
            context.commit("deleteUser", data)
        },
        async addUser(context, options) {
            let data = await axios.post(server_ip + "users", options, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((r) => {
                return r.data
            })
            context.commit("addUser", data)
        },
        async updatePass(context, options) {
            let data = await axios.put(server_ip + "users", options, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((r) => {
                return r.data
            })
            context.commit("updatePass", data)
        },
    }
})