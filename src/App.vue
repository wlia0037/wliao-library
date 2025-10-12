<template>
  <div>
    <BHeader v-if="showHeader" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import BHeader from "./components/BHeader.vue";

const route = useRoute();
// Hide header on the API page so only raw JSON shows
const showHeader = computed(() => route.name !== "CountBookAPI");
</script>

<style scoped>
header {
  line-height: 1.5;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    margin: 0 2rem 0 0;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
