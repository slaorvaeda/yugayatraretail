import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

// Mock Next.js Image and Link components
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

describe('Footer Component', () => {
  it('should render the footer', () => {
    render(<Footer />);
    const footer = screen.getByText(/Yugayatra Retail/i);
    expect(footer).toBeInTheDocument();
  });

  it('should display current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear}`, 'i'));
    expect(copyrightText).toBeInTheDocument();
  });

  it('should render company links', () => {
    render(<Footer />);
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Become an Affiliate')).toBeInTheDocument();
  });

  it('should render social links', () => {
    render(<Footer />);
    expect(screen.getByText('Behance')).toBeInTheDocument();
    expect(screen.getByText('Dribbble')).toBeInTheDocument();
    expect(screen.getByText('Twitter/X')).toBeInTheDocument();
  });

  it('should render newsletter subscription section', () => {
    render(<Footer />);
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('@ Enter your email...')).toBeInTheDocument();
  });

  it('should render training partner program section', () => {
    render(<Footer />);
    expect(screen.getByText(/Join our/i)).toBeInTheDocument();
    expect(screen.getByText(/Training Partner Program/i)).toBeInTheDocument();
    expect(screen.getByText('Become a Partner')).toBeInTheDocument();
  });
});

