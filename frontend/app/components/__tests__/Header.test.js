import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Mock GSAP
jest.mock('gsap', () => ({
  gsap: {
    fromTo: jest.fn(),
  },
}));

describe('Header Component', () => {
  it('should render the header with logo', () => {
    render(<Header />);
    const logo = screen.getByText('Yugayatra');
    expect(logo).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Solution')).toBeInTheDocument();
    expect(screen.getByText('Resource')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('should render login and get started buttons', () => {
    render(<Header />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('should have correct navigation links with href attributes', () => {
    render(<Header />);
    const solutionLink = screen.getByText('Solution').closest('a');
    const resourceLink = screen.getByText('Resource').closest('a');
    const companyLink = screen.getByText('Company').closest('a');

    expect(solutionLink).toHaveAttribute('href', '#solutions');
    expect(resourceLink).toHaveAttribute('href', '#resources');
    expect(companyLink).toHaveAttribute('href', '#company');
  });
});

