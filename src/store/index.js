import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Chat from './modules/chat'
import Profile from './modules/profile'
import Contact from './modules/contact'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { Chat, Auth, Profile, Contact },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      },
      paths: ['Auth.user']
    })
  ]
})
