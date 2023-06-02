<template>
    <div class="container">
        <div class="row">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-12 userBlockForm">
                <b-form method="POST" @submit.prevent="changePassword" class="userForm">
                    <div v-if="me">
                        <div class="input__group__label" v-if="me" style="padding-top: 5rem;">
                            <label class="mylabel" style="padding-left: 7rem;position: relative">Старый пароль:</label>
                            <b-input
                                    v-model="passwordold"
                                    :class="{invalid: $v.passwordold.$dirty && !$v.passwordold.required}"
                                    class="myinput1"
                                    type="password"
                                    autocomplete="on"
                                    id="passwordold"
                                    style="background-color: #6BA0FF; width: 40rem; margin-left: 7rem"
                            >
                            </b-input>
                            <label class="mylabel1" v-if="!$v.passwordold.required"
                                   style="margin-left:4rem;">
                                Пароль не может быть пустым
                            </label>
                        </div>
                        <div class="input__group__label" v-if="me">
                            <label class="mylabel" style="padding-left: 7rem; position: relative">Новый пароль:</label>
                            <b-input
                                    class="myinput1"
                                    v-model="password1"
                                    :class="{invalid: ($v.password1.$dirty && !$v.password1.required) || ($v.password1.$dirty && !$v.password1.minLength)}"
                                    type="password"
                                    autocomplete="on"
                                    id="password1"
                                    style="background-color: #6BA0FF; margin-left: 7rem"
                            >
                            </b-input>
                            <label class="mylabel1" v-if="!$v.password1.required"
                                   style="margin-left:4rem;">
                                Пароль не может быть пустым
                            </label>
                            <label class="mylabel1" v-else-if="!$v.password1.minLength"
                                   style="margin-left:4rem;">
                                Пароль должен быть минимум {{$v.password1.$params.minLength.min}} символов.
                            </label>
                        </div>
                        <div class="input__group__label" v-if="me">
                            <label class="mylabel" style="padding-left: 7rem; position: relative">Повторите
                                пароль:</label>
                            <b-input
                                    class="myinput1"
                                    v-model="password2"
                                    :class="{invalid: ($v.password1.$dirty && !$v.password1.minLength) ||($v.password2.$dirty && !$v.password2.minLength)}"
                                    type="password"
                                    autocomplete="on"
                                    id="password2"
                                    style="background-color: #6BA0FF;margin-left: 7rem "
                            >
                            </b-input>
                            <label class="mylabel1" v-if="!$v.password2.required"
                                   style="margin-left:4rem;">
                                Пароль не может быть пустым
                            </label>
                            <label class="mylabel1" v-else-if="($v.password1.$model !== $v.password2.$model)"
                                   style="margin-left:4rem;">
                                Пароли не совпадают.
                            </label>
                        </div>
                        <div class="input__group__label">
                            <b-button
                                    class="mybutton btnLight"
                                    variant="primary"
                                    type="submit"
                                    style="width: 15rem;margin-top:2rem;height: 4.3rem; ;margin-left:30rem; border-radius: 4px;"
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
    import { CHANGEPASSWORD_MUTATION} from "../../mutations";
    import {minLength, required} from "vuelidate/lib/validators";

    export default {
        name: "ChangePass",
        data() {
            return {
                passwordold: '',
                password1: '',
                password2: '',
                refreshToken: localStorage.getItem('refreshToken').toString()
            }
        },
        validations: {
            passwordold: {required},
            password1: {required, minLength: minLength(8)},
            password2: {required, minLength: minLength(8)},
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
            changePassword() {
                this.$apollo.queries.me.refresh();
                this.$apollo
                    .mutate({
                        mutation: CHANGEPASSWORD_MUTATION,
                        variables: {
                            oldPassword: this.passwordold,
                            newPassword1: this.password1,
                            newPassword2: this.password2
                        }
                    })
                    .then(data => {
                        if (this.$v.$invalid) {
                            this.$v.$touch()
                            return
                        }
                        if (data.data.passwordChange.success) {
                            localStorage.setItem('refreshToken', data.data.passwordChange.refreshToken)
                            setTimeout(() => this.$notify({
                                type: 'success',
                                title: 'Успешное выполнение.',
                                text: 'Пароль успешно изменен.',
                            }), 0);
                            setTimeout(() => this.$router.replace('/Login/Menu/User'), 3000);
                        } else {
                            if (data.data.passwordChange.errors.oldPassword !== undefined) {
                                this.$notify({
                                    type: 'error',
                                    title: 'Ошибка.',
                                    text: 'Введен неверный старый пароль.',
                                });
                            } else {
                                this.$notify({
                                    type: 'warn',
                                    title: 'Предупреждение.',
                                    text: 'Новый пароль слишком простой.',
                                });
                            }
                        }
                    })
                    .catch(error => {
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

<style>
    .userBlockForm{
        margin-top: 4rem;
        margin-bottom: 3rem;
    }
    .mylabel1{
        position: relative;
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
        position: relative;
        font-size: 1.9rem;
        font-weight: bold;
        background-color: white;
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
        background-color: #BCD0E5;
    }

    .mybutton:active, .mybutton:focus {
        color: #173A56;
        border-color: #bcd0e5;
        background-color: #9fcaf6;
    }
</style>