import axios from 'axios'
// const env = process.env.VUE_APP_API
const api = `http://localhost:3000`
export default {
  state: { Datauser: {} },
  mutations: {
    setDataUser(state, payload) {
      state.Datauser = payload.data[0]
    }
  },
  actions: {
    updateProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${api}/user/${payload.id}`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
            console.log(error)
          })
      })
    },
    getUserById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${api}/user/${payload}`)
          .then(result => {
            resolve(result)
            context.commit('setDataUser', result.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateImage(context, payload) {
      console.log(payload.data)
      return new Promise((resolve, reject) => {
        axios
          .patch(`${api}/user/image/${payload.id}`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteImage(context, payload) {
      console.log(payload.data)
      return new Promise((resolve, reject) => {
        axios
          .delete(`${api}/user/image/${payload}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: { dataUserId: state => state.Datauser }
}
