<template>
    <div>
            <div v-on:click='showDropdown'>
                        <div class="row" style="width:9rem; margin:2rem; margin-left:-3rem">
                            <span v-if="isShowDropdown" >
                                <img src="../../assets/menu_question.png" class="buttonDropdown"/>
                                <div>
                                    <router-link
                                            :to="{name:'User'}"

                                    >
                                        <button class="btnDark  buttonD">Личный кабинет</button>
                                    </router-link>
                                </div>
                                <div>
                                    <router-link
                                            :to="{name:'Application'}"
                                    >
                                       <button class="btnDark  buttonD">Приложение</button>
                                   </router-link>
                                </div>
                                <div>
                                    <router-link @click=logout
                                                 :to="{name:'Home'}"
                                    >
                                        <button class="btnDark  buttonD">Выход</button>
                                    </router-link>
                                </div>
                            </span>
                            <span v-else>
                                <img src="../../assets/menu_question.png" class="buttonDropdown"/>
                            </span>
                        </div>
            </div>
    </div>
</template>

<script>
    import '../../assets/Dataset.css'
    export default {
        name: "BarMenu",
        data: () => ({
            isShowDropdown: false,
        }),
        methods: {
            showDropdown() {
                this.isShowDropdown=!this.isShowDropdown
            },
            logout(){
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('auth')
            },
        },
    }
</script>

<style>
.buttonDropdown{
    height: 2.2rem;
    width: 4.4rem;
    margin-left: 2rem
}
.buttonD{
    margin-top: 0.5rem;
    margin-left: -4.5rem;
    height: 4rem;
    width: 17rem;
    font-size: 1.7rem;
}
</style>