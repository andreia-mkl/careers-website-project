import { type Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';

import SubNav from '@/components/navigation/SubNav.vue';
import { useJobsStore } from '@/stores/jobs';

import { useRoute } from 'vue-router';
vi.mock('vue-router');
const useRouteMock = useRoute as Mock;

const renderSubNav = () => {
  const pinia = createTestingPinia();
  const jobsStore = useJobsStore();

  render(SubNav, {
    global: {
      plugins: [pinia],
      stubs: {
        FontAwesomeIcon: true
      }
    }
  });
  return { jobsStore };
};

describe('SubNav', () => {
  describe('when user is on jobs page', () => {
    it('displays job count', async () => {
      useRouteMock.mockReturnValue({ name: 'JobResults' });

      const { jobsStore } = renderSubNav();
      const numberOfJobs = 16;
      // @ts-expect-error: Getter is readonly
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe('when user is not on jobs page', () => {
    it('does not display job count', () => {
      useRouteMock.mockReturnValue({ name: 'Home' });
      const { jobsStore } = renderSubNav();
      const numberOfJobs = 17;
      // @ts-expect-error: Getter is readonly
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
      const jobCount = screen.queryByText('17');
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
