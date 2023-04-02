<template>
    <div>
        <div class="row dataset-form">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <label class="datasetcreate__first-title-label">Создайте датасет</label>
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
                    <div class="col-5">
                        <label class="datasetcreate-label">Параметры датасета</label>
                    </div>
                    <div class="col-5">
                        <label class="datasetcreate-label">Тип</label>
                    </div>

                </div>
                <div class="row">

                    <div class="col-2">
                    <span :key="index" v-for="(item, index) in DataSet">
                        <b-input
                                v-model="item.first"
                                class="datasetcreate__title-input dataset"
                                :class="{'is-error': $v.DataSet.$each[index].first.required &&  $v.DataSet.$each[index].first.integer}"
                        >
                        </b-input>
                        <label class="datasetcreate__title-label" v-if="!$v.DataSet.$each[index].first.required">
                            Введите параметр
                        </label>
                        <label class="datasetcreate__title-label" v-if="!$v.DataSet.$each[index].first.integer">
                            Введите целое число
                        </label>
                    </span>
                    </div>
                    <div class="col-1">
                        <div class="datasetcreate__param" :key="index" v-for="(item, index) in DataSet">x</div>
                    </div>
                    <div class="col-2">
                    <span :key="index" v-for="(item, index) in DataSet">
                        <b-input
                                v-model="item.second"
                                class="datasetcreate__title-input dataset"
                                :class="{'is-error': $v.DataSet.$each[index].second.required &&  $v.DataSet.$each[index].first.integer}"
                        >
                        </b-input>
                         <label class="datasetcreate__title-label" v-if="!$v.DataSet.$each[index].second.required">
                            Введите параметр
                        </label>
                        <label class="datasetcreate__title-label" v-if="!$v.DataSet.$each[index].second.integer">
                            Введите целое число
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
                                  @click="addData()"
                        >+
                        </b-button>
                    </div>
                    <div class="col-1"></div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <b-button class="datasetcreate-button float-right" @click="datasetCreate">
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

    import "./Dataset.css";
    import {required, integer} from 'vuelidate/lib/validators';

    export default {
        name: "DatasetCreate",
        data() {
            return {
                id: 0,
                titleTest: '',
                titleSolution: '',
                newDataSet: [],
                DataSet: [{
                    id: 0,
                    first: '',
                    type: '',
                    second: ''
                }],
                file: '',
                listID: [],
                 }
        },

        validations: {
            DataSet: {
                $each: {
                    first: {required, integer},
                    second: {required, integer},
                    type: {required},
                }
            },
            titleTest:{required},
            titleSolution:{required},
        },

        methods: {

            addData() {
                if (this.$v.titleTest === '') {
                    return;
                }
                if (this.$v.titleSolution === '') {
                    return;
                }
                if (this.DataSet !== undefined) {
                    for (let i = 0; i < this.DataSet.length; i++) {
                        if (this.$v.DataSet.$model[i].first === '') {
                            return;
                        }
                        if (this.$v.DataSet.$model[i].second === '') {
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
                    first: "",
                    type: "",
                    second: ""
                })
            },
            delData() {
                if (this.DataSet.length > 1) {
                    this.id -= 1
                    this.DataSet.pop();
                }
            },
            datasetCreate() {
                if (this.$v.DataSet.$model[this.id].first === '') {
                    return;
                }
                if (this.$v.DataSet.$model[this.id].second === '') {
                    return;
                }
                if (this.$v.DataSet.$model[this.id].type === '') {
                    return;
                }

                if (this.titleSolution !== "" && this.titleTest !== "") {
                    this.DataSet.forEach((value) => {
                        this.newDataSet.push({"title": value.first + "x" + value.second, "type": value.type})
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
                            this.newDataSet = [];
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

    }
</script>

<style>

</style>