import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        contacts: [],
        jsonUrl: 'https://s3.amazonaws.com/technical-challenge/v3/contacts.json'
    },
    mutations: {
        // Get the contacts and sort them alphabetically
        setContacts(state, payload) {
            state.contacts = payload.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        },
        // Toggle Contact as Favourite
        favouritize(state, id) {
            const index = state.contacts.findIndex(
                contact => contact.id === id
            );
            state.contacts[index].isFavorite = !state.contacts[index]
                .isFavorite;
        }
    },
    actions: {
        async getContacts({ state, commit }) {
            if (state.contacts.length == 0) {
                try {
                    const { data } = await axios.get(`${state.jsonUrl}`);
                    commit('setContacts', data);
                } catch (error) {
                    commit('setContacts', []);
                }
            }
        }
    },
    getters: {
        getContactById: state => id => {
            return state.contacts.find(contact => contact.id === id);
        },
        getFavouriteContacts: state => {
            return state.contacts.filter(contact => contact.isFavorite);
        },
        getOtherContacts: state => {
            return state.contacts.filter(contact => !contact.isFavorite);
        }
    }
});
