<template>
    <div class="container" >
        <div class="row">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-12 blockApplication" v-if="me" >
                    <DatasetCreate />
                    <DatasetUpload />
                    <DatasetKnn />
                    <DatasetReport/>
            </div>
        </div>
    </div>
</template>

<script>
    import {ME_QUERY} from "../queries";
    import DatasetCreate from './parts/DatasetCreate';
    import DatasetUpload from "./parts/DatasetUpload";
    import DatasetKnn from "./parts/DatasetKnn";
    import DatasetReport from "./parts/DatasetReport";

    export default {
        name: "Application",
        components: { DatasetCreate, DatasetUpload, DatasetKnn, DatasetReport },
        data: () => ({
            me: null,
        }),
        apollo: {
            me: {
                query: ME_QUERY
            },
        },
        created(){
            this.me=this.$apollo.queries.me;
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