<template>
  <main class="flex-auto bg-brand-grey-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import JobListing from '@/components/jobResults/JobListing/JobListing.vue';
import { useJobsStore } from '@/stores/jobs';

import usePagination from '@/composables/usePagination';
import { useDegreesStore } from '@/stores/degrees';

const jobsStore = useJobsStore();
onMounted(jobsStore.FETCH_JOBS);

const degreesStore = useDegreesStore();
onMounted(degreesStore.FETCH_DEGREES);

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

const route = useRoute();
const currentPage = computed(() => Number.parseInt((route.query.page as string) || '1'));
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

const { previousPage, nextPage } = usePagination(currentPage, maxPage);

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});

// export default {
//   computed: {
//     currentPage() {
//       return Number.parseInt(this.$route.query.page || '1');
//     },
//     previousPage() {
//       const previousPage = this.currentPage - 1;
//       const firstPage = 1;
//       return previousPage >= firstPage ? previousPage : undefined;
//     },
//     ...mapState(useJobsStore, {
//       FILTERED_JOBS,
//       nextPage() {
//         const nextPage = this.currentPage + 1;
//         const maxPage = Math.ceil(this.FILTERED_JOBS.length / 10);
//         return nextPage <= maxPage ? nextPage : undefined;
//       },
//       displayedJobs() {
//         const pageNumber = this.currentPage;
//         const firstJobIndex = (pageNumber - 1) * 10;
//         const lastJobIndex = pageNumber * 10;
//         return this.FILTERED_JOBS.slice(firstJobIndex, lastJobIndex);
//       }
//     })
//   },
//   async mounted() {
//     this.FETCH_JOBS();
//   },
//   methods: {
//     ...mapActions(useJobsStore, [FETCH_JOBS])
//   }
// };
</script>
