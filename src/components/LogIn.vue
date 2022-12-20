<template>
    <div class="container">
        <div class="row">
            <div class="block__1 col-lg-6 col-md-12 col-xs-12 ">
                <b-form method="POST" @submit.prevent="login" class="form" style="height: 33.7rem; width: 44.6rem; margin-right: auto; margin-left: auto">
                    <div class="input__group">
                        <div class="input__group__label">
                            <label class="mylabel"  style="padding-top: 2.6rem">Логин:</label>
                            <b-input
                                    class="myinput"
                                    v-model="username"
                                    type="text"
                                    id="username"
                                    placeholder="Ivanivanov"
                                    autocomplete="on"
                                    style="width: 39.5rem;border-radius: 8px;margin-top:5.6rem;"
                            >
                            </b-input>
                        </div>
                        <div class="input__group__label">
                            <label class="mylabel"  style="margin-top:9.6rem;">Пароль:</label>
                            <b-input
                                    class="myinput"
                                    v-model="password"
                                    type="password"
                                    autocomplete="on"
                                    id="password"
                                    placeholder="******"
                                    style="width: 39.5rem;border-radius: 8px;margin-top:12.6rem;"
                            ></b-input>
                        </div>
                        <div class="mybutton__1">
                            <b-button
                                    class="mybutton"
                                    variant="primary"
                                    type="submit"
                                    style="width: 12rem;height: 4.4rem; margin-top: 18.6rem;border-radius: 4px;"
                            >Войти
                            </b-button>
                        </div>
                        <div class="row">
                            <p class="label__1" style="margin-top:1.6rem;">Ещё не зарегистрированы? </p>
                            <label @click="$router.push('/SignUp')" class="label__2" style="padding-left: 3.3rem;transition: all 1.2s ease;margin-top:1.6rem;">Регистрация</label>
                        </div>
                    </div>
                </b-form>
            </div>
            <div class="block__2 col-lg-6 col-md-12 col-xs-12 text-center" >
                <img src="./assest_components/amico1.png" style="height: 38.5rem;width: 54.1rem;"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {LOGIN_MUTATION} from '../mutations';

    export default {
        name: 'LogIn',
        data () {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            async login () {
                this.$apollo
                    .mutate({
                        mutation: LOGIN_MUTATION,
                        variables: {
                            username: this.username,
                            password: this.password,
                        }
                    })
                    .then(data => {
                        if (!data.data.tokenAuth.success){
                            alert("Неверные данные")
                            localStorage.setItem('auth', false)
                        }else{
                            localStorage.setItem('token', data.data.tokenAuth.token)
                            localStorage.setItem('refreshToken', data.data.tokenAuth.refreshToken)
                            localStorage.setItem('auth', true)
                            this.$router.replace('/LogIn/Menu').catch(()=>{})
                        }
                    })
                    .catch(error =>{
                        alert("Ошибка "+error)
                    })
            },
        },

    }
</script>

<style scoped>
    .myinput, .mybutton{
        font-size: 1.8rem;
        font-weight: bold;
    }

    .mybutton{
        background: white;
        color:#173A56;
        height: 2.4em;
        border-color: #BCD0E5;
        padding-left: .6em;
        padding-right: .6em;
        transition: all 1.2s ease;
        border-radius: 4px;
        font-weight: bold;
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
</style>