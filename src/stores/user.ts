import { defineStore } from 'pinia';
import { ref } from 'vue';

export const LOGIN_USER = 'LOGIN_USER';
export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS';
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES';
export const ADD_SELECTED_DEGREES = 'ADD_SELECTED_DEGREES';
export const CLEAR_USER_JOB_FILTER = 'CLEAR_USER_JOB_FILTER';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);
  const selectedOrganizations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);
  const skillsSearchTerm = ref('');

  const LOGIN_USER = () => {
    isLoggedIn.value = true;
  };

  const ADD_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees;
  };

  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes;
  };

  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganizations.value = organizations;
  };

  const CLEAR_USER_JOB_FILTER = () => {
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
    selectedOrganizations.value = [];
    skillsSearchTerm.value = '';
  };

  const UPDATE_SKILLS_SEARCH_TERM = (term: string) => {
    skillsSearchTerm.value = term;
  };

  return {
    isLoggedIn,
    selectedDegrees,
    selectedJobTypes,
    selectedOrganizations,
    skillsSearchTerm,
    LOGIN_USER,
    ADD_SELECTED_DEGREES,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_ORGANIZATIONS,
    CLEAR_USER_JOB_FILTER,
    UPDATE_SKILLS_SEARCH_TERM
  };
});

// export const useUserStore = defineStore('user', {
//   state: (): UserState => ({
//     isLoggedIn: false,
//     selectedOrganizations: [],
//     selectedJobTypes: [],
//     selectedDegrees: []
//   }),
//   actions: {
//     [LOGIN_USER]() {
//       this.isLoggedIn = true;
//     },
//     [ADD_SELECTED_ORGANIZATIONS](organizations: string[]) {
//       this.selectedOrganizations = organizations;
//     },
//     [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
//       this.selectedJobTypes = jobTypes;
//     },
//     [ADD_SELECTED_DEGREES](degrees: string[]) {
//       this.selectedDegrees = degrees;
//     },
//     [CLEAR_USER_JOB_FILTER]() {
//       this.selectedDegrees = [];
//       this.selectedJobTypes = [];
//       this.selectedOrganizations = [];
//     }
//   },
//   getters: {}
// });
