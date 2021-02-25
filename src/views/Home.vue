<template>
  <div class="home">
    <b-container fluid class="bg-white">
      <b-row>
        <b-col lg="3" sm="12" class="border-blue p-0" style="height:100vh">
          <b-navbar>
            <button class=" text-blue">
              <h4>
                <p>{{ person.email }}</p>
              </h4>
            </button>
            <b-dropdown variant="none" class="ml-auto" no-caret>
              <template #button-content>
                <h3 class="text-blue">=</h3>
              </template>
              <button
                class="button w-100 text-blue"
                v-b-toggle.sidebar-no-header
              >
                Profile
              </button>
              <button class="button w-100 text-blue">Calls</button>
              <button class="button w-100 text-blue" @click="outBtn">
                Logout
              </button>
              <button class="button w-100 text-blue">TeleApp FAQ</button>
            </b-dropdown>
          </b-navbar>
          <b-navbar>
            <form action="">
              <input
                type="text"
                class="list"
                placeholder="search your contact ..."
                v-model="searchData"
                @keyup.prevent="getSearchContact"
              />
            </form>
            <button class=" text-blue ml-auto text-center">
              <h6>search contact</h6>
            </button>
          </b-navbar>
          <div class="list-box mt-2">
            <button
              class=" p-0 m-0 w-100 text-left"
              v-for="(item, index) in contacts"
              :key="index"
              @click="friendProfileBtn(item.userId)"
            >
              <Contact :data="item" />
            </button></div
        ></b-col>
        <b-col lg="9" sm="12" class="p-0" style="background: #d3d3d3">
          <div class="m-5 p-5" v-if="friend.userName == undefined">
            <b-row>
              <b-icon
                icon="arrow-left-square"
                animation="cylon"
                class="text-gray mx-auto"
                font-scale="7.5"
              ></b-icon>
              <h1 class="text-gray mr-auto">
                <em
                  >click a contact on the left <br />
                  to view the chat</em
                >
              </h1>
            </b-row>
          </div>
          <div v-if="friend.userName != undefined">
            <b-navbar class="bg-white shadow-sm">
              <button
                class="button m-0 p-0 rounded-pill"
                v-b-toggle.sidebar-right
              >
                <img
                  src="../assets/user.png"
                  class="rounded-pill"
                  width="60"
                  v-if="friend.image === ''"
                />
                <img
                  :src="`http://localhost:3000/` + friend.image"
                  width="60"
                  class="rounded-pill"
                  v-if="friend.image !== ''"
                />
              </button>
              <b-col>
                <h5 class="m-0">{{ friend.userName }}</h5>
                <small class="text-blue">online</small>
              </b-col>
              <h5 class="text-secondary m-0 ml-auto mr-2">
                <b-icon icon="search"></b-icon>
              </h5>
              <form action="" class="ml-auto">
                <input
                  type="text"
                  class="bg-light mr-3 list"
                  placeholder="search your message ..."
                />
              </form>
              <b-dropdown
                dropleft
                text="Drop-Left"
                variant="none"
                class="ml-auto"
                no-caret
              >
                <template #button-content>
                  <h3 class="text-blue">=</h3>
                </template>
                <button class="button w-100 text-blue">Call</button>
                <button class="button w-100 text-blue">
                  Delete Chat
                </button>
                <button class="button w-100 my-1 text-blue">
                  Mute Notification
                </button>
                <button class="button w-100 text-blue" v-b-toggle.sidebar-right>
                  Friend Profile
                </button>
              </b-dropdown>
            </b-navbar>
            <div class="chat-box my-3 ml-3 mr-2">
              <Chat :user="person" :friend="friend" />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <UserProfile :dataProfile="person" />
    <!-- sidebar -->
    <b-sidebar id="sidebar-right" title="Sidebar" no-header right shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <b-navbar>
            <button @click="hide" class="m-0 p-0">
              <h4 class="text-blue">
                <strong><b-icon icon="arrow-right-square"></b-icon></strong>
              </h4>
            </button>
            <h4 class="text-blue mx-auto">{{ friend.userName }}</h4>
          </b-navbar>
          <div class="text-center mt-3">
            <img
              src="../assets/user.png"
              width="100"
              class="rounded"
              v-if="friend.image === ''"
            />
            <img
              :src="`http://localhost:3000/` + friend.image"
              width="100"
              class="rounded"
              v-if="friend.image !== ''"
            />
            <h4 class="m-0">{{ friend.userName }}</h4>
            <h6 class="text-secondary">{{ friend.email }}</h6>
          </div>

          <b-navbar class="p-0 mt-2">
            <h5><strong>Account</strong></h5>
          </b-navbar>
          <p class="m-0 mb-2 text-blue">{{ friend.phoneNumber }}</p>
          <p class="m-0">{{ friend.bio }}</p>
          <p class="text-secondary">Bio</p>
          <div>
            <h5><strong>Map Location</strong></h5>
            <GmapMap
              :center="friendCoordinate"
              :zoom="11"
              map-type-id="terrain"
              style="width: 280px; height: 250px"
            >
              <GmapMarker
                :position="friendCoordinate"
                :clickable="true"
                :draggable="true"
                @click="center = friendCoordinate"
              />
            </GmapMap>
          </div>
        </div>
      </template>
    </b-sidebar>
    <!-- sidebar -->
    <b-modal centered ref="my-modal" hide-footer hide-header>
      <div class="d-block text-center">
        <h3 class="text-blue my-5">
          Are you sure you want to LOGOUT?
        </h3>
      </div>
      <b-row class="mb-3">
        <button
          class="button button-blue mx-auto rounded-pill w-25"
          block
          @click="hideModal"
        >
          Cancel
        </button>
        <button
          class="button button-white mr-auto rounded-pill w-25"
          @click="logout"
        >
          Logout
        </button>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Contact from '../components/Contact'
