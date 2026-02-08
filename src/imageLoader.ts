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
    getResponsiveImageUrl(imagePath: string, _context?: 'thumbnail' | 'fullsize'): string {
        // If the path is already absolute or a data URL, return as-is
        if (imagePath.startsWith('/') || imagePath.startsWith('data:') || imagePath.startsWith('http')) {
            return imagePath;
        }

        // Get the base path from the document
        const basePath = this.getBasePath();

        // Combine base path with image path
        return basePath + imagePath;
    }

    /**
     * Gets the base path for the application.
     * This supports GitHub Pages subdirectory deployments.
     *
     * @returns The base path (e.g., '/' or '/gallery/')
     */
    private getBasePath(): string {
        // Check if there's a base element in the document
        const baseElement = document.querySelector('base');
        if (baseElement?.href) {
            const url = new URL(baseElement.href);
            return url.pathname;
        }

        // Fallback: use the current pathname to infer the base path
        // For GitHub Pages, the pathname will be /repository-name/
        const pathname = window.location.pathname;

        // If we're at the root, return '/'
        if (pathname === '/' || pathname === '') {
            return '/';
        }

        // Otherwise, return the pathname (which should be the base path)
        return pathname.endsWith('/') ? pathname : pathname + '/';
    }
}

/**
 * Global image loader instance
 */
export const imageLoader = new ImageLoader();
