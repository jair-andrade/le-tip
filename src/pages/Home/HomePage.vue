<template>
  <div class="app-body">
    <AppHeader />
    <LeTipCalculator />
  </div>
</template>

<script>
import AppHeader from "@/components/Header/AppHeader.vue";
import LeTipCalculator from "@/components/LeTipCalculator/LeTipCalculator.vue";

export default {
  name: "HomePage",
  components: {
    AppHeader,
    LeTipCalculator,
  },
};
</script>

<style scoped>
.app-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
