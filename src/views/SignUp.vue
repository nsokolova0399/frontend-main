<template>
    <div class="container">
        <div class="row">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-lg-6 col-md-12 col-xs-12" style="padding-top: 9rem; padding-bottom: 2rem;">
                <b-form method="POST" @submit.prevent="signup" class="form"
                        style="margin-top:-5rem; margin-bottom:5rem;min-height: 45.6rem; width: 44.6rem; margin-right: auto; margin-left: auto">
                    <div class="input__group" style="padding-top: 2.6rem">
                        <span class="input__group__label">
                            <div class="mylabel" for="username">Логин:</div>
                            <b-input
                                    class="myinput"
                                    :class="{invalid: $v.username.$dirty && !$v.username.required}"
                                    v-model="username"
                                    type="text"
                                    id="username"
                                    style="width: 39.5rem; border-radius: 8px;"
                                    placeholder="Ivanivanov">
                            </b-input>
                            <label class="mylabel1" v-if="$v.username.$dirty && !$v.username.required">Логин не должен быть пустым</label>
                        </span>
                        <span class="input__group__label">
                            <div class="mylabel" for="email">Почта:</div>
                            <b-input
                                    class="myinput"
                                    :class="{invalid: ($v.email.$dirty && !$v.email.required) && ($v.email.$dirty && !$v.email.email)}"
                                    v-model.trim="email"
                                    type="text"
                                    id="email"
                                    style="width: 39.5rem;border-radius: 8px;"
                                    placeholder="ivanov@mail.ru">
                            </b-input>
                            <label class="mylabel1" v-if="$v.email.$dirty && !$v.email.required">Почта не должен быть пустым</label>
                            <label class="mylabel1" v-else-if="$v.email.$dirty && !$v.email.email">Введите корректную Почту</label>
                        </span>
                        <span class="input__group__label">
                            <div class="mylabel" for="password1">Пароль:</div>
                            <b-input
                                    class="myinput"
                                    :class="{invalid: ($v.password1.$dirty && !$v.password1.required) || ($v.password1.$dirty && !$v.password1.minLength)}"
                                    v-model="password1"
                                    type="password"
                                    id="password1"
                                    style="width: 39.5rem;border-radius: 8px;"
                                    placeholder="********">
                            </b-input>
                            <label class="mylabel1"
                                   v-if="$v.password1.$dirty && !$v.password1.required">Введите пароль</label>
                            <label class="mylabel1" v-else-if="$v.password1.$dirty && !$v.password1.minLength">
                                Пароль должен быть минимум {{$v.password1.$params.minLength.min}} символов.
                            </label>
                        </span>
                        <span class="input__group__label">
                            <div class="mylabel" for="password2">Повторите пароль:</div>
                            <b-input
                                    class="myinput"
                                    :class="{invalid: ($v.password1.$dirty && !$v.password1.minLength) ||($v.password2.$dirty && !$v.password2.minLength)}"
                                    v-model="password2"
                                    type="password"
                                    id="password2"
                                    style="width: 39.5rem;border-radius: 8px;"
                                    placeholder="********">
                            </b-input>
                            <label class="mylabel1" v-if="($v.password1.$model !== $v.password2.$model)">
                                Пароли не совпадают
                            </label>
                        </span>
                    </div>
                    <div class="row">
                        <b-button
                                type="submit"
                                class="btnLight mybutton registrationButton"
                        >
                            Регистрация
                        </b-button>
                    </div>
                    <div class="row" style="padding-left: 2rem; padding-top: 3rem;">
                        <p @click="$router.push('/LogIn')" class="label__1 col-6">Уже есть аккаунт?</p>
                        <p @click="$router.push('/LogIn')" class="label__2 col-6"
                               style="padding-left: 13rem;transition: all 1.2s ease; ">Войти</p>
                    </div>
                </b-form>
            </div>
            <div class="col-lg-6 col-md-12 col-xs-12 text-center" style="padding-top: 9rem; padding-bottom: 2rem;">
            <img src="../assets/amico3.png" style="height: 35.2rem;width: 50.3rem;"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {REGISTRATION_MUTATION} from '../mutations';
    import {email, required, minLength} from 'vuelidate/lib/validators';
    export default {
        name: 'SignUp',
        data() {
            return {
                username: '',
                email: '',
                password1: '',
                password2: '',
            }
        },
        validations: {
            username: {required},
            email: {email, required},
            password1: {required, minLength: minLength(8)},
            password2: {required, minLength: minLength(8)},
        },
        methods: {
            signup() {
                this.$apollo
                    .mutate({
                        mutation: REGISTRATION_MUTATION,
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
                        if (data.data.register.errors != null) {
                            if (data.data.register.errors.email != null) {
                                this.$notify({
                                    type: 'warn',
                                    title: 'Предупреждение.',
                                    text: 'Пользователь с таким почтовым адресом уже зарегистрирован.'
                                });
                            } else if (data.data.register.errors.username != null) {
                                this.$notify({
                                    type: 'warn',
                                    title: 'Предупреждение.',
                                    text: 'Пользователь с таким именем уже зарегистрирован.'
                                });
                            } else if (data.data.register.errors.password2 != null) {
                                if (data.data.register.errors.password2[0].message === 'This password is too short. It must contain at least 8 characters.') {
                                    this.$notify({
                                        type: 'warn',
                                        title: 'Предупреждение.',
                                        text: 'Пароль слишком короткий. Пожалуйста, измените его.'
                                    });
                                }
                                if (data.data.register.errors.password2[0].message === 'This password is too common.') {
                                    this.$notify({
                                        type: 'warn',
                                        title: 'Предупреждение.',
                                        text: 'Пароль слишком распространен. Пожалуйста, измените его.'
                                    });
                                }
                                if (data.data.register.errors.password2[0].message === 'This password is entirely numeric.') {
                                    this.$notify({
                                        type: 'warn',
                                        title: 'Предупреждение.',
                                        text: 'Пароль содержит только цифры. Пожалуйста, измените его.'
                                    });
                                }
                                if (data.data.register.errors.password2[0].message === 'The two password fields didn’t match.') {
                                    this.$notify({
                                        type: 'warn',
                                        title: 'Предупреждение.',
                                        text: 'Пароли не совпадают.'
                                    });
                                }
                            } else {
                                this.$notify({
                                    type: 'warn',
                                    title: 'Предупреждение.',
                                    text: 'Пользователь уже зарегистрирован.',
                                });
                            }
                        }
                        else{
                            this.$notify({
                                type: 'success',
                                title: 'Успешное выполнение.',
                                text: 'Вы успешно зарегистрировались. Вам на почту отправлено письмо. Пожалуйста, подтвердите регистрацию.'
                            });
                        }
                    })
                    .catch((error) => {
                        this.$notify({
                            type: 'error',
                            title: 'Ошибка.',
                            text: error,
                        });
                    })
            },
        },
    }
</script>

<style scoped>
    .myinput, .mybutton {
        font-size: 1.8rem;
        font-weight: bold;
    }

    .mylabel, .mylabel1, .myinput {
        position: relative;
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
        margin-left:auto;
        margin-right: auto;
        margin-top: 2rem
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

    .registrationButton {
        width: 17rem;
        height: 4.4rem;
        border-radius: 4px;

    }

</style>