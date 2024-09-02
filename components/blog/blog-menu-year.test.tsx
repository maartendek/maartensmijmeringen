import { render, screen, fireEvent } from '@testing-library/react';
import { BlogMenuYear, BlogMenuYearProps } from './blog-menu-year';
import { Blog } from '@/api/types';

const mockBlogs: Blog[] = [
    {
        published: '2023-01-15T00:00:00Z',
        slug: 'blog-1',
        html: '',
        title: 'Blog 1',
    },
    {
        published: '2023-02-20T00:00:00Z',
        slug: 'blog-2',
        html: '',
        title: 'Blog 2',
    },
    {
        published: '2022-03-10T00:00:00Z',
        slug: 'blog-3',
        html: '',
        title: 'Blog 3',
    },
];

const defaultProps: BlogMenuYearProps = {
    blogs: mockBlogs,
    slug: 'blog-1',
    year: 2023,
};

describe('BlogMenuYear', () => {
    it('renders the year link', () => {
        render(<BlogMenuYear {...defaultProps} />);
        const yearLink = screen.getByText('2023');
        expect(yearLink).toBeInTheDocument();
    });

    it('toggles the open state when the year link is clicked', () => {
        render(<BlogMenuYear {...defaultProps} />);
        const yearLink = screen.getByText('2023');
        expect(yearLink).toHaveClass('open');
        fireEvent.click(yearLink);
        expect(yearLink).toHaveClass('close');
        fireEvent.click(yearLink);
        expect(yearLink).toHaveClass('open');
    });

    it('renders the correct number of BlogMenuMonth components', () => {
        render(<BlogMenuYear {...defaultProps} />);
        const blogMenuMonths = screen.getAllByRole('list');
        expect(blogMenuMonths.length).toBe(3); // January and February AND 2023
    });

    it('sets the initial open state based on the current blog', () => {
        render(<BlogMenuYear {...defaultProps} />);
        const yearLink = screen.getByText('2023');
        expect(yearLink).toHaveClass('open');
    });

    it('does not set the initial open state when no current blog', () => {
        const testProps: BlogMenuYearProps = {
            blogs: mockBlogs,
            slug: '',
            year: 2023,
        };
        render(<BlogMenuYear {...defaultProps} />);
        const yearLink = screen.getByText('2023');
        expect(yearLink).toHaveClass('open');
    });

    it('sets the link to blogs for 2023', () => {
        render(<BlogMenuYear {...defaultProps} />);
        const blog1 = screen.getByText('Blog 1');
        const blog2 = screen.getByText('Blog 2');
        expect(blog1).toBeInTheDocument();
        expect(blog2).toBeInTheDocument();
    });
   
    it('sets the link to blogs for 2023', () => {
        defaultProps.year = 2022;
        render(<BlogMenuYear {...defaultProps} />);
        const blog3 = screen.getByText('Blog 3');
        expect(blog3).toBeInTheDocument();
    });

});
