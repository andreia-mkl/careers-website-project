import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';

import JobListing from '@/components/jobResults/JobListing/JobListing.vue';
import { createJobs } from '../../../utils/createJobs';

import type { Job } from '@/api/types';

describe('JobListing', () => {
  const renderJobListing = (jobProps: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      },
      props: {
        job: { ...jobProps }
      }
    });
  };
  it('renders job listings', () => {
    const jobProps = createJobs({ title: 'Vue programmer' });
    renderJobListing(jobProps);
    expect(screen.getByText('Vue programmer / Superstar')).toBeInTheDocument();
  });

  it('renders job organization', () => {
    const orgProps = createJobs({ organization: 'KFC' });
    renderJobListing(orgProps);
    expect(screen.getByText('KFC')).toBeInTheDocument();
  });

  it('renders job locations', () => {
    const locationProps = createJobs({ locations: ['LA', 'Tampa'] });
    renderJobListing(locationProps);
    expect(screen.getByText('LA')).toBeInTheDocument();
    expect(screen.getByText('Tampa')).toBeInTheDocument();
  });

  it('renders job qualifications', () => {
    const qualProps = createJobs({ minimumQualifications: ['Code', 'Dont be a dick'] });
    renderJobListing(qualProps);
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Dont be a dick')).toBeInTheDocument();
  });
});
