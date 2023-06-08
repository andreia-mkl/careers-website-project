<template>
  <div>Job numero {{ currentJobId }}</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentJobId = computed(() => route.params.id);

// export default {
//   name: 'JobView',
//   computed: {
//     currentJobId() {
//       return this.$route.params.id;
//     }
//   }
// };
</script>
