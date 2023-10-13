<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h1 class="mt-2 text-center">Login Page</h1>
        <form @submit.prevent="createLogin()">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="text" v-model="loginData.email" class="form-control" name="email" id="email">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" v-model="loginData.password" class="form-control" id="password" name="password">
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-outline-success">Login</button>
            <span> Doesn't have account? <router-link to="/signup" class="link-info">Signup</router-link></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {AuthService} from "@/services/AuthService";
import axios from "axios";

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      }
    }
  },
  async mounted() {
  },
  methods: {
    async createLogin() {
      try {
        const response = await AuthService.login(this.loginData);
        console.log('response', response)
        if (response.data.success) {
          localStorage.setItem('accessToken', response.data.data.accessToken);
          localStorage.setItem('refreshToken', response.data.data.refreshToken);
          // this.$router.push('/contacts');
        } else {
          this.errorMessage = response.data.error;
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>