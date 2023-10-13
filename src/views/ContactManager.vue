<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">
          Contact Manager
          <router-link to="/contacts/add" class="btn btn-success btn-sm">
            <i class="fa fa-plus-circle"></i> New
          </router-link>
        </p>
        <p class="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae delectus dolore dolorem
          eligendi itaque iure
          rem rerum sit? A aliquam, cumque ducimus laboriosam molestias necessitatibus qui recusandae repudiandae
          tempore velit?</p>
        <form>
          <div class="row">
            <div class="col-md-3">
              <div class="row">
                <div class="col">
                  <input type="text"
                         v-model="search"
                         class="form-control"
                         placeholder="🔍 Search "
                         @input="sortBySearch()"/>
                </div>
              </div>
            </div>
          </div>
        </form>
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

  <div class="container mt-3" v-if="contacts && contacts.length > 0">
    <div class="row">
      <div class="col-md-6 col-sm-12 col-lg-6" v-for="contact of elements" :key="contact">
        <div class="card my-2 list-group-item-success  shadow-lg">
          <div class="card-body ">
            <div class="row align-items-center">
              <div class="col-sm-4">
                <img :src="contact.photoUrl" class="contact-img" alt="">
              </div>
              <div class="col-sm-7">
                <ul class="list-group">
                  <li class="list-group-item">Name: <span class="fw-bold">{{ contact.name }}</span></li>
                  <li class="list-group-item">Email: <span class="fw-bold">{{ contact.email }}</span></li>
                  <li class="list-group-item">Mobile: <span class="fw-bold">{{ contact.mobile }}</span></li>
                </ul>
              </div>
              <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                <router-link :to="`/contacts/view/${contact.id}`" class="btn btn-primary my-1">
                  <i class="fa fa-eye"/>
                </router-link>
                <router-link :to="`/contacts/edit/${contact.id}`" class="btn btn-warning my-1">
                  <i class="fa fa-pen"/>
                </router-link>
                <button type="button"
                        class="btn btn-danger my-1"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteContact"
                        @click="setDeleteContactId(contact.id)">
                  <i class="fa fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="deleteContact">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete contact</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import {ContactService} from "@/services/ContactService";

export default {
  name: 'ContactManager',
  components: {Spinner},
  data() {
    return {
      delete_contact: null,
      search: null,
      loading: false,
      contacts: [],
      elements: [],
      errorMessage: null,
    }
  },
  async created() {
    await this.loadData();
  },
  methods: {
    setDeleteContactId(contactId) {
      this.delete_contact = this.contacts.filter((contact) => {
        return contact.id === contactId
      });

    },
    sortBySearch() {
      if (this.search) {
        this.elements = this.contacts.filter((contact) => {
          return contact.name.toLowerCase().includes(this.search.toLowerCase()) ||
              contact.mobile.toLowerCase().includes(this.search.toLowerCase())
        });
      } else {
        this.loadData();
        this.elements = this.contacts;
      }
    },
    async deleteContact(id) {
      const response = await ContactService.deleteContact(id);
      if (response.success) {
        await this.loadData();
      }
    },
    async loadData() {
      try {
        this.loading = true;
        const iData = await ContactService.getAllContacts();
        this.contacts = iData.data.data;
        this.elements = this.contacts;
        this.loading = false;
      } catch (err) {
        this.errorMessage = err;
        this.loading = false;
      }
    }
  }
}
</script>

<style>

</style>