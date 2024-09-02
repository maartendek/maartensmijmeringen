import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlogMenuMonth, BlogMenuMonthProps } from './blog-menu-month';

const mockBlogs = [
    {
        published: '2023-08-01T00:00:00Z',
        slug: 'blog-1',
        title: 'Blog 1',
        html: 'body'
    },
    {
        published: '2023-08-15T00:00:00Z',
        slug: 'blog-2',
        title: 'Blog 2',
        html: 'body'
    }
];

const defaultProps: BlogMenuMonthProps = {
    blogs: mockBlogs,
    month: 7, // August (0-based index)
    slug: 'blog-1',
    year: 2023
};

describe('BlogMenuMonth component', () => {

    beforeEach(() => {
        render(
            <BlogMenuMonth {...defaultProps} />
        );
    })
    test('renders the month link with correct text', () => {
        const monthLink = screen.getByText('augustus');
        expect(monthLink).toBeInTheDocument();
    });

    test('toggles the blog list visibility on click', () => {
        const monthLink = screen.getByText('augustus');
        // should already be open because of slug
        expect(monthLink).toHaveClass('open');
        fireEvent.click(monthLink);
        expect(monthLink).toHaveClass('close');
        fireEvent.click(monthLink);
        expect(monthLink).toHaveClass('open');
    });

    test('toggles the blog list visibility on click without slug', () => {
        defaultProps.slug = '';

        const monthLink = screen.getByText('augustus');
        // should already be open because of slug
        expect(monthLink).toHaveClass('open');
        fireEvent.click(monthLink);
        expect(monthLink).toHaveClass('close');
        fireEvent.click(monthLink);
        expect(monthLink).toHaveClass('open');
    });
    

    test('renders the correct number of blogs', () => {
        const blogItems = screen.getAllByRole('listitem');
        // should have 3 li's
        // the month itself
        // and two blogs
        expect(blogItems).toHaveLength(3);
    });

    test('renders the blog links with correct attributes', () => {
        const blogLink = screen.getByText('Blog 1');
        expect(blogLink).toBeInTheDocument();
        expect(blogLink).toHaveAttribute('href', '/blog/blog-1');
    });
});
