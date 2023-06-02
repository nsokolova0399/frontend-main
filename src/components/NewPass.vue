<template>
    <div class="container">
        <div class="row">
            <notifications position="top center" classes="my-notification"/>
            <div class="col-lg-12 col-md-12 col-xs-12">
                <b-form method="POST" @submit.prevent="newpassword" class="form" style="height: 31rem; width: 35.6rem; margin: 13rem auto 13rem auto">
                    <div class="input__group">
                        <div class="input__group__label" style="padding-top: 2.6rem; padding-left: 2rem">
                            <label class="datasetcreate-label">Пожалуйста, новый пароль и подтвердите его</label>
                        </div>
                        <div class="input__group__label" style="padding-top: 0.6rem; padding-left: 2rem">
                            <label class="datasetcreate-label">Новый пароль:</label>
                            <b-input
                                    class="myinput"
                                    v-model="password1"
                                    placeholder="********"
                                    type="password"
                                    style="width: 30.5rem;border-radius: 8px;margin:0; font-size: 1.2rem;"
                            >
                            </b-input>
                        </div>
                        <div class="input__group__label" style="padding-top: 0.6rem; padding-left: 2rem">
                            <label class="datasetcreate-label">Повторите пароль:</label>
                            <b-input
                                    class="myinput"
                                    v-model="password2"
                                    placeholder="********"
                                    type="password"
                                    style="width: 30.5rem;border-radius: 8px;margin:0; font-size: 1.2rem;"
                            >
                            </b-input>
                        </div>

                        <div class="mybutton__1">
                            <b-button
                                    class="mybutton btnLight"
                                    variant="primary"
                                    type="submit"
                                    style="width: 13rem;height: 3rem; border-radius: 4px;font-size: 1.5rem; margin:2rem auto 0 auto"
                            >
                                Сохранить
                            </b-button>
                        </div>

                    </div>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/Dataset.css'
    import {PASSWORDRESET_MUTATION} from '../mutations';

    export default {
        name: "NewPassword",
        data(){
            return{
                token:this.$route.path.substring(23),
                password1:"",
                password2:""
            }
        },
        methods:{
            newpassword(){
                this.$apollo
                    .mutate({
                        mutation: PASSWORDRESET_MUTATION,
                        variables: {
                            token: this.token,
                            newPassword1:this.password1,
                            newPassword2:this.password2
                        }
                    })
                    .then(data => {
                        if(data.data.passwordReset.success){
                            this.$notify({
                                type: 'success',
                                title: 'Успешное выполнение.',
                                text: 'Пароль успешно изменен.'
                            });
                            //this.$router.replace('/LogIn').catch(()=>{})
                        }else{
                            this.$notify({
                                type:'error',
                                title: 'Ошибка.',
                                text: data.data.passwordResetEmail.errors,
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
    .myinput, .input__group__label{
        font-size: 1.0rem;
        position: relative;
    }
</style>