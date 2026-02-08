import { memo } from 'react';
import { Album } from '../types';
import { motion } from 'framer-motion';

interface FilterProps {
    albums: Album[];
    selectedAlbum: string | null;
    onAlbumChange: (albumId: string | null) => void;
}

export const Filter = memo(function Filter({
    albums,
    selectedAlbum,
    onAlbumChange
}: FilterProps) {
    return (
        <div className="filter-container">
            <div className="filter-albums">
                <motion.button
                    className={selectedAlbum === null ? 'active' : ''}
                    onClick={() => onAlbumChange(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Show all photos"
                >
                    All Photos
                </motion.button>
                {albums.map(album => (
                    <motion.button
                        key={album.id}
                        className={selectedAlbum === album.id ? 'active' : ''}
                        onClick={() => onAlbumChange(album.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Filter by ${album.name}`}
                    >
                        {album.name}
                    </motion.button>
                ))}
            </div>
        </div>
    );
});
