<template>
    <div style="box-shadow: .0em .4em .4em rgba(0, 0, 0, 0.1);height: 7rem;font-family:'Poppins', sans-serif;padding-top: 1rem">
        <div class="container">
            <div class="row " >
                <div class="col-2 ">
                    <b-navbar-brand @click="$router.push('/')" class="navbar__brand">
                        <img src="../assets/navbar.png" style="height: 3em;" />
                    </b-navbar-brand>
                </div>
                <div class="col-5">
                    <b-navbar-brand>
                        <span @click="$router.push('/')" class="navbar__brand_1 text-center">
                            Научный кабинет
                        </span>
                    </b-navbar-brand>
                </div>
                <div class="col-2">
                    <b-navbar-brand  @click="$router.push('/LogIn')">
                        <b-button class="btnLight" style="font-size: 1.3em;">
                            Войти
                        </b-button>
                    </b-navbar-brand>
                </div>
                <div class="col-3" style="margin-left:-3rem">
                    <b-navbar-brand @click="$router.push('/SignUp')">
                        <b-button class="btnDark" style="font-size: 1.3em;">
                            Регистрация
                        </b-button>
                    </b-navbar-brand>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BarUpper",
    }
</script>

<style>
    .navbar__brand_1{
        font-style: normal;
        font-weight: bold;
        color:#173A56;
        font-size: 2em;
    }

    .topic__background img{
        width: 2.4em;
        height: 2.4em;
        margin-left: .4em;
        margin-top: .4em;
    }

</style>