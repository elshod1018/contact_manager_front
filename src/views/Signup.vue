<template>
  <div class="container" v-if="!activation">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="mt-2 text-center">Registration page</h1>
        <p class="text-danger fw-bold text-center" v-if="!matchPasswords">
          Password and confirm password must be the same
        </p>
        <p v-if="errorMessage" class="text-danger text-center fw-bold">{{ errorMessage }}</p>
        <form @submit.prevent="createSignup()">
          <div class="mb-3">
            <label for="fullName" class="form-label">Full Name <span class="text-danger fw-bold">*</span></label>
            <input type="text"
                   v-model="signupData.fullName"
                   class="form-control"
                   :class="{ 'border-danger': !isValid && !signupData.fullName}"/>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email <span class="text-danger fw-bold">*</span></label>
            <input type="text"
                   v-model="signupData.email"
                   class="form-control"
                   :class="{ 'border-danger': !isValid && !signupData.email}"/>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">
              Password <span class="text-danger fw-bold">*</span>
            </label>
            <input type="password"
                   v-model="signupData.password"
                   @input="checkPassword()"
                   class="form-control"
                   :class="{ 'border-danger': !isValid && !signupData.password || !matchPasswords}"/>
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">
              Confirm Password <span class="text-danger fw-bold">*</span>
            </label>
            <input type="password"
                   v-model="signupData.confirmPassword"
                   @input="checkPassword()"
                   class="form-control"
                   :class="{ 'border-danger': !isValid && !signupData.confirmPassword || !matchPasswords}"/>
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-outline-success">Register</button>
            <span> Already have account ? <router-link to="/login" class="link-info ">Login</router-link></span>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="container" v-if="activation">
    <div class="row align-items-center justify-content-center">
      <div class="col-md-6">
        <hr/>
        <form @submit.prevent="activateUser()">
          <div class="mb-3">
            <label for="activationCode" class="form-label">Activation Code</label>
            <input type="text" v-model="activationData.code" class="form-control" id="activationCode"
                   name="activationCode">
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-outline-success">Activate</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {AuthService} from "@/services/AuthService";

export default {
  name: 'Signup',
  components: {AuthService},
  data() {
    return {
      isValid: true,
      matchPasswords: true,
      errorMessage: null,
      signupData: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      activationData: {
        userId: null,
        code: null,
      },
      activation: false,
    }
  },
  methods: {
    async activateUser() {
      try {
        console.log(this.activationData)
        const response = await AuthService.activateUser(this.activationData);
        if (response) {
          this.$router.push('/login');
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkPassword() {
      if (this.signupData.password === this.signupData.confirmPassword) {
        this.matchPasswords = true;
      }
    },
    async createSignup() {
      if (!this.signupData ||
          !this.signupData.fullName ||
          !this.signupData.email ||
          !this.signupData.password ||
          !this.signupData.confirmPassword) {
        this.isValid = false;
        return;
      }
      if (this.signupData.password !== this.signupData.confirmPassword) {
        this.matchPasswords = false;
        return;
      }
      try {
        const response = await AuthService.register(this.signupData);
        if (response) {
          this.activationData.userId = response.data.id;
          this.activation = true;
        }
        console.log(response)
      } catch (error) {
        this.errorMessage = error.response.data.error.errorMessage;
        console.log(error)
      }
    }
  }
}

</script>

<style>

</style>