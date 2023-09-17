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

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async createLogin() {
      try {
        const response = await AuthService.login(this.loginData);
        if (response) {
          console.log(response);
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('accessTokenExpiry', response.data.accessTokenExpiry);
          localStorage.setItem('refreshTokenExpiry', response.data.refreshTokenExpiry);
          this.$router.push('/contacts');
        }
      } catch (error) {
        console.log(error)
      }
      console.log(this.loginData)
    }
  }
}
</script>

<style>

</style>