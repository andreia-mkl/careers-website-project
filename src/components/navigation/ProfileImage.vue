<template>
  <img :src="imageLink" class="h-10 w-10 rounded-3xl object-contain" alt="UserProfileImage" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const imageLink = ref(
  'https://i.pinimg.com/originals/1a/ba/6f/1aba6fa0634c6c82cfacc5a44076d250.jpg'
);
</script>
