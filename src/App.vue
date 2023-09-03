<template>
  <span>
    <BarUpper />
     <div class="app">
      <router-view>
      </router-view>
     </div>
    <BarFooter />
  </span>
</template>

<script>
    import './assets/index.css'
    import BarUpper from '@/components/BarUpper.vue';
    import BarFooter from '@/components/BarFooter.vue';

    export default {
        components: {BarFooter, BarUpper},
    }
</script>

<style></style>
