<template>
    <b-navbar toggleable="lg" class="navbar">
        <div class="container">
            <b-navbar-brand @click="$router.push('/')" class="navbar__brand">
                <img src="../assest_components/navbar.png" style="height: 3em;" />
            </b-navbar-brand>
            <span class="navbar__brand_1">
                    А-05-19 Соколова А.С. ПМИИ ИВТИ МЭИ г.Москва
                </span>
        </div>
    </b-navbar>
</template>

<script>
    export default {
        name: "BarFooter",
    }
</script>

<style scoped>
    .navbar{
        height: 6em;
        background-color: white;
        box-shadow: 0 -.2em 0 .2em rgba(0, 0, 0, 0.1),
        0 .2em 0 .2em rgba(0, 0, 0, 0.1);
        left: 0;
        width: 100%;
        margin-top: 17.5rem;
    }

    .navbar__brand_1{
        color:#173A56;
        font-size: 1.5em;
        white-space: nowrap;
    }
</style>