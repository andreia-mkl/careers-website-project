import type { Mock } from 'vitest';

import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import MainNav from '@/components/navigation/MainNav.vue';
import { useUserStore } from '@/stores/user';

import { useRoute } from 'vue-router';
vi.mock('vue-router');

const useRouteMock = useRoute as Mock;

describe('Main Nav', () => {
  const renderMainNav = () => {
    // first testing option, use this and remove lines 52 (const useStore = useUserStore();) and 63 (useStore.isLoggedIn = true;)
    // const pinia = createTestingPinia({ stubActions: false });
    const pinia = createTestingPinia();
    useRouteMock.mockReturnValue({ name: 'Home' });
    render(MainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    });
  };
  it('displays company name', () => {
    renderMainNav();
    const companyName = screen.getByText('Careers Circus Central');
    expect(companyName).toBeInTheDocument();
  });
  it('displays mnu item for navigation', () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole('listitem');
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent);
    expect(navigationMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Life at CCC',
      'How we hire',
      'Students',
      'Jobs'
    ]);
  });
  describe('when the user logs in', () => {
    it('displays user profile picture', async () => {
      renderMainNav();
      const useStore = useUserStore();

      let profileImage = screen.queryByRole('img', {
        name: /UserProfileImage/i
      });

      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole('button', {
        name: /sign in/i
      });
      useStore.isLoggedIn = true;
      await userEvent.click(loginButton);
      profileImage = screen.getByRole('img', {
        name: /UserProfileImage/i
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
