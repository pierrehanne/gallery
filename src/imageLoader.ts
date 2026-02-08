/**
 * Image Loader Utility
 * Simplified utility for resolving image paths with GitHub Pages subdirectory support.
 */

/**
 * Image loader utility for handling image path resolution.
 */
export class ImageLoader {
    /**
     * Resolves image paths with the base path for GitHub Pages subdirectory support.
     *
     * @param imagePath - The image path (relative or absolute)
     * @returns The resolved image path
     */
    getResponsiveImageUrl(imagePath: string): string {
        // If the path is already absolute or a data URL, return as-is
        if (imagePath.startsWith('/') || imagePath.startsWith('data:') || imagePath.startsWith('http')) {
            return imagePath;
        }

        // Use Vite's base URL for proper subdirectory support
        return `${import.meta.env.BASE_URL}${imagePath}`;
    }
}

/**
 * Global image loader instance
 */
export const imageLoader = new ImageLoader();
