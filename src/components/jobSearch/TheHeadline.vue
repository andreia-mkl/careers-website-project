<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <transition name="tracking-in-expand-fwd-bottom" mode="out-in">
        <span :key="action" :class="actionClasses">{{ action }}</span>
      </transition>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Careers Circus Central</h2>
  </section>
</template>

<script lang="ts" setup>
import nextElementInList from '@/utils/nextElementInList';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const action = ref('Build');

// whatever is the return type of setInterval,
// take the type of that and make it the type that is being stored within my reactive object
const interval = ref<ReturnType<typeof setInterval>>();

const actionClasses = computed(() => {
  return {
    [action.value.toLowerCase()]: true
  };
});

const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ['Build', 'Create', 'Design', 'Code'];
    action.value = nextElementInList(actions, action.value);
  }, 3000);
};

onMounted(changeTitle);
onBeforeUnmount(() => clearInterval(interval.value));

// export default {
//   data() {
//     return {
//       action: 'Build',
//       interval: null
//     };
//   },
//   computed: {
//     actionClasses() {
//       return {
//         [this.action.toLowerCase()]: true
//       };
//     }
//   },
//   created() {
//     this.changeTitle();
//   },
//   beforeUnmount() {
//     clearInterval(this.interval);
//   },
//   methods: {
//     changeTitle() {
//       this.interval = setInterval(() => {
//         const actions = ['Build', 'Create', 'Design', 'Code'];
//         this.action = nextElementInList(actions, this.action);
//       }, 3000);
//     }
//   }
// };
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}

.tracking-in-expand-fwd-bottom-enter-active {
  animation: tracking-in-expand-fwd-bottom-enter 0.5s ease-out;
}

.tracking-in-expand-fwd-bottom-leave-active {
  animation: tracking-in-expand-fwd-bottom-leave 0.5s ease-in;
}

@keyframes tracking-in-expand-fwd-bottom-enter {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes tracking-in-expand-fwd-bottom-leave {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
  }
}
</style>
