<template>
  <Navbar/>
  <router-view/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import {AuthService} from "@/services/AuthService";

export default {
  name: 'App',
  components: {Navbar},
  data() {
    return {
      go: true,
    }
  },
  methods: {},
  async created() {
  }
}
</script>

<style>

</style>
