<template>
    <div class="container">
        <div class="row">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-lg-12 col-md-12 col-xs-12">
                <b-form method="POST" @submit.prevent="recovery" class="form" style="height: 19rem; width: 35.6rem; margin: 18rem auto 20rem auto">
                    <div class="input__group">
                        <div class="input__group__label" style="padding-top: 2.6rem; padding-left: 2rem">
                            <label class="datasetcreate-label">Пожалуйста, введите почту для восстановления пароля:</label>
                            <b-input
                                    class="myinput"
                                    type="text"
                                    v-model="email"
                                    placeholder="Ivanivanov@mail.ru"
                                    style="width: 30.5rem;border-radius: 8px;margin:0; font-size: 1.2rem;"
                            >
                            </b-input>
                        </div>

                        <div class="mybutton__1">
                            <b-button
                                    class="btnLight"
                                    variant="primary"
                                    type="submit"
                                    style="width: 15rem;height: 3.4rem; border-radius: 4px;font-size: 1.5rem; margin:1rem"
                            >
                                Отправить код
                            </b-button>
                        </div>

                    </div>
                </b-form>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import '../assets/Dataset.css'
    import {SENDPASSWORDRESETEMAIL_MUTATION} from '../mutations';


    export default {
        name: "PasswordRecovery",
        data(){
            return{
                email:''
            }
        },
        methods:{
            recovery(){
                this.$apollo
                    .mutate({
                        mutation: SENDPASSWORDRESETEMAIL_MUTATION,
                        variables: {
                            email: this.email
                        }
                    })
                    .then(data => {
                       if(data.data.sendPasswordResetEmail.success){
                           this.$notify({
                               type: 'success',
                               title: 'Успешное выполнение.',
                               text: 'Вам на почту отправлено письмо. Перейдите по ссылке и измените пароль.'
                           });
                       }else{
                           this.$notify({
                               type:'error',
                               title: 'Ошибка.',
                               text: data.data.sendPasswordResetEmail.errors,
                           });
                       }
                    })
                    .catch(error =>{
                        this.$notify({
                            type:'error',
                            title: 'Ошибка.',
                            text: error,
                        });
                    })
            }
        }
    }
</script>

<style scoped>
    .myinput, .mybutton{
        font-size: 1.0rem;
        margin-top: 2rem;
    }
</style>