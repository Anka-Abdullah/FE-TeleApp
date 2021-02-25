<template>
  <b-navbar class="contact pl-2">
    <img src="../assets/user.png" width="50" v-if="data.image === ''" />
    <img :src="url" width="50" v-if="data.image !== ''" />
    <b-col class="m-0 p-0">
      <b-row
        ><h6 class="m-0 mb-1 ml-1 text-blue">{{ data.userName }}</h6>
        <small class="text-secondary ml-auto">11:00</small></b-row
      >
      <b-row>
        <small class=" ml-1">Hello. How are you today?</small>
        <button disabled class="notif ml-auto mt-2 rounded-pill p-0 px-2">
          1
        </button>
      </b-row>
    </b-col>
  </b-navbar>
</template>
<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      url: `http://localhost:3000/` + this.data.image
    }
  }
}
</script>
<style scoped>
.contact {
  border-bottom: 1px solid #c0c0c0;
  background-color: #fdfdfd;
  height: auto;
}
.contact:hover {
  background-color: #e3ebff;
}

.contact img {
  float: left;
  max-width: 60px;
  margin-right: 20px;
  border-radius: 50%;
}
.notif {
  font-size: 14px;
  background: #5983aa;
  color: #fdfdfd;
}
</style>
