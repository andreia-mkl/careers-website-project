<template>
  <input
    type="text"
    class="w-full text-lg font-normal focus:outline-none"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const handleInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

// export default defineComponent({
//   name: 'TextInput',
//   props: {
//     modelValue: {
//       type: String,
//       required: true
//     }
//   },
//   emits: ['update:modelValue'],
//   methods: {
//     handleInput($event: Event) {
//       const target = $event.target as HTMLInputElement;
//       this.$emit('update:modelValue', target.value);
//     }
//   }
// });
</script>
