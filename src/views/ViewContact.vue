<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">View Contact</p>
        <p class="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam dolor dolore
          doloremque dolores ea eaque enim ipsum iste itaque laborum magni mollitia nemo optio, placeat provident vero!
          Itaque, labore.</p>
      </div>
    </div>
  </div>

  <!--  Spinner-->
  <div class="loading" v-if="loading">
    <Spinner/>
  </div>
  <!--ErrorMessage-->
  <div class="container" v-if="!loading && errorMessage">
    <div class="row mt-3">
      <div class="col">
        <p class="h4 text-danger text-center fw-bold">{{ errorMessage }}</p>
      </div>
    </div>
  </div>

  <div class="container mt-3" v-if="!loading && isDone()">
    <div class="row align-items-center">
      <div class="col-md-4 ">
        <img :src="contact.photoUrl" class="contact-img-big" alt="">
      </div>
      <div class="col-md-6">
        <ul class="list-group">
          <li class="list-group-item">Name: <span class="fw-bold">{{ contact.name }}</span></li>
          <li class="list-group-item">Email: <span class="fw-bold">{{ contact.email }}</span></li>
          <li class="list-group-item">Mobile: <span class="fw-bold">{{ contact.mobile }}</span></li>
          <li class="list-group-item">Company: <span class="fw-bold">{{ contact.company }}</span></li>
          <li class="list-group-item">Title: <span class="fw-bold">{{ contact.title }}</span></li>
          <li class="list-group-item">Group: <span class="fw-bold">{{ group.name }}</span></li>
        </ul>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <router-link to="/" class="btn btn-success">
          <i class="fa fa-arrow-alt-circle-left"/> Back
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {ContactService} from "@/services/ContactService";
import Spinner from "@/components/Spinner";

export default {
  name: 'ViewContact',
  components: {Spinner},
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      contact: {},
      group: {},
      errorMessage: null,
    }
  },
  async created() {
    try {
      this.loading = true;
      const response = await ContactService.getContactById(this.id);
      this.contact = response.data.data;
      const groupResponse = await ContactService.getGroupById(this.contact.groupId);
      this.group = groupResponse.data.data;
      this.loading = false;
    } catch (error) {
      this.errorMessage = error;
      this.loading = false;
    }
  },
  methods: {
    isDone() {
      return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
    }
  }
}
</script>

<style scoped>

</style>