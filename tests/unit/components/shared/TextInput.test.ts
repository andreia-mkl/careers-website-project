import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import TextInput from '@/components/shared/TextInput.vue';

describe('TextInput', () => {
  it('comminicates that user has entered characters', async () => {
    const wrapper = render(TextInput, {
      props: {
        modelValue: ''
      }
    });
    const { emitted } = wrapper;
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'NYC');
    const messages = emitted()['update:modelValue'];
    expect(messages).toEqual([['N'], ['NY'], ['NYC']]);
  });
});
