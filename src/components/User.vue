<template>
    <div class="container">
        <div class="row" >
            <div class="col-3" >
                <BarMenu />
            </div>
            <div class="col-9 col-md-9 col-xs-9" style="margin-top: 7rem">
                <b-form method="POST" @submit.prevent="changeUser" style="height: 50rem; width: 53.5rem; background-color:#4d8dff; border-radius:20% 50% / 15% 30%">
                    <div v-if="me">
                        <div class="row" v-if="!me.verified">
                        <div class="col-11 input__group" >
                            <label class="mylabel" style="padding-top: 5rem;padding-left: 5rem;padding-right: 5rem;">
                                Подтвердите Ваш аккаунт. Вам на почту будет отправлен код, который необходимо ввести ниже для активации учетной записи.
                            </label>
                            <b-button
                                    @click="resendActivationEmail"
                                    class="mybutton"
                                    type="submit"
                                    style="margin-top:20rem;margin-left: 5rem; width: 15rem;height: 4.3rem; border-radius: 4px; position:absolute"
                            >
                                Отправить
                            </b-button>
                            <label class="mylabel" style="margin-top:25rem; padding-left: 5rem;">Пожалуйста, введите код с сообщения</label>
                            <b-input
                                        class="myinput1"
                                        type="text"
                                        placeholder=""
                                        style="margin-top:30rem; width: 38rem;margin-left: 5rem;"
                                        id="verifytoken"
                                        v-model="verifytoken"
                                >
                                </b-input>
                            <b-button
                                    @click="accountVerify"
                                    class="mybutton"
                                    type="submit"
                                    style="margin-top:36rem;margin-left: 5rem; width: 15rem;height: 4.3rem; border-radius: 4px; position:absolute"
                                >
                                Подтвердить
                                </b-button>
                            <div class="col-2"></div>
                        </div>
                        </div>
                        <div class="input__group" v-if="me.verified && me" style="padding:3rem;align-items: center">
                            <div class="input__group__label">
                                <label class="mylabel" style="padding-top: 1.6rem;" >Имя:</label>
                                <b-input
                                        class="myinput1"
                                        v-model="me.firstName"
                                        type="text"
                                        id="me.firstName"
                                        placeholder=""
                                        style="margin-top:4.8rem;"
                                        :readonly=false
                                >
                                </b-input>
                            </div>
                            <div class="input__group__label" v-if="me">
                                <label class="mylabel" style="padding-top: 9.6rem" >Фамилия:</label>
                                <b-input
                                        class="myinput1"
                                        v-model="me.lastName"
                                        type="text"
                                        id="me.lastName"
                                        placeholder=""
                                        style="margin-top:12.8rem;"
                                >
                                </b-input>
                            </div>
                            <div class="input__group__label" v-if="me">
                                <label class="mylabel" style="padding-top: 17.6rem">Логин:</label>
                                <b-input
                                        class="myinput1"
                                        v-model="me.username"
                                        type="text"
                                        id="me.username"
                                        style="margin-top:20.8rem;background-color: #6BA0FF; "
                                        :readonly=true
                                >
                                </b-input>
                            </div>
                            <div class="input__group__label" v-if="me">
                                <label class="mylabel" style="padding-top: 25.6rem">Почта:</label>
                                <b-input
                                        class="myinput1"
                                        v-model="me.email"
                                        type="text"
                                        id="me.email"
                                        style="margin-top:28.8rem;background-color: #6BA0FF;"
                                        :readonly=true
                                >
                                </b-input>
                            </div>
                            <div class="input__group__label" v-if="me">
                                <label  style="padding-top: 35.6rem;"><router-link to="/Login/User/ChangePassword" class="mylabel_1">Сменить пароль</router-link></label>
                            </div>
                            <b-button
                                    class="mybutton"
                                    variant="primary"
                                    type="submit"
                                    style="width: 15rem;height: 4.3rem; margin-top: 1.6rem;margin-left:30rem; border-radius: 4px; position:absolute"
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
    import { ME_QUERY } from '../queries'
    import { REFRESHTOKEN_MUTATION,UPDATEACCOUNT_MUTATION,VERIFYACCOUNT_MUTATION, RESENDACTIVATIONEMAIL_MUTATION } from "../mutations";
    import BarMenu from './parts/BarMenu'
    export default {
        name: 'User',
        components:{BarMenu},
        data () {
            return {
                me:'false',
                verified:'false',
                verifytoken: '',
                refreshToken:localStorage.getItem('refreshToken').toString()
            }
        },
        apollo: {
            me: {
                query: ME_QUERY,
            },
        },
        methods:{
            resendActivationEmail() {
                this.$apollo
                    .mutate({
                        mutation: RESENDACTIVATIONEMAIL_MUTATION,
                        variables: {
                            email: this.me.email,
                        }
                    })
                    .then(data => {
                        if(data.data.resendActivationEmail.success){
                            alert("Код успешно отправлен");
                        }
                        else{
                            alert(data.data.resendActivationEmail.errors)
                        }
                    })
            },
            accountVerify() {
                this.$apollo
                    .mutate({
                        mutation: VERIFYACCOUNT_MUTATION,
                        variables: {
                            token: this.verifytoken,
                        }
                    })
                    .then(data => {
                        if(data.data.verifyAccount.success){
                            alert("Ваш аккаунт успешно подтвержден")
                            this.$apollo.queries.me.refresh();
                            this.verified = this.me.verified;
                        }
                        else{
                            alert(data.data.accountVerify.errors)
                        }
                    })
            },
            changeUser () {
                this.$apollo
                    .mutate({
                        mutation: UPDATEACCOUNT_MUTATION,
                        variables: {
                            lastName: this.me.lastName,
                            firstName: this.me.firstName
                        }
                    })
                    .then(data => {
                        if(data.data.updateAccount.success){
                            this.$apollo.queries.me.refresh();
                            this.status = true
                        }
                    })
            },
            changeToken(){
                this.$apollo
                .mutate({
                    mutation: REFRESHTOKEN_MUTATION,
                    variables: {
                        refreshToken: this.refreshToken
                    }
                })
                    .then(data => {
                            localStorage.setItem('token',data.data.refreshToken.token)
                            localStorage.setItem('refreshToken',data.data.refreshToken.refreshToken)
                            this.$apollo.queries.me.refresh();

                    })
            },

        },
        watch:{
            me: function(){
                    if(localStorage.getItem('auth') && this.me === null){
                        this.$forceUpdate();
                        return this.changeToken();
                    }
            },
        },
    }
</script>
<style>
    .myinput1{
        position: absolute;
        background-color: #6BA0FF;
        margin-left: 2.6rem;
        color:#FFFFFF;
        border-color: #6BA0FF;
        border-radius: 8px;
        width: 40rem;
        height: 4.4rem;
        font-size: 1.6rem;
        font-weight: bold;
    }

    .mybutton{
        font-size: 1.9rem;
        font-weight: bold;
        background: white;
        color:#173A56;
        height: 2.4em;
        border-color: #BCD0E5;
        padding-left: .6em;
        padding-right: .6em;
        border-radius: 4px;
    }
    .mybutton:hover{
        color:#173A56;
        border-color: #BCD0E5;
        background: #BCD0E5;
    }
    .mybutton:active,.mybutton:focus{
        color:#173A56;
        border-color: #bcd0e5;
        background: #9fcaf6;
    }
    .mylabel{
        font-size: 2.2rem;
        font-weight: bold;
    }
    .mylabel_1{
        text-decoration: none;
        position: absolute;
        padding-left: 2.6rem;
        font-size: 2.2rem;
        font-weight: bold;
        color: #FFFFFF;
        padding-top: 0;
        margin-top: 0;
    }
    .mylabel_1:hover{
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
