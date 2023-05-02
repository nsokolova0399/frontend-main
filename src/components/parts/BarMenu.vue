<template>
    <div>
            <div v-on:click='showDropdown'>
                        <div class="row" style="width:9rem; margin:2rem">
                            <span v-if="isShowDropdown" >
                                <img src="../assest_components/menu_question.png" style="height: 5rem; width: 5rem;"/>
                                <img src="../assest_components/arrow1.png" style="height: 2rem; width: 2rem;"/>

                                <div>
                                    <router-link
                                            :to="{name:'GreetingsMenu'}"
                                    >
                                        <img src="../assest_components/menu_back.png" class="imgMenu"/>
                                    </router-link>
                                </div>
                                <div>
                                    <router-link
                                            :to="{name:'User'}"

                                    >
                                        <img src="../assest_components/menu_office.png" class="imgMenu"/>
                                    </router-link>
                                </div>
                                <div>
                                    <router-link
                                            :to="{name:'Application'}"
                                    >
                                        <img src="../assest_components/menu_api.png" class="imgMenu"/>
                                    </router-link>
                                </div>
                                <div>
                                    <router-link @click=logout
                                                 :to="{name:'Home'}"
                                    >
                                        <img src="../assest_components/menu_logout.png" class="imgMenu"/>
                                    </router-link>
                                </div>
                            </span>
                            <span v-else>
                                <img src="../assest_components/menu_question.png" style="height: 5rem; width: 5rem;"/>
                                <img src="../assest_components/arrow2.png" style="height: 2rem; width: 2rem;"/>
                            </span>
                        </div>

            </div>

    </div>
</template>

<script>
    import '../Dataset.css'
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

<style></style>