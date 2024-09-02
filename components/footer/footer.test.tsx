import { render } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
    it('renders the copyright text', () => {
        const { getByText } = render(<Footer />);
        expect(getByText('Door Maarten Dekker', { })).toBeInTheDocument();
    });

    it('renders the date', () => {
        const date = "2024-05-04"
        const { getByText } = render(<Footer date={new Date(date).toDateString()} />);
        expect(getByText('Door Maarten Dekker op 4-5-2024', { })).toBeInTheDocument();
    });
});
