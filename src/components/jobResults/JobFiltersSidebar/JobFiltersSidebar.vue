<template>
  <div class="border-brand-grey-1 flex w-96 flex-col border-r border-solid bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <job-filters-sidebar-prompt />
        </div>
      </div>

      <job-filters-sidebar-skills />

      <collapsible-accordion header="Job Types">
        <job-filters-sidebar-job-types />
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <job-filters-sidebar-organizations />
      </collapsible-accordion>

      <collapsible-accordion header="Degrees">
        <job-filters-sidebar-degrees />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useUserStore } from '@/stores/user';

import CollapsibleAccordion from '@/components/shared/CollapsibleAccordion.vue';
import JobFiltersSidebarDegrees from './JobFiltersSidebarDegrees.vue';
import JobFiltersSidebarJobTypes from './JobFiltersSidebarJobTypes.vue';
import JobFiltersSidebarOrganizations from './JobFiltersSidebarOrganizations.vue';
import JobFiltersSidebarPrompt from './JobFiltersSidebarPrompt.vue';
import JobFiltersSidebarSkills from './JobFiltersSidebarSkills.vue';

const route = useRoute();
const userStore = useUserStore();

const parseSkillsSearchTerm = () => {
  const role = (route.query.role as string) || '';
  userStore.UPDATE_SKILLS_SEARCH_TERM(role);
};

onMounted(parseSkillsSearchTerm);
</script>
