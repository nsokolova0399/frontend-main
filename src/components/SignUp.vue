<template>
    <div class="container">
        <div class="row">
            <div class="block__1 col-lg-6 col-md-12 col-xs-12 ">
                <b-form method="POST" @submit.prevent="signup" class="form" style="margin-top:-5rem;height: 50.6rem; width: 44.6rem; margin-right: auto; margin-left: auto">
                    <div class="input__group">
                        <span class="input__group__label">
                            <div class="mylabel" for="username" style="padding-top: 2.6rem">Логин:</div>
                            <b-input
                                    class="myinput"
                                    :class="{invalid: $v.username.$dirty && !$v.username.required}"
                                    v-model="username"
                                    type="text"
                                    id="username"
                                    style="width: 39.5rem; border-radius: 8px;margin-top:5.6rem;"
                                    placeholder="Ivanivanov">
                            </b-input>
                            <label class="mylabel1" v-if="$v.username.$dirty && !$v.username.required" style="margin-top:9.6rem;">Логин не должен быть пустым</label>
                        </span>
                        <span class="input__group__label">
                            <div class="mylabel" for="email" style="margin-top:11.6rem;">Почта:</div>
                            <b-input
                                    class="myinput"
                                    :class="{invalid: ($v.email.$dirty && !$v.email.required) && ($v.email.$dirty && !$v.email.email)}"
                                    v-model.trim="email"
                                    type="text"
                                    id="email"
                                    style="width: 39.5rem;border-radius: 8px;margin-top:14.6rem;"
                                    placeholder="ivanov@mail.ru">
                            </b-input>
                            <label class="mylabel1" v-if="$v.email.$dirty && !$v.email.required" style="margin-top:18.6rem;">Почта не должен быть пустым</label>
                            <label class="mylabel1" v-else-if="$v.email.$dirty && !$v.email.email" style="margin-top:18.6rem;">Введите корректную Почту</label>
                        </span>
                        <span class="input__group__label">
                            <div class="mylabel" for="password1" style="margin-top:20.6rem;">Пароль:</div>
                            <b-input
                                    class="myinput"
                                    :class="{invalid: ($v.password1.$dirty && !$v.password1.required) || ($v.password1.$dirty && !$v.password1.minLength)}"
                                    v-model="password1"
                                    type="password"
                                    id="password1"
                                    style="width: 39.5rem;border-radius: 8px;margin-top:23.6rem;"
                                    placeholder="******">
                            </b-input>
                            <label class="mylabel1" v-if="$v.password1.$dirty && !$v.password1.required" style="margin-top:27.6rem;">Введите пароль</label>
                            <label class="mylabel1" v-else-if="$v.password1.$dirty && !$v.password1.minLength" style="margin-top:27.6rem;">
                                Пароль должен быть минимум {{$v.password1.$params.minLength.min}} символов.
                            </label>

                        </span>
                        <span class="input__group__label">
                            <div class="mylabel"  for="password2" style="margin-top:29.6rem;">Повторите пароль:</div>
                            <b-input
                                    class="myinput"
                                    :class="{invalid: ($v.password1.$dirty && !$v.password1.minLength) ||($v.password2.$dirty && !$v.password2.minLength)}"
                                    v-model="password2"
                                    type="password"
                                    id="password2"
                                    style="width: 39.5rem;border-radius: 8px;margin-top:32.6rem;"
                                    placeholder="******">
                            </b-input>
                            <label class="mylabel1" v-if="($v.password1.$model !== $v.password2.$model)" style="margin-top:36.6rem;">
                                Пароли не совпадают
                            </label>
                        </span>
                    </div>
                    <div class="row mybutton__1 center" style="position: absolute;bottom: 5rem; left:37%" >
                        <b-button
                                type="submit"
                                class="mybutton"
                                style="width: 17rem;height: 4.4rem; border-radius: 4px;margin-top:20rem;"
                        >
                            Регистрация
                        </b-button>

                    </div>
                    <div class="row" style="position: absolute;bottom: 0">
                        <p class="label__1">Уже есть аккаунт?</p>
                        <label @click="$router.push('/LogIn')" class="label__2" style="padding-left: 13rem;transition: all 1.2s ease; ">Войти</label>
                    </div>
                </b-form>

            </div>
            <div class="block__2 col-lg-6 col-md-12 col-xs-12 text-center" >
                <img src="./assest_components/amico3.png" style="height: 40.2rem;width: 53.3rem;"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { SIGNUP_MUTATION } from '../mutations';
    import { email,required,minLength } from 'vuelidate/lib/validators';
    export default {
        name: 'SignUp',
        data () {
            return {
                username: '',
                email: '',
                password1: '',
                password2: '',
            }
        },
        validations:{
            username:{required},
            email:{email,required},
            password1: {required, minLength:minLength(8)},
            password2: {required, minLength:minLength(8)},
        },
        methods: {
            signup() {
                    this.$apollo
                        .mutate({
                            mutation: SIGNUP_MUTATION,
                            variables: {
                                email: this.email,
                                username: this.username,
                                password1: this.password1,
                                password2: this.password2,
                            },
                        })
                        .then((data) => {
                            if (this.$v.$invalid) {
                                this.$v.$touch()
                                return
                            }
                            if (data.data.register.errors == null){
                                this.$router.replace('/LogIn');
                            }
                            else{
                                alert('Пользователь уже зарегистрирован');
                            }
                        })
                        .catch((error)=>{
                            alert('Ошибка ' + error);
                        })

            },
        }
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
        padding-left: .9em;
        padding-right: .9em;
        transition: all 1.1s ease;
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