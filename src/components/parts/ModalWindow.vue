<template>
    <div class="modal-wrapper" :style="show ? 'opacity:1; z-index:100': 'opacity:0; z-index:-1' ">
        <notifications position="top center" classes="my-notification"/>
        <div class="modal-window" :style="show ? 'opacity:1; z-index:102': 'opacity:0; z-index:-1' ">
<!--            <button class="clickModalClose" @click="closeModal">x</button>-->
            <div class="textToken">Пожалуйста, подтвердите электронную почту. Вставьте код, который был Вам отправлен:</div>
            <b-input
                    class="myinput"
                    v-model="token"
                    type="text"
                    style="font-size:1.7rem;width: 38rem; margin-left:3.5rem;height: 3.7rem; border-radius: 8px; "
                    placeholder="eyJ1c2VybmFtZSI6Im5z......"
            >
            </b-input>
            <b-button
                    @click="verify"
                    type="submit"
                    class="mybutton verifyButton"
            >Подтвердить
            </b-button>
        </div>
        <div class="overlay"></div>
    </div>
</template>

<script>
    import {VERIFYACCOUNT_MUTATION} from '../../mutations';
    export default {
        name: "ModalWindow",
        data: function () {
            return {
               show: true,
                token:''
            }
        },
        methods: {
            closeModal: function () {
                this.show = false
            },
            verify() {
                this.$apollo
                    .mutate({
                        mutation: VERIFYACCOUNT_MUTATION,
                        variables: {
                            token: this.token,
                        },
                    })
                    .then((data) => {
                        console.log(data)
                        if(data.data.verifyAccount.success){
                            this.$router.replace('/LogIn');
                        }else{
                            this.$notify({
                                type: 'error',
                                title: 'Ошибка.',
                                text: 'Неверный код.',
                            });
                        }

                    })
            }
        }
    }
</script>

<style>
    .modal-wrapper {
        left:0;
        top:0;
        position:fixed;
        display:flex;
        width:100%;
        height:100%;
        justify-content:center;
        align-items:center;
        background:rgba(0,0,0,.7);
    }

    .overlay {
        position:absolute;
        width:100%;
        height:100%;
    }
    .modal-window {
        background-color: white;
        width:50rem;
        height:30rem;
        font-size: 2rem;
        font-weight: bold;
        border-radius: 8px;
        padding: 2rem;
    }
    .textToken{
        width: 38rem;
        text-align: left;
        margin-left:3.5rem;
        margin-bottom: 2rem;
    }
    .clickModalClose{
        background-color: rgba(255, 255, 255, 0.1);
        border: 0.1px solid #02897A;
        border-radius: 4px;
        font-size: 2rem;
        margin-left: 43rem;
        height: 3.5rem;
        width: 3.5rem;
    }
    .clickModalClose:hover{
        background: rgba(156, 141, 141, 0.7);
    }
    .verifyButton{
        background-color: #02897A;
        font-size: 2rem;
        margin-top: 4.5rem;
        margin-left:3.5rem;
    }
</style>