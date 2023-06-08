import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersSidebarCheckboxGroup from '@/components/jobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';

import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/user';

vi.mock('vue-router');
const useRouterMock = useRouter as Mock;

describe('JobFiltersSidebarCheckboxGroup', () => {
  interface jobProps {
    uniqueValues: Set<string>;
    action: Mock;
  }
  const createProps = (props: Partial<jobProps> = {}): jobProps => ({
    uniqueValues: new Set(['valueA', 'valueB']),
    action: vi.fn(),
    ...props
  });

  const renderJobFiltersSidebarCheckboxGroup = (props: jobProps) => {
    const pinia = createTestingPinia({ stubActions: false });

    const userStore = useUserStore();

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia]
      }
    });

    return { userStore };
  };

  it('renders unique list of values', () => {
    const props = createProps({
      uniqueValues: new Set(['Google', 'Amazon'])
    });

    renderJobFiltersSidebarCheckboxGroup(props);

    const organizationListItems = screen.getAllByRole('listitem');
    const organizations = organizationListItems.map((node) => node.textContent);
    expect(organizations).toEqual(['Google', 'Amazon']);
  });
  describe('when user clicks checbok', () => {
    it('communicates that user has selected checkbox for value', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });

      const action = vi.fn();

      const props = createProps({
        uniqueValues: new Set(['Google', 'Amazon']),
        action
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const googleCheckBox = screen.getByRole('checkbox', { name: /google/i });
      await userEvent.click(googleCheckBox);
      expect(action).toHaveBeenCalledWith(['Google']);
    });

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });

      const props = createProps({
        uniqueValues: new Set(['Google'])
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const googleCheckBox = screen.getByRole('checkbox', { name: /google/i });
      await userEvent.click(googleCheckBox);

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });

  describe('when user clears job filters', () => {
    it('unchecks any checked checkboxes', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });

      const props = createProps({
        uniqueValues: new Set(['Google'])
      });
      const { userStore } = renderJobFiltersSidebarCheckboxGroup(props);

      const googleCheckBoxBeforeAction = screen.getByRole<HTMLInputElement>('checkbox', {
        name: /google/i
      });
      await userEvent.click(googleCheckBoxBeforeAction);

      expect(googleCheckBoxBeforeAction.checked).toBe(true);

      userStore.CLEAR_USER_JOB_FILTER();
      const googleCheckBoxAfterAction = await screen.getByRole<HTMLInputElement>('checkbox', {
        name: /google/i
      });
      expect(googleCheckBoxAfterAction.checked).toBe(false);
    });
  });
});
