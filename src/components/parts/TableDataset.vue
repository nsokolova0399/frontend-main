<template>
    <div class="tableDataset tableDatasetView">
        <div class="row">
            <div class="col-lg-3 tableParametr table">
                Название параметра
            </div>
            <div class="col-lg-3 tableParametr table">
                Описание параметра
            </div>
            <div class="col-lg-3 tableParametr table">
                Тип
            </div>
            <div class="col-lg-3 tableParametr table">
                Значения
            </div>
        </div>
        <div class="row" v-for="(value, name, index) in tableData.parameters" :key="index">
            <div class="col-lg-3 tableParametr">
                {{value.title}}
            </div>
            <div class="col-lg-3 tableParametr">
                {{value.description}}
            </div>
            <div class="col-lg-3 tableParametr">
                {{value.type}}
            </div>
            <div class="col-lg-3 tableParametr">
                    <div v-for="item in value.values" :key="item.id">
                        <span >{{item.value}}</span>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "../Dataset.css";
    import {DATASETS_QUERY, DATASETS_QUERYID} from "../../queries";

    export default {
        name: "TableDataset",
        props: ['idDataset'],
        data() {
            return {
                datasetQuery: '',
                tableData: '',
            }
        },
        apollo: {
            datasetQuery: {
                query: DATASETS_QUERYID,
                variables() {
                    return {
                        id: this.idDataset
                    }
                }
            },
            datasetsQuery: {
                query: DATASETS_QUERY
            },
        },
        watch: {
            datasetQuery: function () {
                this.tableData = this.$apollo.queries.datasetQuery.vm.datasetQuery;
                console.log(this.tableData)
            },
        }
    }
</script>

<style>
    .tableDatasetView{
        margin: 2rem;
    }
</style>