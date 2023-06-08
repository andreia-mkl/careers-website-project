import type { Mock } from 'vitest';

import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';

import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

import { createJobs } from '../../utils/createJobs';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('stores job listings', () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('FETCH_JOBS', () => {
    it('makes API request and stores received jobs', async () => {
      axiosGetMock.mockResolvedValue({ data: ['Job 1', 'Job 2'] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(['Job 1', 'Job 2']);
    });
  });
});

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('finds unique organizations from list of jobs', () => {
      const store = useJobsStore();
      store.jobs = [
        createJobs({ organization: 'Google' }),
        createJobs({ organization: 'Amazon' }),
        createJobs({ organization: 'Google' })
      ];

      const result = store.UNIQUE_ORGANIZATIONS;

      expect(result).toEqual(new Set(['Google', 'Amazon']));
    });
  });

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from list of jobs', () => {
      const store = useJobsStore();
      store.jobs = [
        createJobs({ jobType: 'full' }),
        createJobs({ jobType: 'part' }),
        createJobs({ jobType: 'intern' }),
        createJobs({ jobType: 'intern' })
      ];

      const result = store.UNIQUE_JOB_TYPES;

      expect(result).toEqual(new Set(['full', 'part', 'intern']));
    });
  });

  describe('INCLUDE_JOB_BY_ORGANIZATION', () => {
    describe('when the user has not selected any organizations', () => {
      it('includes job', () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const store = useJobsStore();
        const job = createJobs({ organization: 'Google' });
        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

        expect(result).toBe(true);
      });
    });
    it('identifies if job is associated with given organization', () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ['Google', 'Microsoft'];

      const store = useJobsStore();
      const job = createJobs({ organization: 'Google' });
      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

      expect(result).toBe(true);
    });
  });

  describe('INCLUDE_JOB_BY_JOB_GETTER', () => {
    describe('when the user has not selected any job type', () => {
      it('includes job', () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];

        const store = useJobsStore();
        const job = createJobs({ jobType: 'full' });
        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });
    });
    it('identifies if job is associated with given job type', () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ['full', 'part'];

      const store = useJobsStore();
      const job = createJobs({ jobType: 'full' });
      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

      expect(result).toBe(true);
    });
  });

  describe('INCLUDE_JOB_BY_DEGREE', () => {
    describe('when the user has not selected any degrees', () => {
      it('includes job', () => {
        const userStore = useUserStore();
        userStore.selectedDegrees = [];

        const store = useJobsStore();
        const job = createJobs();
        const result = store.INCLUDE_JOB_BY_DEGREE(job);

        expect(result).toBe(true);
      });
    });
    it('identifies if job is associated with given degree', () => {
      const userStore = useUserStore();
      userStore.selectedDegrees = ['college', 'phd'];

      const store = useJobsStore();
      const job = createJobs({ degree: 'phd' });
      const result = store.INCLUDE_JOB_BY_DEGREE(job);

      expect(result).toBe(true);
    });
  });
  describe('INCLUDE_JOB_BY_SKILL', () => {
    describe('when the user hasnt entered any search term', () => {
      it('includes job', () => {
        const userStore = useUserStore();
        userStore.skillsSearchTerm = '';
        const store = useJobsStore();
        const job = createJobs({ title: 'Vue developer' });

        const result = store.INCLUDE_JOB_BY_SKILL(job);
        expect(result).toBe(true);
      });
    });

    it('identifies if job matches user skill', () => {
      const userStore = useUserStore();
      userStore.skillsSearchTerm = 'Vue';
      const store = useJobsStore();
      const job = createJobs({ title: 'Vue developer' });

      const result = store.INCLUDE_JOB_BY_SKILL(job);
      expect(result).toBe(true);
    });

    it('handles inconsistent character casing', () => {
      const userStore = useUserStore();
      userStore.skillsSearchTerm = 'vue Dev';
      const store = useJobsStore();
      const job = createJobs({ title: 'Vue developer' });

      const result = store.INCLUDE_JOB_BY_SKILL(job);
      expect(result).toBe(true);
    });
  });
});
