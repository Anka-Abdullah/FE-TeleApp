import axios from 'axios'
// const env = api
const api = `http://localhost:3000`
export default {
  state: {
    contacts: [],
    searchContact: ''
  },
  mutations: {
    setContact(state, payload) {
      state.contacts = payload
    },
    setSearchContact(state, payload) {
      state.searchContact = payload
    }
  },
  actions: {
    getContact({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${api}/contact?${
              state.searchContact !== ''
                ? 'search=' + state.searchContact
                : 'id=' + payload
            }`
          )
          .then(result => {
            commit('setContact', result.data.data)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {
    dataContacts: state => state.contacts,
    setsearchContact: state => state.searchContact
  }
}
