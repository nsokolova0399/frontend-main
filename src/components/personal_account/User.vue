<template>
    <div class="container">
        <div class="row">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-12 col-md-12 col-xs-12 userBlockForm">
                <b-form method="POST" @submit.prevent="changeUser" class="userForm">
                    <div v-if="me">
                        <div class="row" v-if="!me.verified">
                            <div class="col-11 input__group" style="padding-top: 5rem">
                                <label class="mylabel"
                                       style="padding-left: 5rem;padding-right: 5rem;">
                                    Пожалуйста, подтвердите регистрацию. Вам на почту будет отправлено письмо с ссылкой для подтверждения регистрации.
                                </label>
                                <b-button
                                        @click="resendActivationEmail"
                                        class="mybutton"
                                        type="submit"
                                        style="margin-left: 5rem; width: 15rem;height: 4.3rem; border-radius: 4px;"
                                >
                                    Отправить
                                </b-button>
                                <div class="col-2"></div>
                            </div>
                        </div>
                        <div class="input__group" v-if="me.verified && me" style="padding-left:3rem; padding-right:3rem;align-items: center">
                            <div class="input__group__label">
                                <label class="mylabel" style="padding-top: 4rem">Имя:</label>
                                <b-input
                                        class="myinput1"
                                        v-model="me.firstName"
                                        type="text"
                                        id="me.firstName"
                                        placeholder=""
                                        :readonly=false
                                >
                                </b-input>
                            </div>
                            <div class="input__group__label" v-if="me">
                                <label class="mylabel">Фамилия:</label>
                                <b-input
                                        class="myinput1"
                                        v-model="me.lastName"
                                        type="text"
                                        id="me.lastName"
                                        placeholder=""
                                >
                                </b-input>
                            </div>
                            <div class="input__group__label" v-if="me">
                                <label class="mylabel">Логин:</label>
                                <b-input
                                        class="myinput1"
                                        v-model="me.username"
                                        type="text"
                                        id="me.username"
                                        style="background-color: #6BA0FF; "
                                        :readonly=true
                                >
                                </b-input>
                            </div>
                            <div class="input__group__label" v-if="me">
                                <label class="mylabel">Почта:</label>
                                <b-input
                                        class="myinput1"
                                        v-model="me.email"
                                        type="text"
                                        id="me.email"
                                        style="background-color: #6BA0FF;"
                                        :readonly=true
                                >
                                </b-input>
                            </div>
                            <div class="input__group__label" v-if="me">
                                <label>
                                    <router-link
                                            class="mylabel_1"
                                            :to="{name:'ChangePass'}"

                                    >Сменить пароль
                                    </router-link>
                                </label>
                            </div>
                            <b-button
                                    class="btnLight mybutton"
                                    variant="primary"
                                    type="submit"
                                    style="width: 15rem;height: 4.3rem;margin-left:27rem; border-radius: 4px; position:absolute"
                            >Сохранить
                            </b-button>
                        </div>
                    </div>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {ME_QUERY} from "../../queries";
    import {
        UPDATEACCOUNT_MUTATION,
        RESENDACTIVATIONEMAIL_MUTATION
    } from "../../mutations";

    export default {
        name: 'User',
        data() {
            return {
                me:null,
                verified: 'false',
                verifytoken: '',
                refreshToken: localStorage.getItem('refreshToken').toString()
            }
        },
        apollo: {
            me: {
                query: ME_QUERY
            },
        },
        created(){
            this.$apollo.queries.me;
        },
        methods: {
        resendActivationEmail() {
            this.$apollo
                .mutate({
                    mutation: RESENDACTIVATIONEMAIL_MUTATION,
                    variables: {
                        email: this.me.email,
                    }
                })
                .then(data => {
                    if (data.data.resendActivationEmail.success) {
                        this.$notify({
                            type: 'success',
                            title: 'Успешное выполнение.',
                            text: 'Вам на почту отправлено письмо. Пожалуйста, подтвердите регистрацию.'
                        });
                    } else {
                        this.$notify({
                            type: 'error',
                            title: 'Ошибка.',
                            text: data.data.resendActivationEmail.errors
                        });
                    }
                })
        },
        changeUser() {
            this.$apollo
                .mutate({
                    mutation: UPDATEACCOUNT_MUTATION,
                    variables: {
                        lastName: this.me.lastName,
                        firstName: this.me.firstName
                    }
                })
                .then(data => {
                    if (data.data.updateAccount.success) {
                        //this.$apollo.queries.me.refresh();
                        this.status = true
                        this.$notify({
                            type: 'success',
                            title: 'Успешное выполнение.',
                            text: 'Данные успешно изменены и сохранены.'
                        });
                    }
                })
        },
    },

    }
</script>
<style>
    .userBlockForm{
        margin-top: 4rem;
        margin-bottom: 3rem;
    }
    .myinput1 {
        position: relative;
        background-color: #6BA0FF;
        margin-left: 2.6rem;
        color: #FFFFFF;
        border-color: #6BA0FF;
        border-radius: 8px;
        width: 40rem;
        height: 4.4rem;
        font-size: 1.6rem;
        font-weight: bold;
    }

    .mybutton {
        font-size: 1.9rem;
        font-weight: bold;
        background: white;
        color: #173A56;
        height: 2.4em;
        border-color: #BCD0E5;
        padding-left: .6em;
        padding-right: .6em;
        border-radius: 4px;
    }

    .mybutton:hover {
        color: #173A56;
        border-color: #BCD0E5;
        background: #BCD0E5;
    }

    .mybutton:active, .mybutton:focus {
        color: #173A56;
        border-color: #bcd0e5;
        background: #9fcaf6;
    }

    .mylabel {
        font-size: 2.2rem;
        font-weight: bold;
        position: relative;
    }

    .mylabel_1 {
        text-decoration: none;
        position: absolute;
        padding-left: 2.6rem;
        font-size: 2.2rem;
        font-weight: bold;
        color: #FFFFFF;
        margin-top: 0;
    }

    .mylabel_1:hover {
        text-decoration: none;
        position: absolute;
        padding-left: 2.6rem;
        font-size: 2.2rem;
        font-weight: bold;
        color: #173A56;
        padding-top: 0;
        margin-top: 0;
    }

</style>
