<template>
    <div class="container">
        <div class="row">
        <div class="col-2 col-lg-2">
            <BarMenu />
        </div>
            <div class="col-10 col-lg-10" style="align-items: center">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
    import {ME_QUERY, DATASETS_QUERY} from "../queries";
    import {REFRESHTOKEN_MUTATION,} from "../mutations";
    import BarMenu from './parts/BarMenu'

    export default {
        name: 'Menu',
        components: {
            BarMenu
        },
        data: () => ({
            isShowDropdown: false,
            me: null,
        }),
        apollo: {
            me: {
                query: ME_QUERY
            },
            datasetsQuery: {
                query: DATASETS_QUERY
            },
        },
        mounted() {
            this.changeToken()
        },

        methods: {
            showDropdown() {
                this.isShowDropdown = !this.isShowDropdown
            },
            logout() {
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('auth')
            },
            changeToken() {
                    this.$apollo
                        .mutate({
                            mutation: REFRESHTOKEN_MUTATION,
                            variables: {
                                refreshToken: localStorage.getItem('refreshToken')
                            }
                        })
                        .then(data => {
                            localStorage.setItem('token', data.data.refreshToken.token)
                            localStorage.setItem('refreshToken', data.data.refreshToken.refreshToken)
                            this.update;
                        })
                setTimeout(() => {this.changeToken() }, 300000)
            },

        },


    }
</script>
<style>
    .url {
        color: #173A56;
        text-decoration: none;
    }

    .url:hover {
        color: #02897A;
        text-decoration: none;
    }
</style>
