
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gallery } from '../src/components/Gallery';
import { Photo } from '../src/types';

// Mock imageLoader
vi.mock('../src/imageLoader', () => ({
    imageLoader: {
        getResponsiveImageUrl: (path: string) => path // Return path as is for testing
    }
}));

describe('Gallery Component', () => {
    const photos: Photo[] = [
        {
            id: 'p1',
            src: 'images/p1.jpg',
            thumbnail: 'images/p1-thumb.jpg',
            title: 'Photo 1',
            album: 'japan'
        },
        {
            id: 'p2',
            src: 'images/p2.jpg',
            thumbnail: 'images/p2-thumb.jpg',
            title: 'Photo 2',
            album: 'usa'
        }
    ];

    it('renders all photos', () => {
        render(<Gallery photos={photos} />);

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
        expect(images[0].getAttribute('src')).toBe('images/p1-thumb.jpg');
        expect(images[1].getAttribute('src')).toBe('images/p2-thumb.jpg');
    });

    it('displays album name in overlay', () => {
        render(<Gallery photos={photos} />);

        // The overlay might be hidden or shown on hover, but it's in the DOM
        expect(screen.getByText('japan')).toBeDefined();
        expect(screen.getByText('usa')).toBeDefined();
    });
});
