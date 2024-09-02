import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './header';

describe('Header component', () => {

    beforeEach(() => render(
        <Header />
    ));

    test('renders the header', () => {
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();
    });

    test('renders the link to the homepage', () => {
        const linkElement = screen.getByRole('link', { name: /maartens mijmeringen/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/');
    });

    test('renders the image with correct attributes', () => {
        const imageElement = screen.getByAltText('Maartens mijmeringen');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', '/_next/image?url=%2Fmm_header3vlekken.jpg&w=1920&q=75');
        expect(imageElement).toHaveAttribute('width', '764');
        expect(imageElement).toHaveAttribute('height', '163');
    });
});
