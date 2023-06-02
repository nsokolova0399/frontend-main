<template>
    <div class="container" >
        <div class="row">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-12 blockApplication" v-if="this.me.verified" >
                    <DatasetCreate />
                    <DatasetUpload />
                    <DatasetKnn />
                    <DatasetReport/>
            </div>
            <div  class="col-12 blockApplication"  v-if="!this.me.verified">
                <h1>Пожалуйста, подтвердите регистрацию.</h1>
            </div>

        </div>
    </div>
</template>

<script>
    import {ME_QUERY} from "../../queries";
    import DatasetCreate from './DatasetCreate';
    import DatasetUpload from "./DatasetUpload";
    import DatasetKnn from "./DatasetKnn";
    import DatasetReport from "./DatasetReport";

    export default {
        name: "Application",
        components: {DatasetCreate, DatasetUpload, DatasetKnn, DatasetReport },
        data: () => ({
            me: null
        }),
        apollo: {
            me: {
                query: ME_QUERY
            },
        },
        created(){
            this.me=this.$apollo.queries.me;
        }
    }
</script>

<style>
     select, option{
         position: absolute;
     }
    .blockApplication{
        margin-top:8rem;
        margin-bottom: 8rem;
    }

</style>