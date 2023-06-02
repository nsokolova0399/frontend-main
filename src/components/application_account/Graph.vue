<template>
    <div class="col-12">
        <div class="row">
            <div class="col-3 datasetcreate__first-title-label">Построение графика</div>
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
        <span v-if="plottingGraph">
               <div class="row">
            <div class="col-3">
                <label class="datasetcreate-label">
                    Датасет
                </label>
            </div>
            <div class="col-8">
                <label class="datasetcreate-label">
                    Выберите параметры для графика
                </label>
            </div>
        </div>
        <div class="row">
        <div class="col-3">
            <span :key="index" v-for="(item, index) in this.listDataset">
                <select
                        v-model="selectedTitleDataset"
                        @click="selectedClick"
                        class="select-b-select"
                        style="width: 15rem"
                >
                    <option disabled value="item">Выберите название датасета</option>
                    <option v-for="item in listDataset" v-bind:key="item.id" v-bind:value="item.id">
                        {{item.title}}
                    </option>
                </select>
            </span>
        </div>

        <div class="col-3" v-if="listDataset2 !== []">
            <span :key="index" v-for="(items, index) in listDataset2" style="display:flex;flex-direction: column;">
                 <label class="datasetcreate-label">
                x:
            </label>
                <select
                        v-model="items.selected1"
                        class="select-b-select"
                        style="width: 15rem;"
                >
                    <option disabled value="item">Выберите параметр</option>
                    <option v-for="item in listDataset1" v-bind:key="item.id" v-bind:value="item.id">
                        {{item.title}}
                    </option>
                </select>
            </span>
        </div>
        <div class="col-3" v-if="listDataset2 !== []">

            <span :key="index" v-for="(items, index) in listDataset2" style="display:flex;flex-direction: column;">
                <label class="datasetcreate-label">
                y:
            </label>
                <select
                        v-model="items.selected2"
                        class="select-b-select"
                        style="width: 15rem;"
                >
                    <option disabled value="item">Выберите параметр</option>
                    <option v-for="item in listDataset1" v-bind:key="item.id" v-bind:value="item.id">
                        {{item.title}}
                    </option>

                </select>
            </span>
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
        <div class="row scatter-fill">
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
        </span>
    </div>
</template>

<script>
    import "../../assets/Dataset.css";
    import {required} from 'vuelidate/lib/validators';
    import {ME_QUERY, DATASETS_QUERY} from "../../queries";
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
        name: 'ScatterChart',
        components: {Scatter},
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
        validations: {
            selectedTitleDataset: {required},
        },
        apollo: {
            me: {
                query: ME_QUERY
            },
            datasetsQuery: {
                query: DATASETS_QUERY
            }
        },
        data() {
            return {
                plottingGraph: false,
                x: [],
                selectedTitleDataset: '',
                listDataset: [{
                    title: ''
                }],
                listDataset1: [],
                listDataset1Solution: [],
                listDataset2: [{
                    listDataset1: [],
                    x: []
                }],
                selected1: '',
                selected2: '',
                listX: [],
                listY: [],
                listSolution: [],
                datacharts: [],
                chartData: {
                    datasets: [
                        {}
                    ]
                },
                chartOptions: {

                },
            }
        },
        methods: {
            randomString() {
                let color = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
                return color;
            },
            plotting() {
                this.plottingGraph = !this.plottingGraph;
            },
            selectedClick() {
                this.datacharts = this.listDataset
                for (let i = 0; i < this.datacharts.length; i++) {
                    if (this.selectedTitleDataset === this.datacharts[i].id) {
                        this.listDataset1 = this.datacharts[i].parameters;
                        this.listDataset1Solution = this.datacharts[i].solutions;
                    }
                }
            },
            scatterClick() {
                this.x = [];
                for (let j = 0; j < this.listDataset1.length; j++) {
                    if (this.listDataset2[this.listDataset2.length - 1].selected1 === this.listDataset1[j].id) {
                        this.listX = this.listDataset1[j].values;
                    }
                }

                for (let j = 0; j < this.listDataset1.length; j++) {
                    if (this.listDataset2[this.listDataset2.length - 1].selected2 === this.listDataset1[j].id) {
                        this.listY = this.listDataset1[j].values;
                    }
                }

                for (let j = 0; j < this.listDataset1Solution.length; j++) {
                    this.listSolution = this.listDataset1Solution[j].values;
                }

                let numbers = [];
                for (let j = 0; j < this.listSolution.length; j++) {
                    numbers.push(this.listSolution[j].value);
                }
                numbers = Array.from(new Set(numbers))
                this.chartData.datasets = [];
                for (let i = 0; i < numbers.length; i++) {
                    this.x = [];
                    for (let j = 0; j < this.listX.length; j++) {
                        if (numbers[i] === this.listSolution[j].value) {
                            this.x.push({x: this.listX[j].value, y: this.listY[j].value})
                        }
                    }
                    this.chartOptions ={
                        scales: {
                            x:
                                {
                                    title:
                                        {
                                            display: true,
                                            text: this.listDataset1.find(item => item.id === this.listDataset2[this.listDataset2.length - 1].selected1).title
                                        }
                                },
                            y:
                                {
                                    title:
                                        {
                                            display: true,
                                            text: this.listDataset1.find(item => item.id === this.listDataset2[this.listDataset2.length - 1].selected2).title
                                        }
                                }
                        }
                    }

                    let color = this.randomString();
                    this.chartData.datasets.push({
                        label: 'Класс: '+numbers[i],
                        fill: true,
                        borderColor: color,
                        backgroundColor: color,
                        data: this.x
                    })
                }
            }
        },
        watch: {
            datasetsQuery: function () {
                this.listDataset = [];
                let arr = this.$apollo.queries.datasetsQuery.vm.datasetsQuery.result;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].user.username === this.$apollo.queries.me.vm.me.username) {
                        this.listDataset.push(arr[i])
                    }
                }
            },
        }
    }
</script>

<style>
    .scatter-fill {
        background-color: white;
        margin-top: 3rem;
        margin-left: 3rem;
        margin-right: 3rem;
    }

    .scatter-button {
        color: #173A56;
        background-color: #ffffff;
        border-radius: 10px;
        border: none;
        display: flex;
        align-content: flex-end;
        padding: 0.5rem 2rem 0.5rem 2rem;
        margin: 0;
        font-size: 1.45rem;
    }

    .scatter-button-1 {
        color: #173A56;
        background-color: #ffffff;
        border-radius: 10px;
        border: none;
        display: flex;
        align-content: flex-end;
        padding: 0 1rem 0 1rem;
        margin-left: 1rem;
        font-size: 2.5rem;
    }

    .scatter-button-2 {
        padding: 0 1rem 0 1rem;
        font-size: 2rem;
        background-color: #ffffff;
        color: #70a2fc;
        text-align: center;
    }

</style>