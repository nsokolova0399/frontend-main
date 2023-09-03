<template>
    <div>
        <div class="row dataset-form" v-if="results.length !== 0">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-12 top">
                <label class="datasetcreate__first-title-label">
                    Отчеты о полученных результатах
                </label>
                <div class="col-12 tableDataset tableDatasetView1" style="margin: 0; padding-left: 5px">
                    <div class="row">
                        <div class="col-3 tableParametr table">Название результата</div>
                        <div class="col-3 tableParametr table">Название датасета</div>
                        <div class="col-4 tableParametr table">Информация о параметрах</div>
                        <div class="col-2 tableParametr table">Процент совпадения</div>
                    </div>
                    <div class="row" v-for="(item,index) in this.results" :key="index">
                        <div class="col-3 tableParametr">{{item[0]}}</div>
                        <div class="col-3 tableParametr">{{item[2]}}</div>
                        <div class="col-4 tableParametr">k = {{item[1].k}} test_size = {{item[1].test_size}}</div>
                        <div class="col-2 tableParametr">{{item[3]}}</div>
                    </div>
                </div>
                <div class="row" style="margin-top: 3rem">
                    <div class="col-4 datasetcreate__first-title-label">Построение диаграммы</div>
                    <label
                            v-if="!plottingGraph"
                            class="scatter-button-1 scatter-button-2"
                            @click="plotting"
                    >
                        ˄
                    </label>
                    <label
                            v-if="plottingGraph"
                            class="scatter-button-1 scatter-button-2"
                            @click="plotting"
                    >
                        ˅
                    </label>
                </div>
                <div class="row" v-if="plottingGraph">
                    <div class="col-3">
                        <label class="datasetcreate-label">
                            Отчет
                        </label>
                    </div>
                    <div class="col-8">
                        <label class="datasetcreate-label">
                            Выберите параметры для графика
                        </label>
                    </div>
                </div>
                <div class="row" v-if="plottingGraph">
                    <div class="col-3">
            <span :key="index" v-for="(item, index) in this.listDataset">
                <select
                        v-model="selectedTitleDataset"
                        @click="selectedClick"
                        class="select-b-select"
                        style="width: 15rem"
                >
                    <option disabled value="item">Выберите название отчета</option>
                    <option v-for="item in listDataset" v-bind:key="item.id" v-bind:value="item.id">
                        {{item.title}}
                    </option>
                </select>
            </span>
                    </div>
                    <div class="col-3" v-if="listDataset1 !== []">
                        <select
                                v-model="selected1"
                                class="select-b-select"
                                style="width: 15rem;"
                        >
                            <option disabled value="item">Выберите параметр</option>
                            <option v-for="item in listDataset1" v-bind:key="item.parameter.id"
                                    v-bind:value="item.parameter.title">
                                {{item.parameter.title}}
                            </option>
                        </select>
                    </div>
                    <div class="col-3" v-if="listDataset1 !== []">
                        <select
                                v-model="selected2"
                                class="select-b-select"
                                style="width: 15rem;"
                        >
                            <option disabled value="item">Выберите параметр</option>
                            <option v-for="item in listDataset1" v-bind:key="item.parameter.id"
                                    v-bind:value="item.parameter.title">
                                {{item.parameter.title}}
                            </option>
                        </select>

                    </div>
                    <div class="col-3" style="display: flex;">
                        <b-button
                                type="submit"
                                class="scatter-button "
                                @click="scatterClick"
                        >
                            Построить
                        </b-button>
                    </div>
                </div>
                <div class="row" v-if="plottingGraph" style="margin: 3rem">
                    <div class="col-12" style="background-color: white;">
                        <Scatter
                                :chart-options="chartOptions"
                                :chart-data="chartData"
                                :chart-id="chartId"
                                :dataset-id-key="datasetIdKey"
                                :plugins="plugins"
                                :css-classes="cssClasses"
                                :styles="styles"
                                :width="width"
                                :height="height"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 top" v-if="results.length === 0"></div>
    </div>
</template>

