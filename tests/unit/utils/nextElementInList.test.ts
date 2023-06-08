import nextElementInList from '@/utils/nextElementInList';

describe('nextElementInList', () => {
  it('located element in list and returns the next element', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    const value = 'E';
    const result = nextElementInList(list, value);
    expect(result).toBe('A');
  });
});
