<template>
    <div>
        <div class="row dataset-form">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-12" v-if="this.listDataset.length !== 0">
                <div class="row">
                    <div class="col-12">
                        <label class="datasetcreate__first-title-label">
                            Заполните датасет
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label class="datasetcreate-label">
                            Пожалуйста, выберите название из созданных датасетов и загрузите в него .csv файл
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12" style="display: flex;padding: 0; margin: 0">
                        <div class="col-6">
                                <span :key="index" v-for="(item, index) in this.listDataset">
                                <select
                                        v-model="selectedTitleDataset"
                                        class="select-b-select"
                                        :class="{'is-error': $v.selectedTitleDataset.required}"
                                >
                                    <option disabled value="item">Выберите название датасета</option>
                                    <option v-for="item in listDataset" v-bind:key="item.id" v-bind:value="item.id">
                                        {{item.title}}
                                    </option>
                                </select>
                            </span>
                            <label class="datasetcreate__title-label" style="margin-top: 3.5rem;"
                                   v-if="!$v.selectedTitleDataset.required">
                                Введите название датасета
                            </label>
                        </div>
                        <div class="col-6 ">
                            <b-form-file
                                    accept="text/csv"
                                    ref="file-input"
                                    v-on:change="upload"
                                    placeholder="Выберите файл:"
                                    browse-text="Загрузить"
                                    class=""
                            >{{this.file}}
                            </b-form-file>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12" v-if="this.listDataset.length === 0">
                <label class="datasetcreate__first-title-label">
                    Пожалуйста, создайте хотя бы одну структуру для датасета
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import "../../assets/Dataset.css";
    import {ME_QUERY, DATASETS_QUERY} from "../../queries";
    import {DATASETVALUEUPLOAD_MUTATION} from "../../mutations";
    import {required} from 'vuelidate/lib/validators';

    export default {
        name: "DatasetUpload",
        data() {
            return {
                me: null,
                datasetsQuery: null,
                file: '',
                selectedTitleDataset: '',
                listDataset: [{
                    title: ''
                }],
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
            },
        },
        methods: {
            upload({target: {files = []}}) {
                if (this.$v.selectedTitleDataset === '') {
                    return;
                } else {
                    this.file = files[0];
                    this.$apollo
                        .mutate({
                            mutation: DATASETVALUEUPLOAD_MUTATION,
                            variables: {
                                datasetId: this.selectedTitleDataset,
                                file: files[0]
                            },
                            context: {
                                hasUpload: true
                            }
                        })
                        .then(data => {
                            if (data.data.datasetValuesUpload.ok) {
                                this.$notify({
                                    type: 'success',
                                    title: 'Успешное выполнение.',
                                    text: 'Датасет успешно загружен. '
                                });
                            }
                        })
                        .catch((error) => {
                            this.$notify({
                                type: 'error',
                                title: 'Ошибка.',
                                text: error.message
                            });
                        })
                }
            },
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
            }
        },
    }
</script>