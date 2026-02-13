
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import * as photoLoader from '../src/photoLoader';

// Mock components
vi.mock('../src/components/Gallery', () => ({
    Gallery: ({ photos }: { photos: unknown[] }) => <div data-testid="gallery">Gallery with {photos.length} photos</div>
}));

vi.mock('../src/components/Filter', () => ({
    Filter: ({ albums, selectedAlbum, onAlbumChange }: { albums: unknown[]; selectedAlbum: string | null; onAlbumChange: (album: string) => void }) => (
        <div data-testid="filter">
            Filter with {albums.length} albums. Selected: {selectedAlbum || 'all'}
            <button onClick={() => onAlbumChange('japan')}>Select Japan</button>
        </div>
    )
}));

// Mock photoLoader
vi.mock('../src/photoLoader', () => ({
    loadGalleryData: vi.fn()
}));

describe('App Component', () => {
    const mockData = {
        photos: [
            { id: 'p1', src: 'p1.jpg', thumbnail: 'p1t.jpg', title: 'P1', album: 'japan' },
            { id: 'p2', src: 'p2.jpg', thumbnail: 'p2t.jpg', title: 'P2', album: 'usa' }
        ],
        albums: [
            { id: 'japan', name: 'Japan' },
            { id: 'usa', name: 'USA' }
        ],
        title: "Test Gallery Title",
        description: "Test Description"
    };

    beforeEach(() => {
        vi.resetAllMocks();
        vi.mocked(photoLoader.loadGalleryData).mockResolvedValue(mockData);
    });

    it('renders loading state initially', () => {
        render(<App />);
        expect(screen.getByText('Loading gallery...')).toBeDefined();
    });

    it('renders gallery with loaded data', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Test Gallery Title')).toBeDefined();
        });

        expect(document.title).toBe("Test Gallery Title");
        expect(screen.getByText('Test Description')).toBeDefined();

        // Check Gallery prop
        expect(screen.getByTestId('gallery').textContent).toBe('Gallery with 2 photos');

        // Check Filter prop
        expect(screen.getByTestId('filter').textContent).toContain('Filter with 2 albums');
    });

    it('filters photos when album is selected', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Test Gallery Title')).toBeDefined();
        });

        // Click filter button (mocked)
        screen.getByText('Select Japan').click();

        await waitFor(() => {
            // Gallery should now receive only 1 photo
            expect(screen.getByTestId('gallery').textContent).toBe('Gallery with 1 photos');
        });
    });

    it('handles load error', async () => {
        vi.mocked(photoLoader.loadGalleryData).mockRejectedValue(new Error('Load failed'));

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Load failed')).toBeDefined();
        });
    });
});
