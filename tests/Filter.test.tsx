
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Filter } from '../src/components/Filter';
import { Album } from '../src/types';

describe('Filter Component', () => {
    const albums: Album[] = [
        { id: 'japan', name: 'Japan', description: 'Japan photos' },
        { id: 'usa', name: 'USA', description: 'USA photos' }
    ];

    it('renders "All Photos" button and album buttons', () => {
        render(
            <Filter
                albums={albums}
                selectedAlbum={null}
                onAlbumChange={() => { }}
            />
        );

        expect(screen.getByText('All Photos')).toBeDefined();
        expect(screen.getByText('Japan')).toBeDefined();
        expect(screen.getByText('USA')).toBeDefined();
    });

    it('highlights the selected album', () => {
        const { rerender } = render(
            <Filter
                albums={albums}
                selectedAlbum={null}
                onAlbumChange={() => { }}
            />
        );

        // "All Photos" should be active initially
        expect(screen.getByText('All Photos').className).toContain('active');

        // Select 'Japan'
        rerender(
            <Filter
                albums={albums}
                selectedAlbum="japan"
                onAlbumChange={() => { }}
            />
        );
        expect(screen.getByText('Japan').className).toContain('active');
        expect(screen.getByText('All Photos').className).not.toContain('active');
    });

    it('calls onAlbumChange when a button is clicked', () => {
        const handleAlbumChange = vi.fn();
        render(
            <Filter
                albums={albums}
                selectedAlbum={null}
                onAlbumChange={handleAlbumChange}
            />
        );

        fireEvent.click(screen.getByText('USA'));
        expect(handleAlbumChange).toHaveBeenCalledWith('usa');

        fireEvent.click(screen.getByText('All Photos'));
        expect(handleAlbumChange).toHaveBeenCalledWith(null);
    });
});
