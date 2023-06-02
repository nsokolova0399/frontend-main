<template>
    <div class="container">
        <div class="row">
            <div class="col-12 greet1">
                <p>
                    Вам доступны возможности для тестирования cbr системы.
                    Слева находится выпадющее меню:
                </p>
                <p>
                    <img src="../../assets/menu_back.png" class="imgMenu"/>
                    — возвращение на текущую страницу;
                </p>
                <p>
                    <img src="../../assets/menu_office.png" class="imgMenu"/>
                    —  личный кабинет пользователя, где Вы можете изменить данные личного кабинета, сменить пароль;
                </p>
                <p>
                    <img src="../../assets/menu_api.png" class="imgMenu"/>
                    — приложение, где Вы можете создать структуру датасета, загрузить данные и просмотреть их, а также заполнить даннные для алгоритма KNN;
                </p>
                <p>
                    <img src="../../assets/menu_logout.png" class="imgMenu"/>
                    — выход из личного кабинета.
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-12 greet2">
                <img src="../../assets/amico4.png"/>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/Dataset.css'
    export default {
        name: "GreetingsMenu"
    }
</script>

<style>
    .greet1{
        z-index: 2;
        margin-top: 5rem;
        margin-bottom: 9rem;
        font-size: 2rem;
        color: #173A56;
        font-weight: bold;
    }
    .greet2{
        position: relative;
        opacity: 0.1;
        z-index: 1;
        text-align: center;
        margin-top:-50rem;
    }
    .greet2 img{
        width: 70rem;
    }
</style>