/**
 * Core data models and types for the photo gallery application.
 * Defines TypeScript interfaces with strict typing and validation functions.
 */

/**
 * Represents a single photo in the gallery.
 * Requirements: 4.1, 4.2, 8.2
 */
export interface Photo {
    id: string;
    src: string;
    srcWebP?: string;
    thumbnail: string;
    thumbnailWebP?: string;
    // Per-photo title/description removed (not used anymore)
    date?: string; // ISO 8601 format (YYYY-MM-DD)
    album: string;
}

/**
 * Represents an album (collection of related photos).
 * Requirements: 4.1
 */
export interface Album {
    id: string;
    name: string;
    description?: string;
}

/**
 * Represents the complete gallery configuration.
 * Requirements: 4.1
 */
export interface GalleryConfig {
    title: string;
    description: string;
    photos: Photo[];
    albums: Album[];
}

/**
 * Validation result type for error handling.
 */
export interface ValidationResult<T> {
    isValid: boolean;
    data?: T;
    errors: string[];
}

/**
 * Validates that a photo has all required fields.
 * Requirements: 4.2
 *
 * @param photo - The photo object to validate
 * @returns ValidationResult indicating if photo is valid and any errors
 */
export function validatePhoto(photo: unknown): ValidationResult<Photo> {
    const errors: string[] = [];

    if (!photo || typeof photo !== 'object') {
        return {
            isValid: false,
            errors: ['Photo must be an object'],
        };
    }

    const p = photo as Record<string, unknown>;

    // Check required fields
    // Note: per-photo `title` removed from requirements
    const requiredFields = ['id', 'src', 'thumbnail', 'album'];
    for (const field of requiredFields) {
        if (!(field in p) || p[field] === undefined || p[field] === null) {
            errors.push(`Missing required field: ${field}`);
        } else if (typeof p[field] !== 'string') {
            errors.push(`Field ${field} must be a string`);
        }
    }

    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    return {
        isValid: true,
        data: photo as Photo,
        errors: [],
    };
}

/**
 * Validates that an album has all required fields.
 * Requirements: 4.1
 *
 * @param album - The album object to validate
 * @returns ValidationResult indicating if album is valid and any errors
 */
export function validateAlbum(album: unknown): ValidationResult<Album> {
    const errors: string[] = [];

    if (!album || typeof album !== 'object') {
        return {
            isValid: false,
            errors: ['Album must be an object'],
        };
    }

    const a = album as Record<string, unknown>;

    // Check required fields
    if (!('id' in a) || a.id === undefined || a.id === null) {
        errors.push('Missing required field: id');
    } else if (typeof a.id !== 'string') {
        errors.push('Field id must be a string');
    }

    if (!('name' in a) || a.name === undefined || a.name === null) {
        errors.push('Missing required field: name');
    } else if (typeof a.name !== 'string') {
        errors.push('Field name must be a string');
    }

    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    return {
        isValid: true,
        data: album as Album,
        errors: [],
    };
}

/**
 * Validates that a gallery configuration has all required fields.
 * Requirements: 4.1
 *
 * @param config - The gallery config object to validate
 * @returns ValidationResult indicating if config is valid and any errors
 */
export function validateGalleryConfig(config: unknown): ValidationResult<GalleryConfig> {
    const errors: string[] = [];

    if (!config || typeof config !== 'object') {
        return {
            isValid: false,
            errors: ['Config must be an object'],
        };
    }

    const c = config as Record<string, unknown>;

    // Check required fields
    if (!('title' in c) || c.title === undefined || c.title === null) {
        errors.push('Missing required field: title');
    } else if (typeof c.title !== 'string') {
        errors.push('Field title must be a string');
    }

    if (!('description' in c) || c.description === undefined || c.description === null) {
        errors.push('Missing required field: description');
    } else if (typeof c.description !== 'string') {
        errors.push('Field description must be a string');
    }

    if (!('photos' in c) || !Array.isArray(c.photos)) {
        errors.push('Field photos must be an array');
    }

    if (!('albums' in c) || !Array.isArray(c.albums)) {
        errors.push('Field albums must be an array');
    }

    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    return {
        isValid: true,
        data: config as GalleryConfig,
        errors: [],
    };
}
