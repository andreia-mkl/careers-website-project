import type { Mock } from 'vitest';

import axios from 'axios';

import getJobs from '@/api/getJobs';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('getJobs', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Engineer/Superstar'
        }
      ]
    });
  });
  it('fetches jobs that candidate can apply for', async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs');
  });

  it('extracts jobs from response', async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([{ id: 1, title: 'Engineer/Superstar' }]);
  });
});
