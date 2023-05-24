<template>
    <div class="tableDataset tableDatasetView">
        <div class="row ">
            <div class="col-lg-2 tableParametr table">
                Название датасета
            </div>
            <div class="col-lg-4 tableParametr table">
                Название параметра
            </div>
            <div class="col-lg-4 tableParametr table">
                Описание параметра
            </div>
            <div class="col-lg-2 tableParametr table">
                Тип
            </div>
        </div>
        <div class="row" v-for="(value, name, index) in tableData" :key="index">
            <div class="col-lg-2 tableParametr">
                {{value[0]}}
            </div>
            <div class="col-lg-4 tableParametr">
                <div v-for="(item, index) in value[1]" :key="index">
                    {{item.title}}
                </div>
            </div>
            <div class="col-lg-4 tableParametr">
                <div v-for="(item, index) in value[1]" :key="index">
                    {{item.description}}
                </div>
            </div>
            <div class="col-lg-2 tableParametr">
                <div v-for="(item, index) in value[1]" :key="index">
                    {{item.type}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "../Dataset.css";
    import {ME_QUERY,DATASETS_QUERY} from "../../queries";

    export default {
        name: "TableDataset",
        data() {
            return {
                datasetsQuery: '',
                tableData: [],
                me:'',
            }
        },
        apollo: {
            me: {
                query: ME_QUERY
            },
            datasetsQuery: {
                query: DATASETS_QUERY
            },
        },
        watch: {
            datasetsQuery: function () {
                let result = this.$apollo.queries.datasetsQuery.vm.datasetsQuery.result;
                for(let i = 0; i < result.length; i++){
                    if(result[i].user.username === this.$apollo.queries.me.vm.me.username){
                        this.tableData.push([result[i].title, result[i].parameters])
                    }
                }
            },
        }
    }
</script>

<style>
    .tableDatasetView{
        margin: 2rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-top: 0;
        padding-bottom: 0;
    }
</style>