<template>
    <div class="container">
        <div class="row">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-2">
                <BarMenu/>
            </div>
            <div class="col-9 blockApplication" v-if="me">
                <div class="">
                    <DatasetCreate />
                    <DatasetUpload />
                    <DatasetKnn />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BarMenu from './parts/BarMenu';
    import DatasetCreate from './parts/DatasetCreate';
    import DatasetUpload from "./parts/DatasetUpload";
    import {
        REFRESHTOKEN_MUTATION,

    } from "../mutations";
    import {ME_QUERY, } from "../queries";
    import DatasetKnn from "./parts/DatasetKnn";

    export default {
        name: "Application",
        components: {DatasetKnn, DatasetUpload, BarMenu, DatasetCreate},
        data() {
            return {
                me: null,
            }
        },
        apollo: {
            me: {
                query: ME_QUERY
            },

        },
        methods: {
            changeToken: function () {
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
            },

        },
        watch: {
            me: {
                handler() {
                    console.log('application me', this.me);
                    if (localStorage.getItem('auth') && this.me == null) {
                        this.changeToken();
                        console.log('me', this.me)
                        console.log(localStorage.getItem('token'))
                    }
                },
                immediate: true
            },

        },

    }
</script>

<style>
     select, option{
         position: absolute;
     }
    .blockApplication{
        margin-top:8rem;
    }


</style>