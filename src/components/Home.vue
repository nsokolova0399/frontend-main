<template>
    <div class="container">
        <div class="row block__row">
            <div class="block_1 col-lg-7 col-md-12 col-xs-12 text-center">
                <div class="img_container">
                    <img class="im_2" src="./assest_components/amico.png" style="height: 50rem; width: 50rem;" />
                    <img class="im_1" src="./assest_components/amico2.png" style="height: 50rem; width: 50rem;" />
                </div>
            </div>
            <div class="block_2 col-lg-5 col-md-12 col-xs-12">
                <div class="greeting__1">Добро пожаловать в научный кабинет</div>
                <div class="greeting__2">Чтобы протестировать систему, необходимо зарегистироваться.</div>
                <div class="greeting__3">
                    <my-button-dark class="newgreeting">
                        Подробнее про систему
                    </my-button-dark>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import MyButtonDark from "./UI/MyButtonDark";
    export default {
        name: 'Home',
        components: {MyButtonDark}
    }
</script>
<style scoped>

    .greeting__1{
        color: #173A56;
        font-size: 4rem;
        font-family:'Poppins', sans-serif;
        font-style: normal;
        font-weight: 700;
        padding-top: 15.4rem;
    }
    .greeting__2{
        padding-top: 1.8rem;
        font-size: 1.8rem;
    }
    .greeting__3{
        padding-top: 4rem;
    }
    .newgreeting{
        font-size: 1.6rem;
    }
    .greeting__1, .greeting__2, .greeting__3{
        padding-left: 10px;
    }
    .block_1{
        padding-top: 8.5rem;
        position: relative;
    }

    .img_container img{
        position: relative;
        transition: all 2s ease-in-out;
    }
    .img_container img.im_1{
        opacity: 0;
        filter:alpha(opacity=0);
        margin-top: -50rem;
    }
    .img_container:hover img.im_1{
        opacity: 1;
        filter:alpha(opacity=100);
    }
    .img_container:hover img.im_2, .img_container img.im_2:hover{
        opacity: 0;
        filter:alpha(opacity=0);
    }
</style>