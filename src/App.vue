<template>
  <span>
    <BarUpper></BarUpper>
     <div class="app">
      <router-view>
      </router-view>
     </div>
    <BarFooter></BarFooter>
  </span>
</template>

<script>
    import BarUpper from '@/components/BarUpper.vue';
    import BarFooter from '@/components/BarFooter.vue';
    export default {
        components:{ BarFooter, BarUpper },
    }
</script>

<style>
    .app{
        font-size: 10px;
        font-family: 'Poppins', sans-serif;
    }
</style>
