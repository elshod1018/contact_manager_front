<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Add Contact</p>
        <p class="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores commodi,
          deserunt dignissimos eaque eligendi libero magnam maxime nam necessitatibus, omnis placeat quae quia quibusdam
          vitae voluptas voluptatem. Cupiditate, labore.</p>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <div class="row">
      <div class="col-md-12 text-center">
        <img :src="contact.photoUrl" v-if="contact.photoUrl" class="contact-img" alt="">
        <img :src="imgUrl" v-if="!contact.photoUrl" class="contact-img" alt="">
      </div>
      <div class="col-md-12">
        <form @submit.prevent="createContact()">
          <div class="row">
            <div class="col-md-4">
              <div class="mb-2">
                <label for="name" class="form-check-label">Name <span class="text-danger fw-bold">*</span></label>
                <input id="name"
                       v-model="contact.name"
                       type="text"
                       class="form-control"
                       :class="{'border-danger': !isValid && !contact.name}"
                       placeholder="Name">
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-2">
                <label for="photoUrl" class="form-check-label">Photo URL </label>
                <input id="photoUrl"
                       v-model="contact.photoUrl"
                       type="text"
                       class="form-control"
                       placeholder="Photo URL">
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-2">
                <label for="email" class="form-check-label">Email <span class="text-danger fw-bold">*</span></label>
                <input id="email"
                       v-model="contact.email"
                       type="text"
                       class="form-control"
                       :class="{'border-danger': !isValid && !contact.email}"
                       placeholder="Email">
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-2">
                <label for="mobile" class="form-check-label">Mobile <span class="text-danger fw-bold">*</span></label>
                <input id="mobile"
                       v-model="contact.mobile"
                       type="text"
                       class="form-control"
                       :class="{'border-danger': !isValid && !contact.mobile}"
                       placeholder="Mobile">
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-2">
                <label for="company" class="form-check-label">Company</label>
                <input id="company"
                       v-model="contact.company"
                       type="text"
                       class="form-control"
                       placeholder="Company">
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-2">
                <label for="title" class="form-check-label">Title</label>
                <input id="title"
                       v-model="contact.title"
                       type="text"
                       class="form-control"
                       placeholder="Title">
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-2">
                <label for="group" class="form-check-label">
                  Select group <span class="text-danger fw-bold">*</span>
                </label>
                <select id="group"
                        v-model="contact.groupId"
                        :class="{'border-danger': !isValid && contact.groupId < 1}"
                        class="form-control">
                  <option value="-1" disabled>Select group</option>
                  <option v-for="group of groups" :key="group.id" :value="group.id">{{ group.name }}</option>
                </select>
              </div>
            </div>

            <div class="col-md-4 mt-4  ">

            </div>

            <div class="col-md-4 mt-4">
              <div class="mb-2 ">
                <input type="submit" class="btn btn-success w-50" value="Create">
              </div>
            </div>

          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import {ContactService} from "@/services/ContactService";

export default {
  name: 'AddContact',
  data() {
    return {
      imgUrl: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
      contact: {
        name: '',
        photoUrl: '',
        email: '',
        mobile: '',
        company: '',
        title: '',
        groupId: -1,
      },
      isValid: true,
      groups: [],
    }
  },
  async created() {
    try {
      const response = await ContactService.getAllGroups();
      this.groups = response.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async createContact() {
      try {
        if (!this.contact ||
            !this.contact.name ||
            !this.contact.email ||
            !this.contact.mobile ||
            this.contact.groupId < 1
        ) {
          this.isValid = false;
          return;
        }
        const response = await ContactService.createContact(this.contact);
        if (response) {
          return this.$router.push('/');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>

</style>