<template>
    <div class="container">
        <div class="single-contact">
            <div class="topBar">
                <div class="row separated">
                    <router-link class="go-back" tag="a" to="/"
                        >Contacts</router-link
                    >
                    <img
                        :src="
                            contact.isFavorite
                                ? starImage.true
                                : starImage.false
                        "
                        v-on:click="favorite"
                    />
                </div>
            </div>
            <div class="contact">
                <div class="column">
                    <div class="contact-image">
                        <img
                            :src="contact.largeImageURL"
                            @error="imgPlaceholder"
                        />
                    </div>
                    <span class="contact-name" v-if="contact.name">
                        {{ contact.name }}
                    </span>
                    <span class="contact-company" v-if="contact.companyName">
                        {{ contact.companyName }}
                    </span>
                </div>
                <hr />
                <div class="column" v-if="contact.phone.home">
                    <div class="row">
                        <div class="column">
                            <span class="section-title">Phone:</span>
                            <div class="row separated">
                                <span class="contact-phone">
                                    {{ contact.phone.home | formatPhone }}
                                </span>
                                <span class="contact-phone-type">Home</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div class="column" v-if="contact.phone.mobile">
                    <div class="row">
                        <div class="column">
                            <span class="section-title">Phone:</span>
                            <div class="row separated">
                                <span class="contact-phone">
                                    {{ contact.phone.mobile | formatPhone }}
                                </span>
                                <span class="contact-phone-type">Mobile</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div class="column" v-if="contact.phone.work">
                    <div class="row">
                        <div class="column">
                            <span class="section-title">Phone:</span>
                            <div class="row separated">
                                <span class="contact-phone">
                                    {{ contact.phone.work | formatPhone }}
                                </span>
                                <span class="contact-phone-type">Work</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div class="column address" v-if="contact.address">
                    <span class="section-title">Address:</span>
                    <div class="contact-address">
                        <span>{{ contact.address.street }}</span>
                        <span>
                            {{ contact.address.city }},
                            {{ contact.address.state }}
                            {{ contact.address.zipCode }},
                            {{ contact.address.country }}
                        </span>
                    </div>
                    <hr />
                </div>
                <div class="column birthdate" v-if="contact.birthdate">
                    <span class="section-title">Birthdate:</span>
                    <span class="contact-birthday">
                        {{ contact.birthdate | formatDate }}
                    </span>
                    <hr />
                </div>
                <div class="column email" v-if="contact.emailAddress">
                    <span class="section-title">Email:</span>
                    <span class="contact-email">
                        {{ contact.emailAddress }}
                    </span>
                    <hr />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'contact',
    data() {
        return {
            placeHolderImage: require('../assets/User Large/User — Large@2x.png'),
            starImage: {
                true: require('../assets/Favorite Star (True)/Favorite — True.png'),
                false: require('../assets/Favorite Star (False)/Favorite — False.png')
            }
        };
    },
    computed: {
        contact() {
            return this.$store.getters.getContactById(this.$route.params.id);
        }
    },
    methods: {
        // Set placeholder image in case one fails.
        imgPlaceholder(e) {
            e.target.src = this.placeHolderImage;
        },
        // Toggle Favourite.
        favorite() {
            this.$store.commit('favouritize', this.$route.params.id);
            // Add vibration feedback on Android phones.
            window.navigator.vibrate(100);
        }
    },
    filters: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MMMM d, YYYY');
            }
        },
        formatPhone(phone) {
            return phone
                .replace(/[^0-9]/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
    },
    mounted() {
        this.$store.dispatch('getContacts');
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.go-back {
    color: #489bd3;
    font-size: 21px;
    font-weight: bold;
    margin-left: 14px;
    position: relative;
    padding-left: 5px;
    text-decoration: none;
    &::before {
        content: '\2039';
        font-size: 50px;
        line-height: 18px;
        position: absolute;
        left: -15px;
        margin-top: -1px;
    }
}
.contact {
    background: white;
    display: flex;
    flex-direction: column;
    padding: 15px 20px 0;
    .section-title {
        text-transform: uppercase;
        text-align: left;
        color: #cecece;
        font-weight: 600;
    }
    .contact-image {
        margin: auto;
        padding: 10px;
        max-width: 200px;
        img {
            min-width: 160px;
            width: 100%;
        }
    }
    .contact-name {
        font-weight: 600;
        font-size: 28px;
    }
    .contact-company {
        color: #a2a2a2;
        font-size: 18px;
    }

    .contact-phone-type {
        color: #9e9e9e;
        font-weight: 500;
        font-size: 16px;
    }

    .contact-address,
    .contact-phone,
    .contact-birthday,
    .contact-email {
        font-size: 18px;
        font-weight: bold;
        padding: 10px 0;
        text-align: left;
    }

    .contact-address {
        span {
            display: block;
        }
    }
}
</style>
