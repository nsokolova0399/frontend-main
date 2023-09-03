<template>
    <span>
        <notifications position="top center" classes="my-notification"/>
    <div class="row dataset-form" v-if="listDataset.length !== 0">
        <div class="col-12">
            <div class="row">
                <div class="col-12 top">
                    <label class="datasetcreate__first-title-label">
                        Просмотр датасета
                    </label>
                </div>
            </div>
            <div class="row">
                <TableDataset/>
            </div>
<div class="row">
     <ScatterChart/>
</div>
        </div>
    </div>
    <div class="row dataset-form" v-if="listDataset.length !== 0">
        <div class="col-12">
            <div class="row">
                   <div class="col-12 top">
                    <label class="datasetcreate__first-title-label">
                       Выполните алгоритм k-ближайших соседей
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <label class="datasetcreate-label">
                        Название датасета
                    </label>
                </div>
                <div class="col-6">
                    <label class="datasetcreate-label">
                        Количество соседей
                    </label>
                </div>
            </div>
            <div class="row" style="display: flex;">
                <div class="col-6">
                        <span :key="index" v-for="(item, index) in listDataset">
                        <select
                                v-model="selectedTitleDataset"
                                class="select-b-select-b"
                                :class="{'is-error': $v.selectedTitleDataset.required}"
                        >
                            <option disabled value="item">Выберите название датасета</option>
                            <option v-for="item in listDataset" v-bind:key="item.id" v-bind:value="item.id">
                                {{item.title}}
                            </option>
                        </select>
                            </span>
                    <label class="datasetcreate__title-label" style="margin-top: 4.5rem;"
                           v-if="!$v.selectedTitleDataset.required">
                        Введите название датасета
                    </label>
                </div>
                <div class="col-6">
                    <b-input
                            placeholder="k"
                            v-model="k"
                            id="k"
                            class="datasetcreate__title-input"
                            :class="{'is-error': $v.k.required && $v.k.integer}"
                    >
                    </b-input>
                    <label class="datasetcreate__title-label" v-if="!$v.k.required">
                        Введите параметр k
                    </label>
                    <label class="datasetcreate__title-label" v-if="!$v.k.integer">
                        Введите целое число
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <label class="datasetcreate-label">
                        Размер тестовой выборки
                    </label>
                </div>
                <div class="col-6">
                    <label class="datasetcreate-label">
                        Название отчета
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <b-input
                            placeholder="[0;1]"
                            v-model="testSize"
                            id="testSize"
                            class="datasetcreate__title-input"
                            :class="{'is-error': $v.testSize.required}"
                    >
                    </b-input>
                    <label class="datasetcreate__title-label" v-if="!$v.testSize.required">
                        Введите размер тестовой выборки
                    </label>
                    <label class="datasetcreate__title-label" v-if="!$v.testSize.floatReg">
                        Введите число от 0 до 1, например: 0.2
                    </label>
                </div>
                <div class="col-6">
                    <b-input
                            placeholder="title"
                            v-model="titleData"
                            id="titleData"
                            class="datasetcreate__title-input"
                            :class="{'is-error': $v.titleData.required}"
                    >
                    </b-input>
                    <label class="datasetcreate__title-label" v-if="!$v.titleData.required">
                        Введите название отчета
                    </label>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <b-button
                            @click="runalgorithmKnn"
                            class="btn datasetcreate-button float-right btn-secondary"
                    >
                        Запустить алгортм
                    </b-button>
                </div>
            </div>
            <div class="row" v-if="this.runalgorithm"
                 style="padding-left:2rem;padding-right: 5rem;padding-top:2rem;padding-bottom: 1.5rem;">
                <div class="col-4">
                    <label class="mylabel" style="color: #173A56;font-size:2rem">Процент совпадения: </label>
                </div>
                <div class="col-5" style="padding-bottom: 4rem;">
                    <b-input
                            placeholder="0"
                            v-model="matchPrecentage"
                            id="matchPrecentage"
                            class="datasetcreate__title-input"
                            style="font-size:2rem;margin-left: 3rem;margin: 0"
                    >
                    </b-input>
                </div>
            </div>
        </div>
    </div>
    </span>
</template>


<script>
    import "../../assets/Dataset.css";
    import {ME_QUERY, RESULTS_QUERY, DATASETS_QUERY} from "../../queries";
    import {required, integer, helpers} from 'vuelidate/lib/validators';
    import {ALGORITHMKNN_MUTATION} from "../../mutations";
    import TableDataset from "./TableDataset"
    import ScatterChart from "./Graph"

    const floatReg = helpers.regex('alpha', /^[0-9]*[.]?[0-9]+$/)

    export default {
        name: "DatasetKnn",
        components: {TableDataset, ScatterChart},
        data() {
            return {
                me: null,
                datasetsQuery: null,
                ID: '',
                input: [],
                titleData: '',
                testSize: '',
                k: '',
                runalgorithm: '',
                selectedTitleDataset: '',
                selectedTitleDatasetView: '',
                matchPrecentage: '',
                listDataset: [{
                    title: '',
                }],
            }
        },
        apollo: {
            me: {
                query: ME_QUERY
            },
            datasetsQuery: {
                query: DATASETS_QUERY
            },
            resultsQuery: {
                query: RESULTS_QUERY
            }
        },
        validations: {
            selectedTitleDataset: {required},
            selectedTitleDatasetView: {required},
            k: {required, integer},
            testSize: {required, floatReg},
            titleData: {required}
        },
        methods: {
            // list() {
            //     this.listDataset = [];
            //     let arr = this.$apollo.queries.datasetsQuery.vm.datasetsQuery.result;
            //     for (let i = 0; i < arr.length; i++) {
            //         if (arr[i].user.username === this.$apollo.queries.me.vm.me.username) {
            //             this.listDataset.push(arr[i])
            //         }
            //     }
            // },
            runalgorithmKnn() {
                if (this.$v.selectedTitleDataset === '') {
                    return;
                }
                if (this.$v.k === '') {
                    return;
                }
                if (this.$v.testSize === '') {
                    return;
                }
                if (this.$v.titleData === '') {
                    return;
                }
                this.$apollo
                    .mutate({
                        mutation: ALGORITHMKNN_MUTATION,
                        variables: {
                            k: this.k,
                            title: this.titleData,
                            testSize: this.testSize,
                            datasetId: this.selectedTitleDataset
                        }
                    })
                    .then(data => {
                        this.runalgorithm = true;
                        this.matchPrecentage = data.data.runAlgorithmKnn.result.matchPercentage;
                        this.$apollo.queries.resultsQuery.refresh();
                    })
                    .catch((error) => {
                        this.$notify({
                            type: 'error',
                            title: 'Ошибка',
                            text: `${error}`
                        });
                    })
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

        },

    }
</script>

