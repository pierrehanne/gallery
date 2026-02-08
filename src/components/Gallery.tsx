import { memo } from 'react';
import { Photo } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { imageLoader } from '../imageLoader';

interface GalleryProps {
    photos: Photo[];
}

export const Gallery = memo(function Gallery({ photos }: GalleryProps) {
    return (
        <motion.div
            className="gallery-masonry"
            layout
        >
            <AnimatePresence mode='popLayout'>
                {photos.map((photo) => (
                    <motion.div
                        key={photo.id}
                        className="gallery-item"
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -8 }}
                    >
                        <img
                            src={imageLoader.getResponsiveImageUrl(photo.thumbnail)}
                            alt={`${photo.album} photo`}
                            loading="lazy"
                            className="gallery-image"
                        />
                        <div className="gallery-overlay">
                            <h3>{photo.album}</h3>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
});
