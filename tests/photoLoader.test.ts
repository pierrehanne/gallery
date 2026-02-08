
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadGalleryConfig, loadAndValidatePhotos, loadGalleryData } from '../src/photoLoader';

// Mock fetch
const globalFetch = global.fetch;
const mockFetch = vi.fn();

describe('photoLoader', () => {
    beforeEach(() => {
        global.fetch = mockFetch;
        vi.resetAllMocks();
    });

    afterEach(() => {
        global.fetch = globalFetch;
    });

    const validConfig = {
        title: "Test Gallery",
        description: "A test gallery",
        albums: [
            { id: "japan", name: "Japan", description: "Japan photos" },
            { id: "usa", name: "USA", description: "USA photos" }
        ],
        photos: [
            {
                id: "p1",
                src: "images/p1.jpg",
                thumbnail: "images/p1-thumb.jpg",
                title: "Photo 1",
                album: "japan",
                // description and date are optional now
            },
            {
                id: "p2",
                src: "images/p2.jpg",
                thumbnail: "images/p2-thumb.jpg",
                title: "Photo 2",
                album: "usa",
                description: "With description",
                date: "2023-01-01"
            }
        ]
    };

    it('loads and validates gallery config successfully', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => validConfig
        });

        const config = await loadGalleryConfig();
        expect(config.title).toBe("Test Gallery");
        expect(config.photos).toHaveLength(2);
        expect(config.albums).toHaveLength(2);
    });

    it('loads gallery data correctly including optional fields', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => validConfig
        });

        const data = await loadGalleryData();

        expect(data.photos).toHaveLength(2);
        expect(data.albums).toHaveLength(2);
        expect(data.title).toBe("Test Gallery");
        expect(data.description).toBe("A test gallery");

        // Check optional fields
        const photo1 = data.photos.find(p => p.id === 'p1');
        expect(photo1?.description).toBeUndefined();
        expect(photo1?.date).toBeUndefined();

        const photo2 = data.photos.find(p => p.id === 'p2');
        expect(photo2?.description).toBe("With description");
        expect(photo2?.date).toBe("2023-01-01");
    });

    it('handles fetch errors', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Not Found'
        });

        await expect(loadGalleryConfig()).rejects.toThrow('Failed to load photos.json');
    });

    it('validates photos and skips invalid ones', () => {
        const invalidConfig = {
            ...validConfig,
            photos: [
                ...validConfig.photos,
                {
                    id: "invalid1",
                    // missing src
                    thumbnail: "thumb.jpg",
                    title: "Invalid",
                    album: "japan"
                } as { id: string; thumbnail: string; title: string; album: string }
            ]
        };

        const validPhotos = loadAndValidatePhotos(invalidConfig);
        expect(validPhotos).toHaveLength(2); // Should skip the invalid one
    });
});
