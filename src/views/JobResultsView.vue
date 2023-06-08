<template>
  <div class="flex w-full flex-row flex-nowrap">
    <job-filters-sidebar />
    <job-listings></job-listings>
  </div>
</template>

<script lang="ts" setup>
import JobFiltersSidebar from '@/components/jobResults/JobFiltersSidebar/JobFiltersSidebar.vue';
import JobListings from '../components/jobResults/JobListings/JobListings.vue';
</script>
