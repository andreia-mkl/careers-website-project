import { type Mock } from 'vitest';
import { render, screen } from '@testing-library/vue';
import axios from 'axios';

import SpotLight from '@/components/jobSearch/SpotLight.vue';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;

describe('SpotLight', () => {
  const mockSpotlightResponse = (spotlight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: '1',
          img: 'someImg',
          title: 'someTitle',
          description: 'someDescr',
          ...spotlight
        }
      ]
    });
  };

  it('provides image to parent component', async () => {
    const spotlight = {
      img: 'testImg'
    };
    mockSpotlightResponse(spotlight);
    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.img }}</h1>
        
        </template>`
      }
    });

    const text = await screen.findByText('testImg');
    expect(text).toBeInTheDocument();
  });

  it('provides title to parent component', async () => {
    const spotlight = {
      title: 'testTitle'
    };
    mockSpotlightResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.title }}</h1>
        
        </template>`
      }
    });

    const text = await screen.findByText('testTitle');
    expect(text).toBeInTheDocument();
  });

  it('provides description to parent component', async () => {
    const spotlight = {
      description: 'testDescr'
    };
    mockSpotlightResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.description }}</h1>
        
        </template>`
      }
    });

    const text = await screen.findByText('testDescr');
    expect(text).toBeInTheDocument();
  });
});
