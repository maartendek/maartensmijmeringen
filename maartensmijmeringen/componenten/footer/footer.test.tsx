import { render } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
    it('renders the copyright text', () => {
        const { getByText } = render(<Footer />);
        expect(getByText('© Maarten Dekker')).toBeInTheDocument();
    });
});