import Chat from '../components/Chat'
import UserProfile from '../components/userProfile'

export default {
  name: 'Home',
  components: { Contact, UserProfile, Chat },
  data() {
    return {
      searchData: '',
      message: '',
      friend: {},
      riendProfile: true,
      friendCoordinate: {
        lat: null,
        lng: null
      }
    }
  },
  created() {
    this.getUserById(this.user.userId)
    this.getContact(this.user.userId)
  },
  computed: {
    ...mapGetters({
      user: 'dataUser',
      person: 'dataUserId',
      contacts: 'dataContacts',
      room: 'setRoom',
      searchContact: 'setSearchContact'
    })
  },
  methods: {
    ...mapActions(['getUserById', 'getContact', 'logout']),
    getSearchContact() {
      this.setSearchContact(this.searchData)
      this.getContact()
    },
    friendProfileBtn(e) {
      axios
        .get(
          `http://localhost:3000/contact/friend/${this.user.userId}?friendId=${e}`
        )
        .then(result => {
          this.friend = result.data.data[0]
          this.friendCoordinate = {
            lat: result.data.data[0].lat,
            lng: result.data.data[0].lng
          }
          this.setRoom(e)
        })
    },
    outBtn() {
      this.modal = 'logout'
      this.showModal()
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    }
  }
}
</script>

<style>
.list {
  padding: 5px 15px;
  border-radius: 8px;
}
.list {
  background: #c8d7ff;
}
a:hover {
  text-decoration: none;
  border: none;
}
.select {
  padding: 0 10px;
  display: inline-block;
  position: relative;
  z-index: 1;
  margin: 0 10px;
  letter-spacing: 1px;
  text-align: center;
  color: #7e98df;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkmark {
  text-align: center;
  position: absolute;
  top: 27px;
  left: 0;
  height: 1px;
  width: 100%;
}
.select:hover input ~ .checkmark {
  background-color: #7e98df;
}
.select input:checked ~ .checkmark {
  background-color: #7e98df;
}
.list-box {
  height: 76vh;
  overflow-y: scroll;
}
.chat-box {
  height: 75vh;
  overflow-y: scroll;
}
</style>
