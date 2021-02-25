<template>
  <div class="login">
    <b-container class="auth">
      <b-card class="bg-white shadow mx-auto card border-0">
        <b-navbar>
          <h4 class="text-blue mx-auto">Login</h4>
        </b-navbar>
        <p>Hi, Wellcome Back .!</p>
        <form action="" @submit.prevent="onSubmit">
          <h6 class="text-gray mt-5">Email :</h6>
          <input
            type="email"
            class="auth-input w-100"
            v-model="form.email"
            required
          />
          <h6 class="text-gray mt-4">Password :</h6>
          <input
            type="password"
            class="auth-input w-100"
            v-model="form.password"
            required
          />
          <router-link to=""
            ><h6 class="text-blue text-right my-4">
              Forgot Password .?
            </h6></router-link
          >
          <button
            type="submit"
            class="button button-blue w-100 py-2 rounded-pill mx-auto"
          >
            Login
          </button>
        </form>
        <p class="text-gray text-center m-0 my-3">Or Login With</p>
        <button class="button button-white w-100 py-2 rounded-pill mx-auto">
          Google
        </button>
        <p class="text-center my-3">
          Don’t have an account?
          <router-link to="/register">Sign Up</router-link>
        </p>
      </b-card>
    </b-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  created() {
    setTimeout(() => {
      Swal.fire('hello, please login correctly &#x1F603;')
    }, 500)
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then(() => {
          this.$router.push('/')
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
<style scoped>
a:hover {
  text-decoration: none;
}
</style>
