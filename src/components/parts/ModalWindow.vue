<template>
    <div>
        <notifications position="top center" classes="my-notification"/>
        <div class="modal-wrapper">
            <div class="modal-window">
                <div class="textToken">Чтобы подтвердить регистрацию, пожалуйста, нажмите на кнопку "Подтвердить"</div>
                <div class="row">
                    <b-button
                            class="mybutton verifyButton "
                            v-on:click="verify()"
                    >Подтвердить
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {VERIFYACCOUNT_MUTATION} from '../../mutations';

    export default {
        name: "ModalWindow",
        data() {
            return {
                show: true,
                token: this.$route.path.substring(17)
            }
        },
        methods: {
            verify() {
                this.$apollo
                    .mutate({
                        mutation: VERIFYACCOUNT_MUTATION,
                        variables: {
                            token: this.token,
                        },
                    })
                    .then((data) => {
                        if (data.data.verifyAccount.success) {
                            this.$notify({
                                type: 'success',
                                title: 'Успешное выполнение.',
                                text: 'Регистрация успешно подтверждена.'
                            })
                            // this.$router.replace('/LogIn')
                        } else {
                            this.$notify({
                                type: 'error',
                                title: 'Ошибка.',
                                text: 'Подтверждение уже было выполнено.',
                            });
                        }
                    })
            }
        }
    }
</script>

<style>
    .modal-wrapper {
        margin: 5rem auto 5rem auto;
    }

    .modal-window {
        background: rgb(4, 138, 123);
        width: 50rem;
        height: 20rem;
        font-size: 2rem;
        font-weight: bold;
        border-radius: 8px;
        padding: 2rem;
        margin: 16rem auto 21rem auto;
    }

    .textToken {
        width: 38rem;
        text-align: left;
        margin-left: 3.5rem;
        margin-bottom: 2rem;
    }

    .verifyButton {
        font-size: 2rem;
        margin-left: auto;
        margin-right: auto;
        background: white;
        color: #173A56;
        height: 2.4em;
        border-color: #BCD0E5;
        padding-left: .9em;
        padding-right: .9em;
        transition: all 1.2s ease;
        border-radius: 4px;
        font-weight: bold;
    }

    .verifyButton:hover {
        color: #173A56;
        border-color: #BCD0E5;
        background: #BCD0E5;
    }
</style>