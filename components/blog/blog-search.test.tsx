import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlogSearch, BlogSearchProps } from './blog-search';
import { Blog } from './types';

const mockBlogs: Blog[] = [
    { title: 'First Blog', slug: 'first-blog', html: '', published: '2023-01-15T00:00:00Z', },
    { title: 'Second Blog', slug: 'second-blog', html: '', published: '2023-01-15T00:00:00Z', },
    { title: 'Another Blog', slug: 'another-blog', html: '', published: '2023-01-15T00:00:00Z', },
];

// Mock useRouter:
jest.mock("next/navigation", () => ({
    usePathname() {
        return {
            prefetch: () => null
        };
    },
    useRouter() {
        return {
            prefetch: () => null,
            push: () => null,
        };
    },
    useSearchParams() {
        return {
            prefetch: () => null,
            get: () => "",
        };
    }
}));
  
const renderComponent = (props: Partial<BlogSearchProps> = {}) => {
    const defaultProps: BlogSearchProps = {
        blogs: mockBlogs,
        ...props,
    };
    return render(<BlogSearch {...defaultProps} />);
};

describe('BlogSearch', () => {
    test('renders search input and blog list', () => {
        renderComponent();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.queryByText('First Blog')).not.toBeInTheDocument();
        expect(screen.queryByText('Second Blog')).not.toBeInTheDocument();
        expect(screen.queryByText('Another Blog')).not.toBeInTheDocument();
    });

    test('filters blogs based on search input', () => {
        renderComponent();
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'First' } });
        expect(screen.getByText('First Blog')).toBeInTheDocument();
        expect(screen.queryByText('Second Blog')).not.toBeInTheDocument();
        expect(screen.queryByText('Another Blog')).not.toBeInTheDocument();
    });

    test('sorts blogs alphabetically', () => {
        renderComponent();
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Blog' } });
        const blogTitles = screen.getAllByRole('link').map(link => link.textContent);
        expect(blogTitles).toEqual(['Another Blog', 'First Blog', 'Second Blog']);
    });

    test('handles empty search input', () => {
        renderComponent();
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '' } });
        expect(screen.queryByText('First Blog')).not.toBeInTheDocument();
        expect(screen.queryByText('Second Blog')).not.toBeInTheDocument();
        expect(screen.queryByText('Another Blog')).not.toBeInTheDocument();
    });
});
