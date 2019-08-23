<template>
    <div class="contacts">
        <div class="topBar">
            <span class="title">Contacts</span>
        </div>
        <div class="favourite-contacts">
            <span class="contact-type">Favorite Contacts</span>
            <router-link
                class="contact"
                tag="div"
                v-for="(contact, index) in favouriteContacts"
                :to="`contact/${contact.id}`"
                :key="`f${index}`"
            >
                <div class="row">
                    <div class="contact-image">
                        <img
                            :src="contact.smallImageURL"
                            @error="imgPlaceholder"
                        />
                    </div>
                    <div class="contact-details">
                        <span class="contact-name is-favourite">{{
                            contact.name
                        }}</span>
                        <span
                            class="contact-company"
                            v-if="contact.companyName"
                            >{{ contact.companyName }}</span
                        >
                    </div>
                </div>
                <hr />
            </router-link>
        </div>
        <div class="other-contacts">
            <span class="contact-type">Other Contacts</span>
            <router-link
                class="contact"
                tag="div"
                v-for="(contact, index) in otherContacts"
                :to="`contact/${contact.id}`"
                :key="`o${index}`"
            >
                <div class="row">
                    <div class="contact-image">
                        <img
                            :src="contact.smallImageURL"
                            @error="imgPlaceholder"
                        />
                    </div>
                    <div class="contact-details">
                        <span class="contact-name">{{ contact.name }}</span>
                        <span class="contact-company">{{
                            contact.companyName
                        }}</span>
                    </div>
                </div>
                <hr />
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contacts',
    data() {
        return {
            placeHolderImage: require('../assets/UserSmall/User Icon Small@2x.png'),
            starImage: {
                true: require('../assets/Favorite Star (True)/Favorite — True.png'),
                false: require('../assets/Favorite Star (False)/Favorite — False.png')
            }
        };
    },
    computed: {
        favouriteContacts() {
            return this.$store.getters.getFavouriteContacts;
        },
        otherContacts() {
            return this.$store.getters.getOtherContacts;
        }
    },
    methods: {
        // Set placeholder image in case one fails.
        imgPlaceholder(e) {
            e.target.src = this.placeHolderImage;
        }
    },
    mounted() {
        this.$store.dispatch('getContacts');
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.contacts {
    display: flex;
    flex-direction: column;
    .topBar {
        .title {
            font-size: 21px;
            font-weight: bold;
        }
    }
    .favourite-contacts {
        .contact:last-child hr {
            display: none;
        }
    }
    .contact-type {
        background: #f1f1f1;
        display: block;
        font-size: 12px;
        font-weight: 600;
        padding: 10px 20px;
        text-transform: uppercase;
        text-align: left;
    }
    .contact {
        margin: 20px;

        .contact-details {
            display: flex;
            flex-direction: column;
            margin-left: 50px;
            position: relative;
            text-align: left;
            width: 100%;
        }
        .contact-name {
            font-weight: 600;
            font-size: 20px;
            &.is-favourite {
                &::before {
                    content: '\2B50';
                    margin-left: -30px;
                    margin-top: -3px;
                    position: absolute;
                }
            }
        }
        .contact-company {
            color: #a2a2a2;
            text-align: left;
        }
        .contact-image {
            img {
                max-width: 90px;
            }
        }
    }
}
</style>
