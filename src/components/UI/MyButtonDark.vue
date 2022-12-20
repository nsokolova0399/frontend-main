<template>
    <button class="btn">
        <slot class="btn__slot"></slot>
    </button>
</template>

<script>
    export default {
        name: "MyButtonDark"
    }
</script>

<style scoped>
    .btn{
        background: #02897A;
        color:white;
        height: 2.4em;
        padding-left: .9em;
        padding-right: .9em;
        transition: all 1.2s ease;
        border-radius: 4px;
        font-weight: bold;
    }
    .btn:hover{
        color:#173A56;
        border-color: #BCD0E5;
        background: #BCD0E5;
    }
</style>