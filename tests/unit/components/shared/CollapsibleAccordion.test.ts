import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import CollapsibleAccordion from '@/components/shared/CollapsibleAccordion.vue';

describe('CollapsibleAccordion', () => {
  const renderComponent = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FonAwesomeIcon: true
        }
      },
      props: {
        header: 'My Category'
      },
      slots: {
        default: '<h3>TestText</h3>'
      },
      ...config
    });
  };

  it('renders child content', async () => {
    const props = {
      header: 'My Category'
    };
    const slots = {
      default: '<h3>TestText2</h3>'
    };
    const config = { props, slots };
    renderComponent(config);
    expect(screen.queryByText('TestText')).not.toBeInTheDocument();
    const button = screen.getByRole('button', { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText('TestText2')).toBeInTheDocument();
  });

  describe('when parent does not provide custom child content', () => {
    it('renders default content', async () => {
      const props = {
        header: 'My Category'
      };
      const slots = {};
      const config = { props, slots };

      renderComponent(config);

      const button = screen.getByRole('button', { name: /my category/i });
      await userEvent.click(button);
      expect(screen.getByText('Whoops, somebody forgot to populate me')).toBeInTheDocument();
    });
  });
});
