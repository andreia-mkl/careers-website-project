import { render, screen } from '@testing-library/vue';

import ActionButton from '@/components/shared/ActionButton.vue';

describe('ActionButton', () => {
  it('should render correct text', () => {
    render(ActionButton, {
      props: {
        text: 'testText',
        type: 'primary'
      }
    });
    const button = screen.getByRole('button', {
      name: /testtext/i
    });
    expect(button).toBeInTheDocument();
  });
  it('applies one of the syles to button', () => {
    render(ActionButton, {
      props: {
        text: 'testText',
        type: 'primary'
      }
    });
    const button = screen.getByRole('button', {
      name: /testtext/i
    });
    expect(button).toHaveClass('primary');
  });
});
