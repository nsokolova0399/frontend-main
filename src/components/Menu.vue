<template>
        <div class="container">
            <div class="row">
                <div class="col-1 " >
                    <BarMenu />
                </div>
                <div  class="col-5">
                    <label style="font-size: 2.5rem; color: #173A56;font-weight: bold;padding-left: 4rem;margin-top: 11rem;">Теперь Вам доступны возможности для тестирования cbr системы. Вы можете перейти на страницу <router-link to="/Login/Application" class="url" >приложения</router-link>.</label>
                </div>
                <div  class="col-6 text-right">
                    <img src="./assest_components/amico4.png" style="min-height: 55.5rem; width: 68.1rem;"/>
                </div>
            </div>
        </div>

</template>



<script>
    import BarMenu from './parts/BarMenu'
    export default {
        name: 'Menu',
        components:{
            BarMenu
        },
        data: () => ({
            isShowDropdown: false,

        }),

        methods: {

            showDropdown() {
                this.isShowDropdown=!this.isShowDropdown
            }
        },
    }

</script>
<style>
    .url{
        color: #173A56;
        text-decoration: none;
    }
    .url:hover{
        color:  #02897A;
        text-decoration: none;
    }
</style>
