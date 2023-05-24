<template>
    <div style="box-shadow: .0em .4em .4em rgba(0, 0, 0, 0.1);height: 7rem;font-family:'Poppins', sans-serif;padding-top: 1rem">
        <div class="container">
            <div class="row " >
                <div class="col-2 ">
                    <b-navbar-brand @click="$router.push('/')" class="navbar__brand">
                        <img src="../assest_components/navbar.png" style="height: 3em;" />
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
                        <my-button-light class="brand__2" style="font-size: 1.3em;">
                            Войти
                        </my-button-light>
                    </b-navbar-brand>
                </div>
                <div class="col-3" style="margin-left:-3rem">
                    <b-navbar-brand @click="$router.push('/SignUp')">
                        <my-button-dark class="brand__1" style="font-size: 1.3em;">
                            Регистрация
                        </my-button-dark>
                    </b-navbar-brand>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyButtonDark from "@/components/UI/MyButtonDark";
    import MyButtonLight from "@/components/UI/MyButtonLight";
    export default {
        name: "BarUpper",
        components: {MyButtonLight, MyButtonDark},
    }
</script>

<style >

    .navbar{
        height: 7em;
        background-color: white;
        box-shadow: .0em .4em .4em rgba(0, 0, 0, 0.1);
        font-family:'Poppins', sans-serif;
    }



    .navbar__brand_1{
        font-style: normal;
        font-weight: bold;
        color:#173A56;
        font-size: 2em;
    }

    .topic__background{
        border-radius: 100px;
        background-color: #F3F3F3;
        height: 3.2em;
        width: 3.2em;
        transition: all 1.2s ease;
    }
    .topic__background img{
        width: 2.4em;
        height: 2.4em;
        margin-left: .4em;
        margin-top: .4em;
    }
    .topic__background:hover{
        background-color: rgba(2, 137, 122, 0.37);
        background-size: 70em;
    }
</style>