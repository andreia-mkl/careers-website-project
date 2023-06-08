import { createPinia, setActivePinia } from 'pinia';

import { useUserStore } from '@/stores/user';

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('keeps track of user login state', () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it('stores organizations that the user woiuld like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it('stores job types that the user woiuld like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it('stores degrees that the user woiuld like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });

  it('stores users search term for skills and qualifications', () => {
    const store = useUserStore();
    expect(store.skillsSearchTerm).toBe('');
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe('login user', () => {
    it('joggs user in', () => {
      const store = useUserStore();
      store.LOGIN_USER();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('updates organizations the user has chosen to filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(['Org1', 'Org2']);
      expect(store.selectedOrganizations).toEqual(['Org1', 'Org2']);
    });
  });

  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('updates job types the user has chosen to filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(['Type1', 'Type2']);
      expect(store.selectedJobTypes).toEqual(['Type1', 'Type2']);
    });
  });

  describe('ADD_SELECTED_DEGREES', () => {
    it('updates degrees the user has chosen to filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(['Type1', 'Type2']);
      expect(store.selectedDegrees).toEqual(['Type1', 'Type2']);
    });
  });

  describe('CLEAR_USER_JOB_FILTER', () => {
    it('removes all job filters that user has chosen', () => {
      const store = useUserStore();
      store.selectedDegrees = ['random degree'];
      store.selectedJobTypes = ['random job type'];
      store.selectedOrganizations = ['rendom organization'];
      store.skillsSearchTerm = 'Vue dev';

      store.CLEAR_USER_JOB_FILTER();
      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
      expect(store.skillsSearchTerm).toEqual('');
    });
  });

  describe('UPDATE_SKILLS_SEARCH_TERM', () => {
    it('receives search term for skills the user has entered', () => {
      const store = useUserStore();
      store.skillsSearchTerm = '';
      store.UPDATE_SKILLS_SEARCH_TERM('Vue');
      expect(store.skillsSearchTerm).toBe('Vue');
    });
  });
});
