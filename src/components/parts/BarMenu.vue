<template>
    <div>
            <div v-on:click='showDropdown'>
                        <div class="row" style="width:9rem; margin:2rem">
                            <span v-if="isShowDropdown" >
                                <img src="./menu_question.png"  style="height: 5rem; width: 5rem;"/>
                                <img src="./arrow1.png"  style="height: 2rem; width: 2rem;"/>

                                <div>
                                    <router-link to="/LogIn/Menu">
                                        <img src="./menu_back.png" style="height: 5rem;width: 5rem; margin-top: 1rem"/>
                                    </router-link>
                                </div>
                                <div>
                                    <router-link to="/LogIn/User">
                                        <img src="./menu_office.png" style="height: 5rem;width: 5rem; margin-top: 1rem"/>
                                    </router-link>
                                </div>
                                <div>
                                    <router-link to="/LogIn/Application">
                                        <img src="./menu_api.png" style="height: 5rem;width: 5rem; margin-top: 1rem"/>
                                    </router-link>
                                </div>
                                <div>
                                    <router-link @clicl=logout to="/">
                                        <img src="./menu_logout.png" style="height: 5rem;width: 5rem; margin-top: 1rem"/>
                                    </router-link>
                                </div>
                            </span>
                            <span v-else>
                                <img src="./menu_question.png" style="height: 5rem; width: 5rem;"/>
                                <img src="./arrow2.png" style="height: 2rem; width: 2rem;"/>
                            </span>
                        </div>

            </div>

    </div>
</template>

<script>
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
            }
        },
    }
</script>

<style scoped>

</style>