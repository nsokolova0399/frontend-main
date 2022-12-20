<template>
    <div class="container">
        <div class="row" >
            <div class="col-2">
                <BarMenu />
            </div>
            <div class="col-9" v-if="me">
                <div style="margin-top:8rem; padding-bottom:8rem;border-radius: 8px;">
                    <div style="background-color:#6fa1fc;border-radius: 5px">
                        <label class="mylabel" style="padding-top:2rem; padding-left:2rem;color: #173A56;font-size:1.8rem">Создайте датасет</label>
                        <div class="row justify-content-end" style="padding-left:2rem;padding-right: 4rem;padding-top:2rem;">
                            <div class="col-1">
                                <b-button
                                        @click="addData"
                                        style="width:3rem;font-size: 1.5rem; background-color: #173A56;border-radius: 10px;"
                                >+
                                </b-button>
                            </div>
                            <div class="col-1">
                                <b-button
                                        @click="delData"
                                        style="width:3rem;font-size: 1.5rem; background-color: #173A56;border-radius: 10px;"
                                >-
                                </b-button>
                            </div>
                            <div class="col-3">
                                <b-button
                                        @click="datasetCreate"
                                        style="padding-left:2rem;padding-right:2rem;max-width:16rem;font-size: 1.5rem;background-color: #173A56;border-radius: 10px;"
                                >
                                    Создать датасет
                                </b-button>
                            </div>
                        </div>
                        <div class="row" style="padding-left:2rem;padding-right: 4rem;padding-top:2rem;padding-bottom:2rem;">
                            <div class="col-3" >
                                <label class="mylabel" style="padding-left:0rem;font-size: 1.5rem;">Название датасета</label>
                                <b-input
                                    v-model="titleTest"
                                    class="inputdataset"
                                    type="text"
                                    style="margin-top: 4.5rem;max-width: 17rem;min-width: 7rem;font-size:1.5rem;"
                                >
                                </b-input>
                            </div>
                            <div class="col-3" >
                                <label class="mylabel" style="padding-left:0rem;font-size: 1.5rem;">Название решения</label>
                                <b-input
                                        v-model="titleSolution"
                                        class="inputdataset"
                                        style="margin-top: 4.5rem;max-width: 17rem;min-width: 7rem;font-size:1.5rem;"
                                >
                                </b-input>
                            </div>
                            <div class="col-3" >
                                <label class="mylabel" style="padding-left:0rem;font-size: 1.5rem; padding-left: 0rem">Количество параметров</label>
                                <div :key="index" v-for="(todo,index) in DataSet">
                                    <b-input
                                            :key="index"
                                            id="index"
                                            @input="recordTextTitle"
                                        class="inputdataset"
                                        style="margin-top: 4.5rem;max-width: 17rem;min-width: 7rem;font-size:1.5rem;"

                                >{{todo.title}}
                                </b-input>
                                </div>
                            </div>
                            <div class="col-3" >
                                <label class="mylabel" style="padding-left:0rem;font-size: 1.5rem;">Тип параметров</label>
                                <div :key="index" v-for="(todo,index) in DataSet">
                                    <b-input
                                            :key="index"
                                            id="index"
                                            @input="recordTextType"
                                            class="inputdataset"
                                            style="margin-top: 4.5rem;max-width: 17rem;min-width: 7rem;font-size:1.5rem;"

                                    >{{todo.type}}
                                    </b-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="background-color:#6fa1fc;border-radius: 5px;padding-bottom: 2rem;margin-top:2rem;">
                        <label class="mylabel" style="padding-top:1rem; padding-left:2rem;color: #173A56;font-size:1.8rem">Заполните датасет</label>
                        <label class="mylabel" style="padding-top:4rem;padding-left:2rem;font-size: 1.5rem;">Пожалуйста, введите ID созданного датасета и загрузите csv файл </label>
                        <div class="row"  style="padding-left:2rem;padding-right: 5rem;padding-top:7rem;">
                            <div class="col-2">
                                <b-input
                                        placeholder="ID"
                                        v-model="ID"
                                        id="ID"
                                        class="inputdataset"
                                        style="font-size:1.5rem;"

                                >
                                </b-input>
                            </div>
                            <div class="col-10 custom-file" style="font-size: 1.5rem;">
                                    <input type="file" ref="file" class="custom-file-input" id="file"  v-on:change="upload">
                                    <label class="custom-file-label" for="file" data-browse="Загрузить" style="border-radius: 8px; color: #173A56;font-size: 1.5rem">Выберете файл: {{this.file.name}}</label>
                            </div>

                        </div>
                    </div>
                    <div style="background-color:#6fa1fc;border-radius: 5px">
                        <div class="row"  style="padding-left:2rem;padding-right: 5rem;margin-top: 2rem;">
                        <div class="col-2">
                            <label class="mylabel" style="padding-top:2rem; padding-left:1rem;color: #173A56;font-size:1.5rem">ID датасета</label>
                        </div>
                        <div class="col-3">
                            <label class="mylabel" style="padding-top:2rem; padding-left:1rem;color: #173A56;font-size:1.5rem">Количество ближайших точек</label>
                        </div>
                        <div class="col-3">
                            <label class="mylabel" style="padding-top:2rem; padding-left:1rem;color: #173A56;font-size:1.5rem">Процент тестовой выборки</label>

                        </div>
                        <div class="col-2">
                            <label class="mylabel" style="padding-top:2rem; padding-left:1rem;color: #173A56;font-size:1.5rem">Название отчета</label>
                        </div>
                        <div class="col-2"></div>
                        </div>
                        <div class="row"  style="padding-left:2rem;padding-right: 5rem;margin-top:10rem;padding-bottom: 1.5rem;">
                            <div class="col-2">
                                <b-input
                                        placeholder="ID"
                                        v-model="datasetId"
                                        id="datasetId"
                                        class="inputdataset"
                                        style="font-size:1.5rem;"
                                >
                                </b-input>
                            </div>
                            <div class="col-3">
                                <b-input
                                        placeholder="k"
                                        v-model="k"
                                        id="k"
                                        class="inputdataset"
                                        style="font-size:1.5rem;"
                                >
                                </b-input>
                            </div>
                            <div class="col-3">
                                <b-input
                                        placeholder="(0;1)"
                                        v-model="testSize"
                                        id="testSize"
                                        class="inputdataset"
                                        style="font-size:1.5rem;"
                                >
                                </b-input>
                            </div>
                            <div class="col-2">
                                <b-input
                                        placeholder="title"
                                        v-model="titleData"
                                        id="titleData"
                                        class="inputdataset"
                                        style="font-size:1.5rem;"
                                >
                                </b-input>
                            </div>
                            <div class="col-2 " style="margin-left:-0.5rem;">
                                <b-button
                                        @click="runalgorithmKnn"
                                        style="padding-left:1rem;padding-right:1rem;margin-top:-1rem;font-size: 1.3rem;background-color: #173A56;border-radius: 10px;"
                                >
                                    Запустить алгортм
                                </b-button>
                            </div>

                        </div>
                        <div class="row" v-if="this.runalgorithm" style="padding-left:2rem;padding-right: 5rem;padding-top:2rem;padding-bottom: 1.5rem;">
                            <div class="col-2">
                                <label class="mylabel" style=" padding-left:1rem;color: #173A56;font-size:2rem">Точность: </label>
                            </div>
                            <div class="col-2" style="padding-bottom: 4rem;">
                                <b-input
                                        placeholder="0"
                                        v-model="matchPrecentage"
                                        id="matchPrecentage"
                                        class="inputdataset"
                                        style="font-size:2rem;margin-left: 3rem; width: 10rem;"
                                >
                                </b-input>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<script>
    import BarMenu from './parts/BarMenu'
    import {DATASETCREATE_MUTATION, REFRESHTOKEN_MUTATION,DATASETVALUEUPLOAD_MUTATION, ALGORITHMKNN_MUTATION} from "../mutations";
    import {ME_QUERY} from "../queries";
    export default {
        name: "Application",
        components:{BarMenu},
        data() {
            return{
                me:'false',
                ID:'',
                titleTest:'',
                titleSolution:'',
                ParametersTitle:'',
                ParametersType:'',
                input:[],
                titleData:'',
                testSize:'',
                k:'',
                datasetId:'',
                runalgorithm:false,
                matchPrecentage:'',
                DataSet_:{
                    title:"",
                    type:""
                },
                DataSet:[{
                    title:"",
                    type:""
                }],
                file:''
            }
        },
        apollo: {
            me: {
                query: ME_QUERY,
            },
        },

        methods:{
            recordTextTitle(event){
                this.DataSet_.title = event;
            },
            recordTextType(event){
                this.DataSet_.type = event;
            },
            addData(){
                this.$apollo.queries.me.refresh()
                const copyObject = JSON.parse(JSON.stringify({"title":this.DataSet_.title,"type":this.DataSet_.type}))
                this.DataSet.push(copyObject);
            },
            delData(){
                const copyObject = JSON.parse(JSON.stringify({"title":this.DataSet_.title,"type":this.DataSet_.type}))
                this.DataSet.pop(copyObject);
            },
            datasetCreate() {
                this.$apollo.queries.me.refresh();
                const copyObject = JSON.parse(JSON.stringify({"title":this.DataSet_.title,"type":this.DataSet_.type}))
                this.DataSet.push(copyObject);
                this.DataSet.shift();
                this.$apollo
                    .mutate({
                        mutation: DATASETCREATE_MUTATION,
                        variables: {
                            input: {
                                "title":this.titleTest,
                                "solutionInfo":{"title":this.titleSolution},
                                "paramInfo": this.DataSet
                            }
                        }
                    })
                    .then(data => {
                        alert('ID созданного датасета: '+data.data.datasetCreate.dataset.id)
                    })
                .catch(error=>{
                    alert('Ошибка '+error)
                })
            },
            changeToken(){
                this.$apollo
                    .mutate({
                        mutation: REFRESHTOKEN_MUTATION,
                        variables: {
                            refreshToken: localStorage.getItem('refreshToken')
                        }
                    })
                    .then(data => {
                        localStorage.setItem('token',data.data.refreshToken.token)
                        localStorage.setItem('refreshToken',data.data.refreshToken.refreshToken)
                        this.$apollo.queries.me.refresh();
                    })
            },
            upload({ target: { files = [] } }) {
                this.$apollo.queries.me.refresh();
                this.file=files[0];
                if (!files.length) {
                    return this.$apollo.queries.me.refresh();
                }
                this.$apollo
                    .mutate({
                        mutation: DATASETVALUEUPLOAD_MUTATION,
                        variables: {
                                datasetId:this.ID,
                                file:files[0]
                        },
                        context: {
                            hasUpload: true
                        }
                    })
                    .then(data => {
                        if (data.data.datasetValuesUpload.ok){
                                alert('Датасет успешно загружен')
                        }
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            },
            runalgorithmKnn(){
                this.$apollo.queries.me.refresh();
                this.$apollo
                    .mutate({
                        mutation: ALGORITHMKNN_MUTATION,
                        variables: {
                            k: this.k,
                            title: this.titleData,
                            testSize:  this.testSize,
                            datasetId: this.datasetId
                        }
                    })
                    .then(data => {

                        this.runalgorithm = true;
                        this.matchPrecentage = data.data.runAlgorithmKnn.result.matchPercentage;

                    })
            }
        },
        watch:{
            me: function(){
                if(localStorage.getItem('auth') && this.me === null){
                    return this.changeToken();
                }
            },
        },
    }
</script>

<style>
.inputdataset{
    border-radius: 6px;
    height: 3rem;
}
</style>