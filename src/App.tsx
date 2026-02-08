import { useState, useEffect, useMemo, useCallback } from 'react';
import { Gallery } from './components/Gallery';
import { Filter } from './components/Filter';
import { ThemeToggle } from './components/ThemeToggle';
import { Photo, Album } from './types';
import { loadGalleryData } from './photoLoader';

function App() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [title, setTitle] = useState('Photo Gallery');
    const [description, setDescription] = useState('A collection of beautiful moments');
    const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                const data = await loadGalleryData();
                if (isMounted) {
                    setPhotos(data.photos);
                    setAlbums(data.albums);
                    setTitle(data.title);
                    setDescription(data.description);
                    document.title = data.title;
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load gallery data');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }
        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleAlbumChange = useCallback((albumId: string | null) => {
        setSelectedAlbum(albumId);
    }, []);

    const filteredPhotos = useMemo(() => {
        if (!selectedAlbum) {
            return photos;
        }
        return photos.filter(p => p.album === selectedAlbum);
    }, [photos, selectedAlbum]);

    if (loading) return <div className="loading">Loading gallery...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="app-container">
            <div className="theme-toggle-container">
                <ThemeToggle />
            </div>

            <header className="app-header">
                <h1>{title}</h1>
                <p>{description}</p>
            </header>

            <Filter
                albums={albums}
                selectedAlbum={selectedAlbum}
                onAlbumChange={handleAlbumChange}
            />

            <Gallery photos={filteredPhotos} />
        </div>
    );
}

export default App;
