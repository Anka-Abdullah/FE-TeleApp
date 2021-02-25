<template>
  <div>
    <b-form-group>
      <b-form-select class="mb-3" @change="selectRoom" v-model="room">
        <b-form-select-option :value="null"
          >Please select Room</b-form-select-option
        >
        <b-form-select-option value="html">HTML</b-form-select-option>
        <b-form-select-option value="css">CSS</b-form-select-option>
        <b-form-select-option value="js">JS</b-form-select-option>
      </b-form-select>
    </b-form-group>
    <p v-if="typing.isTyping">
      <!-- <em> {{ typing.username }} is typing ... </em> -->
      <em>is typing</em>
    </p>
    <!-- <div v-for="(item, index) in dataChat" :key="index"> -->
    <div class="chat shadow">
      <img src="../assets/user.png" v-if="friend.image == ''" />
      <img
        :src="`http://localhost:3000/` + friend.image"
        v-if="friend.image !== ''"
      />
      <h5 class="m-0 mb-1" style="color: rgb(107, 107, 107);">
        {{ friend.userName }}
      </h5>
      <p class="m-0">Hello. How are you today?</p>
      <span class="time-right">11:00</span>
    </div>

    <div class="chat white shadow">
      <img src="../assets/user.png" class="right" v-if="user.image == ''" />
      <img
        :src="`http://localhost:3000/` + user.image"
        class="right"
        v-if="user.image !== ''"
      />
      <h5 class="text-blue text-right m-0 mb-1">{{ user.userName }}</h5>
      <p class="text-right m-0">Hey! I'm fine. Thanks for asking!</p>
      <span class="time-left">11:01</span>
    </div>
    <!-- </div> -->

    <p>{{ dataChat }}</p>
    <b-navbar
      class="p-2 pr-4 ml-auto"
      fixed="bottom"
      style="max-width: 1024px; background: #ebf4ff"
    >
      <input
        type="text"
        class="w-100 bg-white shadow pt-2 ml-3 msg"
        v-model="message"
      />

      <button class="button ml-2 rounded-pill" @click="sendMessage">
        <h4 class="text-blue">
          <strong><b-icon icon="cursor"></b-icon></strong>
        </h4>
      </button>
      <button class="button ml-0 rounded-pill">
        <h3 class="text-blue">
          <strong><b>+</b></strong>
        </h3>
      </button>
    </b-navbar>
  </div>
</template>
<script>
import io from 'socket.io-client'

export default {
  props: {
    user: Object,
    friend: Object
  },
  data() {
    return {
      socket: io('http://localhost:4501'),
      userName: '',
      message: '',
      dataChat: [],
      oldRoom: '',
      typing: ''
    }
  },
  created() {
    this.socket.on('chatMessage', data => {
      this.dataChat.push(data)
    })
    this.socket.on('typingMessage', data => {
      console.log(data)
      this.typing = data
    })
  },
  watch: {
    message(v) {
      v
        ? this.socket.emit('typing', {
            // username: this.userName,
            room: this.room,
            isTyping: true
          })
        : this.socket.emit('typing', {
            room: this.room,
            isTyping: false
          })
    }
  },
  methods: {
    sendMessage() {
      // const setData = {
      //   username: this.userName,
      //   message: this.message
      // };
      this.socket.emit('globalMessage', setData)
      // this.socket.emit("privateMessage", setData);
      // this.socket.emit("broadcastMessage", setData);
      const setData = {
        // username: this.userName,
        message: this.message,
        room: this.room
      }
      this.socket.emit('roomMessage', setData)
      this.message = ''
    },
    selectRoom(e) {
      if (this.oldRoom) {
        this.socket.emit('changeRoom', {
          // username: this.userName,
          room: e,
          oldRoom: this.oldRoomm
        })
        this.oldRoom = e
      } else {
        this.socket.emit('joinRoom', {
          // username: this.userName,
          room: e
        })
        this.oldRoom = e
      }
    }
  }
}
</script>
<style scoped>
.chat {
  width: 55%;
  background-color: #ebf4ff;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 10px;
  margin: 10px 0;
}
.white {
  float: right;
  background-color: #ffffff;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.chat::after {
  content: '';
  clear: both;
  display: table;
}

.chat img {
  float: left;
  max-width: 40px;
  margin-right: 20px;
  border-radius: 50%;
}

.chat img.right {
  float: right;
  margin-left: 20px;
  margin-right: 0;
}

.time-right {
  float: right;
  color: #aaa;
}

.time-left {
  float: left;
  color: #999;
}
.msg {
  border: none;
  border-radius: 20px;
  resize: none;
  padding: 0px 15px;
}
.msg:focus {
  outline: none;
}
</style>
