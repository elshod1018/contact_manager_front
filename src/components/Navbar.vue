<template>
  <nav class="navbar navbar-dark bg-success navbar-expand-sm w-100">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <i class="fa fa-mobile"></i> Contact Manager
      </router-link>
    </div>
    <div class="row ">
      <div class="col navbar-brand">
        <router-link to="/login" class="btn btn-outline-light fw-bold mx-1">Login</router-link>
        <router-link to="/signup" class="btn btn-outline-light fw-bold mx-1">Sign up</router-link>
        <button type="submit" @click="logoutFunction()" class="btn btn-outline-warning fw-bold mx-1">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: 'Navbar',
  data() {
    return {}
  },
  methods: {
    logoutFunction() {
      axios.defaults.headers.common["Authorization"] = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessTokenExpiry');
      localStorage.removeItem('refreshTokenExpiry');
      this.$router.push('/login');
    }
  }
}
</script>

<style>

</style>