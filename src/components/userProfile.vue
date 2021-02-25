<template>
  <div>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
    >
      <template #default="{ hide }">
        <div class="p-3" v-if="userProfile">
          <b-navbar>
            <button @click="hide" class="m-0 p-0">
              <h4 class="text-blue">
                <strong><b-icon icon="arrow-left-square"></b-icon></strong>
              </h4>
            </button>
            <h4 class="text-blue mx-auto">{{ dataProfile.userName }}</h4>
          </b-navbar>
          <div class="text-center mt-3">
            <img
              src="../assets/user.png"
              width="100"
              class="rounded"
              v-if="dataProfile.image === ''"
            />
            <img
              :src="`http://localhost:3000/` + dataProfile.image"
              width="100"
              class="rounded"
              v-if="dataProfile.image !== ''"
            />
            <b-navbar>
              <button class="button mx-auto rounded-pill" @click="delBtn">
                <small><b-icon icon="trash"></b-icon> Delete Image</small>
              </button>
              <button class="button rounded-pill" @click="updBtn">
                <small><b-icon icon="pencil"></b-icon> Update Image</small>
              </button>
            </b-navbar>
            <h4 class="m-0">{{ dataProfile.userName }}</h4>
            <h6 class="text-secondary">{{ dataProfile.email }}</h6>
          </div>
          <b-navbar class="p-0 mt-2">
            <h5><strong>Account</strong></h5>
            <button
              class="button ml-auto rounded-pill"
              @click="userProfile = !userProfile"
            >
              <b-icon icon="pencil"></b-icon> edit
            </button>
          </b-navbar>
          <p class="m-0 mb-2 text-blue">{{ dataProfile.phoneNumber }}</p>
          <p class="m-0">{{ dataProfile.bio }}</p>
          <p class="text-secondary">Bio</p>
          <h5><strong>Map Location</strong></h5>
          <Map />
        </div>
        <div class="p-3" v-if="!userProfile">
          <form action="" @submit.prevent="patchProfile">
            <p class="mt-3">Let’s Update your account!</p>
            <h6 class="text-gray mt-5">User Name :</h6>
            <input
              type="text"
              class="auth-input w-100"
              v-model="form.userName"
              required
            />
            <h6 class="text-gray mt-3">Phone Number :</h6>
            <input
              type="text"
              class="auth-input w-100"
              v-model="form.phoneNumber"
              required
            />
            <h6 class="text-gray mt-3">Bio :</h6>
            <input type="text" class="auth-input w-100" v-model="form.bio" />
            <h6 class="text-gray mt-3">Coordinate :</h6>
            <input
              type="text"
              class="auth-input w-100"
              v-model="form.coordinate"
            />
            <button
              type="submit"
              class="button button-blue w-100 py-2 rounded-pill mx-auto mt-5"
            >
              Update
            </button>
          </form>
          <button
            class="button button-white w-100 py-2 rounded-pill my-2"
            @click="userProfile = true"
          >
            Cancel
          </button>
        </div>
      </template>
    </b-sidebar>
    <b-modal centered ref="my-modal" hide-footer hide-header>
      <div class="d-block text-center">
        <h3 class="text-blue my-5" v-if="modal === 'delete'">
          delete this picture?
        </h3>
        <h3 class="text-blue m-0" v-if="modal === 'update'">
          Choose Your Picture
        </h3>
        <input
          type="file"
          id="file"
          ref="file"
          v-if="modal === 'update'"
          class="my-4 w-50"
          @change="handleFile"
        />
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
          v-if="modal === 'delete'"
          @click="delImage"
        >
          Delete
        </button>
        <button
          class="button button-white mr-auto rounded-pill w-25"
          v-if="modal === 'update'"
          @click="patchImage"
        >
          Update
        </button>
      </b-row>
    </b-modal>
  </div>
</template>
<script>
import Map from '../components/Map'
import Swal from 'sweetalert2'
export default {
  props: ['dataProfile'],
  components: {
    Map
  },
  created() {
    this.formulir()
  },
  data() {
    return {
      form: {
        userName: '',
        phoneNumber: '',
        bio: '',
        coordinate: '0'
      },
      userProfile: true,
      modal: ''
    }
  },
  methods: {
    formulir() {
      this.form = this.dataProfile
    },
    patchProfile() {
      const payload = {
        data: this.form,
        id: this.user.userId
      }
      this.updateProfile(payload)
      this.getDataUser()
    },
    patchImage() {
      let formData = new FormData()
      formData.append('image', this.image, this.image.name)
      const payload = {
        data: formData,
        id: this.data.userId
      }
      this.updateImage(payload)
        .then(() => {
          this.getDataUser()
          this.hideModal()
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Extension File Must Be PNG or JPG and MAX size 1 mb'
          })
        })
    },
    delImage() {
      this.deleteImage(this.dataUser.userId).then(() => {
        this.getDataUser()
        this.hideModal()
      })
    },
    handleFile(e) {
      this.image = e.target.files[0]
    },
    delBtn() {
      this.modal = 'delete'
      this.showModal()
    },
    updBtn() {
      this.modal = 'update'
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
