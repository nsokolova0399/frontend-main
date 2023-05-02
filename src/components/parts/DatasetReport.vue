<template>
    <div class="row dataset-form">
        <notifications position="top center" classes="my-notification"/>
                <div class="col-12 top" v-if="results.length !== 0">
                    <label class="datasetcreate__first-title-label">
                        Отчеты о полученных результатах
                    </label>
                    <div class="col-12 tableDataset">
                        <div class="row">
                            <div class="col-3 tableParametr table">Название результата</div>
                            <div class="col-3 tableParametr table">Название датасета</div>
                            <div class="col-4 tableParametr table">Информация о параметрах</div>
                            <div class="col-2 tableParametr table">Точность</div>
                        </div>
                        <div class="row" v-for="(item,index) in this.results" :key="index">
                            <div class="col-3 tableParametr">{{item[0]}}</div>
                            <div class="col-3 tableParametr">{{item[2]}}</div>
                            <div class="col-4 tableParametr">k = {{item[1].k}} test_size = {{item[1].test_size}} </div>
                            <div class="col-2 tableParametr">{{item[3]}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-12 top" v-if="results.length === 0">
                    <label class="datasetcreate__first-title-label">
                        Пожалуйста, выполните алгоритм хотя бы для одного датасета
                    </label>
                </div>
            </div>
</template>

<script>
    import {ME_QUERY,RESULTS_QUERY} from "../../queries";
    export default {
        name: "DatasetReport",
        data(){
            return{
                resultsQuery:'',
                results:[]
        }
        },
        apollo:{
            me: {
                query: ME_QUERY
            },
            resultsQuery:{
                query:RESULTS_QUERY
            }
        },
        watch:{
            resultsQuery:function(){
                let result = this.$apollo.queries.resultsQuery.vm.resultsQuery.result
                for(let i = 0; i < result.length; i++){
                    if(result[i].user.username === this.$apollo.queries.me.vm.me.username){
                        this.results.push([result[i].title,JSON.parse(result[i].info), result[i].dataset.title,result[i].matchPercentage])
                    }
                }
            }
        }
    }
</script>

<style>

</style>