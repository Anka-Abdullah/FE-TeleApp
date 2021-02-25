<template>
  <div class="register">
    <b-container class="auth">
      <b-card class="bg-white shadow mx-auto card border-0">
        <b-navbar>
          <router-link to="/login" class="text-blue">
            <h4><strong>&#60;</strong></h4>
          </router-link>
          <h4 class="text-blue mx-auto">Register</h4>
          <router-link to="/login">Login</router-link>
        </b-navbar>
        <form action="" @submit.prevent="onSubmit">
          <p class="mt-3">Let’s create your account!</p>
          <h6 class="text-gray mt-5">User Name :</h6>
          <input
            type="text"
            class="auth-input w-100"
            v-model="form.userName"
            required
          />
          <h6 class="text-gray mt-3">Email :</h6>
          <input
            type="email"
            class="auth-input w-100"
            v-model="form.email"
            required
          />
          <h6 class="text-gray mt-3">Password :</h6>
          <input
            type="password"
            class="auth-input w-100"
            v-model="form.password"
            required
          />
          <h6 class="text-gray mt-3">Confirm Password :</h6>
          <input
            type="password"
            class="auth-input w-100"
            v-model="confirm"
            required
          />
          <h5
            class="text-danger my-4 text-center"
            v-if="form.password != confirm"
          >
            password and password confirmation <br />
            are not the same
          </h5>
          <button
            type="submit"
            class="button button-blue w-100 py-2 rounded-pill mx-auto mt-5"
            v-if="form.password === confirm"
          >
            Register
          </button>
        </form>
        <p class="text-gray text-center m-0 my-2">Or Register With</p>
        <button
          class="button button-white w-100 py-2 rounded-pill mx-auto mb-4"
        >
          Google
        </button>
      </b-card>
    </b-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'Register',
  data() {
    return {
      confirm: '',
      form: {
        email: '',
        password: '',
        userName: ''
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    onSubmit() {
      this.register(this.form)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Yeay...',
            text: 'your registration was successful'
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 1500)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.data.message
          })
        })
    }
  }
}
</script>
<style scoped></style>
