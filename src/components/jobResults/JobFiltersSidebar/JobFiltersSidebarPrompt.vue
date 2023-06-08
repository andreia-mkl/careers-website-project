<template>
  <action-button
    text="Clear Filters"
    type="secondary"
    @click="userStore.CLEAR_USER_JOB_FILTER"
  ></action-button>
</template>

<script lang="ts" setup>
import ActionButton from '@/components/shared/ActionButton.vue';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>
