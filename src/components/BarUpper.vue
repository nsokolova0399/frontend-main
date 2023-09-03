<template>
    <div style="box-shadow: .0em .4em .4em rgba(0, 0, 0, 0.1);height: 7rem;font-family:'Poppins', sans-serif;padding-top: 1rem">
        <div class="container">
            <div class="row ">
                <div class="col-2 ">
                    <b-navbar-brand @click="$router.push('/')" class="navbar__brand">
                        <img src="../assets/navbar.png" style="height: 3em;"/>
                    </b-navbar-brand>
                </div>
                <div class="col-5">
                    <b-navbar-brand>
                        <span @click="$router.push('/')" class="navbar__brand_1 text-center">
                            Научный кабинет
                        </span>
                    </b-navbar-brand>
                </div>
                <div v-if="this.auth === 'false'" class="col-2">
                    <b-navbar-brand @click="$router.push('/LogIn')">
                        <button class="btnLight" style="font-size: 1.3em;">
                            Войти
                        </button>
                    </b-navbar-brand>
                </div>
                <div v-if="this.auth === 'false'" class="col-3" style="margin-left:-3rem">
                    <b-navbar-brand @click="$router.push('/SignUp')">
                        <button class="btnDark" style="font-size: 1.3em;">
                            Регистрация
                        </button>
                    </b-navbar-brand>
                </div>
                <div v-if="this.auth === 'true'" class="navbar__brand_1" style="margin-top: 1rem">
                    Добро пожаловать, SokolovaAnS!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BarUpper",
        data() {
            return {
                auth: false,
                username:'Anastasia'
            }
        },

        created(){
            this.auth = localStorage.getItem('auth')

        },

        watch: {
            auth: function () {
                this.auth = localStorage.getItem('auth');
            },

        }
    }
</script>

<style>
    .navbar__brand_1 {
        font-style: normal;
        font-weight: bold;
        color: #173A56;
        font-size: 2em;
    }

    .topic__background img {
        width: 2.4em;
        height: 2.4em;
        margin-left: .4em;
        margin-top: .4em;
    }

    .btnDark {
        background: #02897A;
        color: #ffffff;
        height: 2.4em;
        border: none;
        padding-left: .9em;
        padding-right: .9em;
        transition: all 1.2s ease;
        border-radius: 4px;
        font-weight: bold;
    }

    .btnDark:hover {
        color: #173A56;
        border: none;
        background: #BCD0E5;
    }

    .btnLight {
        background: white;
        color: #173A56;
        height: 2.4em;
        border: 2px solid #BCD0E5;
        padding-left: .9em;
        padding-right: .9em;
        transition: all 1.2s ease;
        border-radius: 4px;
        font-weight: bold;
    }

    .btnLight:hover {
        color: #173A56;
        border-color: #BCD0E5;
        background: #BCD0E5;
    }
</style>