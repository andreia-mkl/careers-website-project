import { render, screen } from '@testing-library/vue';

import HeaderContainer from '@/components/shared/HeaderContainer.vue';

describe('HeaderContainer', () => {
  it('allows header component to provide title content', () => {
    render(HeaderContainer, {
      slots: {
        title: '<h2>SampleTitle</h2>'
      }
    });

    expect(screen.getByText('SampleTitle')).toBeInTheDocument();
  });

  it('allows header component to provide subtitle content', () => {
    render(HeaderContainer, {
      slots: {
        subtitle: '<h2>SampleSubTitle</h2>'
      }
    });

    expect(screen.getByText('SampleSubTitle')).toBeInTheDocument();
  });
});
