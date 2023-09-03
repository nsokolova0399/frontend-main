<template>
    <div>
        <div class="row dataset-form">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-12">
                <div class="row">
                    <div class="col-8">
                        <label class="datasetcreate__first-title-label">Создайте структуру датасета</label>
                    </div>
                    <div class="col-4">
                        <b-button
                                @click="clear"
                                class="datasetcreate-button float-right"
                        >
                            Очистить
                        </b-button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5"><label class="datasetcreate-label">Название датасета</label></div>
                    <div class="col-5"><label class="datasetcreate-label">Название решения</label></div>
                </div>
                <div class="row">
                    <div class="col-5">
                        <b-input
                                v-model="titleTest"
                                class="datasetcreate__title-input"
                                :class="{'is-error': $v.titleTest.required}"
                        />
                        <label class="datasetcreate__title-label" v-if="!$v.titleTest.required">
                            Введите название датасета
                        </label>
                    </div>
                    <div class="col-5">
                        <b-input
                                v-model="titleSolution"
                                class="datasetcreate__title-input"
                                :class="{'is-error': $v.titleSolution.required}"
                        />
                        <label class="datasetcreate__title-label" v-if="!$v.titleSolution.required">
                            Введите название решения
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <label class="datasetcreate-label">Параметр</label>
                    </div>
                    <div class="col-3">
                        <label class="datasetcreate-label">Описание</label>
                    </div>
                    <div class="col-5">
                        <label class="datasetcreate-label">Тип</label>
                    </div>

                </div>
                <div class="row">
                    <div class="col-3">
                    <span :key="index" v-for="(item, index) in DataSet">
                        <b-input
                                v-model="item.title"
                                class="datasetcreate__title-input dataset"
                                :class="{'is-error': $v.DataSet.$each[index].title.required}"
                        >
                        </b-input>
                        <label class="datasetcreate__title-label" v-if="!$v.DataSet.$each[index].title.required">
                            Введите параметр
                        </label>
                    </span>
                    </div>
                    <div class="col-3">
                    <span :key="index" v-for="(item, index) in DataSet">
                        <b-input
                                v-model="item.description"
                                class="datasetcreate__title-input dataset"
                                :class="{'is-error': $v.DataSet.$each[index].description.required}"
                        >
                        </b-input>
                         <label class="datasetcreate__title-label" v-if="!$v.DataSet.$each[index].description.required">
                            Введите описание
                        </label>
                    </span>
                    </div>
                    <div class="col-4">
                        <span :key="index" v-for="(item, index) in DataSet"
                              style="display:flex;flex-direction: column;">
                            <select
                                    v-model="item.type"
                                    class="datasetcreate__title-input"
                                    :class="{'is-error': $v.DataSet.$each[index].type.$error}"
                            >
                            <option disabled value="item">Выберите тип</option>
                            <option>float</option>
                            <option>integer</option>
                            <option>string</option>
                        </select>
                            <label class="datasetcreate__title-label"
                                   v-if="!$v.DataSet.$each[index].type.required">
                            Введите тип
                        </label>
                        </span>
                    </div>
                    <div class="col-1">
                        <b-button class="datasetcreate__plusmin-button"
                                  @click="delData"
                        >-
                        </b-button>
                    </div>
                    <div class="col-1">
                        <b-button class="datasetcreate__plusmin-button"
                                  @click="addData"
                        >+
                        </b-button>
                    </div>
                    <div class="col-1"></div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <b-button style="padding-bottom: 1rem" class="datasetcreate-button float-right " @click="datasetCreate">
                            Создать датасет
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {DATASETCREATE_MUTATION} from "../../mutations";
    import {ME_QUERY, DATASETS_QUERY} from "../../queries";
    import "../../assets/Dataset.css";
    import {required} from 'vuelidate/lib/validators';

    export default {
        name: "DatasetCreate",
        data() {
            return {
                id: 0,
                titleTest: '',
                titleSolution: '',
                datasetsQuery:'',
                newDataSet: [],
                DataSet: [{
                    id: 0,
                    type: '',
                    title: '',
                    description:''
                }],
                file: '',
                listID: [],
                listDataset:[{
                    title:''
                }]
            }
        },
        validations: {
            DataSet: {
                $each: {
                    title: {required},
                    type: {required},
                    description:{required}
                }
            },
            titleTest:{required},
            titleSolution:{required},
        },
        apollo: {
            me: {
                query: ME_QUERY
            },
            datasetsQuery: {
                query: DATASETS_QUERY
            },
        },
        methods: {
            clear(){
                this.titleTest = ''
                this.titleSolution = ''
                this.DataSet = [{
                    id: 0,
                    type: '',
                    title: '',
                    description:''
                }]
            },
            addData() {
                if (this.$v.titleTest === '') {
                    return;
                }
                if (this.$v.titleSolution === '') {
                    return;
                }
                if (this.DataSet !== undefined) {
                    for (let i = 0; i < this.DataSet.length; i++) {
                        if (this.$v.DataSet.$model[i].title === '') {
                            return;
                        }
                        if (this.$v.DataSet.$model[i].description === '') {
                            return;
                        }
                        if (this.$v.DataSet.$model[i].type === '') {
                            return;
                        }
                    }
                }
                this.id += 1
                this.DataSet.push({
                    id: this.id,
                    title: "",
                    type: "",
                    description: ""
                })

            },
            delData() {
                if (this.DataSet.length > 1) {
                    this.id -= 1
                    this.DataSet.pop();
                }
            },
            datasetCreate() {
                if (this.$v.DataSet.$model[this.id].title === '') {
                    return;
                }
                if (this.$v.DataSet.$model[this.id].description === '') {
                    return;
                }
                if (this.$v.DataSet.$model[this.id].type === '') {
                    return;
                }
                if (this.titleSolution !== "" && this.titleTest !== "") {
                    this.DataSet.forEach((value) => {
                        this.newDataSet.push({"title": value.title, "type": value.type, "description" : value.description})
                    });
                    this.$apollo
                        .mutate({
                            mutation: DATASETCREATE_MUTATION,
                            variables: {
                                input: {
                                    "title": this.titleTest,
                                    "solutionInfo": {"title": this.titleSolution},
                                    "paramInfo": this.newDataSet
                                }
                            }
                        })
                        .then(() => {
                            this.$notify({
                                type: 'success',
                                title: 'Успешное выполнение.',
                                text: ''
                            });
                            this.$apollo.queries.datasetsQuery.refresh();
                        })
                        .catch(error => {
                            this.$notify({
                                type: 'error',
                                title: 'Ошибка.',
                                text: error
                            });
                        })
                } else {
                    this.$notify({
                        type: 'warn',
                        title: 'Предупреждение.',
                        text: 'Пожалуйста, заполните все пустые поля.'
                    });
                }
            },
        },
        watch: {
            datasetsQuery: function () {
                this.listDataset = [];
                let arr = this.$apollo.queries.datasetsQuery.vm.datasetsQuery.result;
                for(let i = 0; i < this.$apollo.queries.datasetsQuery.vm.datasetsQuery.result.length; i++){
                    if (arr[i].user.username === this.$apollo.queries.me.vm.me.username) {
                        this.listDataset.push(arr[i])
                    }
                }
            },

        },
    }
</script>

<style>

</style>