<script>
    import {ME_QUERY, RESULTS_QUERY} from "../../queries";
    import {Scatter} from 'vue-chartjs/legacy'
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        CategoryScale,
        PointElement,
        LinearScale
    } from 'chart.js'

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        CategoryScale,
        PointElement,
        LinearScale
    )

    export default {
        name: "DatasetReport",
        components: {Scatter},
        data() {
            return {
                plottingGraph: false,
                resultsQuery: null,
                results: [],
                selectedTitleDataset: '',
                listDataset: [],
                chartData: {
                    datasets: [
                        {}
                    ]
                },
                chartOptions: {},
                listDataset1: [],
                listDataset1Solution: [],
                selected1: '',
                selected2: '',
                listX: [],
                listY: [],
                listSolution: [],
                datacharts: [],
                x: []
            }
        },
        props: {
            chartId: {
                type: String,
                default: 'scatter-chart'
            },
            datasetIdKey: {
                type: String,
                default: 'label'
            },
            width: {
                type: Number,
                default: 800
            },
            height: {
                type: Number,
                default: 400
            },
            cssClasses: {
                default: '',
                type: String
            },
            styles: {
                type: Object,
                default: () => {
                }
            },
            plugins: {
                type: Array,
                default: () => []
            }
        },
        apollo: {
            me: {
                query: ME_QUERY
            },
            resultsQuery: {
                query: RESULTS_QUERY
            }
        },
        methods: {
            plotting() {
                this.plottingGraph = !this.plottingGraph;
            },
            randomString() {
                let color = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
                return color;
            },
            selectedClick() {
                this.datacharts = this.listDataset
                for (let i = 0; i < this.datacharts.length; i++) {
                    if (this.selectedTitleDataset === this.datacharts[i].id) {
                        this.listDataset1 = this.datacharts[i].testParameters;
                        this.listDataset1Solution = this.datacharts[i].solutionPredictValues;
                    }
                }
            },
            scatterClick() {
                this.x = [];
                if(this.selected1 !== '' && this.selected2 !== '') {
                    for (let j = 0; j < this.listDataset1.length; j++) {
                        if (this.selected1 === this.listDataset1[j].parameter.title) {
                            this.listX = this.listDataset1[j].values;
                        }
                    }
                    for (let j = 0; j < this.listDataset1.length; j++) {
                        if (this.selected2 === this.listDataset1[j].parameter.title) {
                            this.listY = this.listDataset1[j].values;
                        }
                    }

                    let numbers = [];
                    for (let j = 0; j < this.listDataset1Solution.length; j++) {
                        numbers.push(this.listDataset1Solution[j].value);
                    }

                    numbers = Array.from(new Set(numbers))
                    this.chartData.datasets = [];
                    for (let i = 0; i < numbers.length; i++) {
                        this.x = [];
                        for (let j = 0; j < this.listX.length; j++) {
                            if (numbers[i] === this.listDataset1Solution[j].value) {

                                this.x.push({x: this.listX[j].value, y: this.listY[j].value})
                            }

                        }

                        this.chartOptions = {
                            scales: {
                                x:
                                    {
                                        title:
                                            {
                                                display: true,
                                                text: this.selected1
                                            }
                                    },
                                y:
                                    {
                                        title:
                                            {
                                                display: true,
                                                text: this.selected2
                                            }
                                    }
                            }
                        }

                        let color = this.randomString();
                        this.chartData.datasets.push({
                            label: 'Класс: ' + numbers[i],
                            fill: true,
                            borderColor: color,
                            backgroundColor: color,
                            data: this.x
                        })
                    }
                }
            }
        },
        watch: {
            resultsQuery: function () {
                this.results = [];
                let result = this.$apollo.queries.resultsQuery.vm.resultsQuery.result
                for (let i = 0; i < result.length; i++) {
                    if (result[i].user.username === this.$apollo.queries.me.vm.me.username) {
                        this.listDataset.push(result[i])
                        this.results.push([result[i].title, JSON.parse(result[i].info), result[i].dataset.title, result[i].matchPercentage])
                        this.results.sort();
                    }
                }
            }
        }
    }
</script>

<style>
    .tableDatasetView1 {
        margin: 0;
    }
</style>