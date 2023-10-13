import axios from "../axios";

export class ContactService {
    // static baseUrl = `http://localhost:9090`;
    static contactsUrl = `/contacts`
    static groupsUrl = `/groups`

    static async getAllContacts() {
        return axios.get(`${this.contactsUrl}/all`);
    }

    static getContactById(id) {
        return axios.get(`${this.contactsUrl}/${id}`);
    }

    static createContact(contact) {
        if (!contact.photoUrl) {
            contact.photoUrl = "https://www.w3schools.com/howto/img_avatar.png";
        }
        return axios.post(`${this.contactsUrl}/create`, contact);
    }

    static updateContact(id, contact) {
        return axios.put(`${this.contactsUrl}/update/${id}`, contact);
    }

    static deleteContact(id) {
        return axios.delete(`${this.contactsUrl}/delete/${id}`);
    }

    static getAllGroups() {
        return axios.get(`${this.groupsUrl}/all`);
    }

    static getGroupById(id) {
        return axios.get(`${this.groupsUrl}/${id}`);
    }

    static createGroup(group) {
        return axios.post(`${this.groupsUrl}/create`, group);
    }

    static updateGroup(id, group) {
        return axios.put(`${this.groupsUrl}/update/${id}`, group);
    }

    static deleteGroup(id) {
        return axios.delete(`${this.groupsUrl}/delete/${id}`);
    }

}