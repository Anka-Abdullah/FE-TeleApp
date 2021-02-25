export default {
  state: {
    room: '',
    search: ''
  },
  mutations: {
    setRoom(state, payload) {
      state.room = payload
      console.log(state.room)
    },
    setSearch(state, payload) {
      state.search = payload
    }
  },
  actions: {},
  getters: {
    setSearch: state => state.search,
    setRoom: state => state.room
  }
}
