/**
 * Photo data loading and validation module.
 * Handles loading photos.json from the public directory and validating the data structure.
 * Requirements: 4.1, 4.2, 4.3
 */

import {
  GalleryConfig,
  Photo,
  Album,
  validateGalleryConfig,
  validatePhoto,
  validateAlbum,
} from "./types";

/**
 * Loads the gallery configuration from photos.json
 * Requirements: 4.1, 4.2, 4.3
 *
 * @returns Promise resolving to the loaded and validated GalleryConfig
 * @throws Error if photos.json cannot be loaded or parsed
 */
export async function loadGalleryConfig(): Promise<GalleryConfig> {
  try {
    // Get the base path for proper subdirectory support (GitHub Pages)
    const basePath = getBasePath();
    const configUrl = new URL(
      "photos.json",
      `${window.location.origin}${basePath}`,
    ).href;

    const response = await fetch(configUrl);
    if (!response.ok) {
      throw new Error(`Failed to load photos.json: ${response.statusText}`);
    }

    const data = await response.json();
    const validationResult = validateGalleryConfig(data);

    if (!validationResult.isValid) {
      throw new Error(
        `Invalid gallery configuration: ${validationResult.errors.join(", ")}`,
      );
    }

    return validationResult.data!;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Error loading gallery configuration: ${message}`);
    throw error;
  }
}

/**
 * Gets the base path for the application.
 * This supports GitHub Pages subdirectory deployments.
 * Requirements: 10.2
 *
 * @returns The base path (e.g., '/' or '/gallery/')
 */
function getBasePath(): string {
  // Check if there's a base element in the document
  const baseElement = document.querySelector("base");
  if (baseElement?.href) {
    const url = new URL(baseElement.href);
    return url.pathname;
  }

  // Fallback: use the current pathname to infer the base path
  // For GitHub Pages, the pathname will be /repository-name/
  const pathname = window.location.pathname;

  // If we're at the root, return '/'
  if (pathname === "/" || pathname === "") {
    return "/";
  }

  // Otherwise, return the pathname (which should be the base path)
  return pathname.endsWith("/") ? pathname : pathname + "/";
}

/**
 * Loads and validates photos from the gallery configuration.
 * Skips invalid photos and logs errors for each invalid photo.
 * Requirements: 4.1, 4.2, 4.3
 *
 * @param config - The gallery configuration containing photos
 * @returns Array of valid Photo objects
 */
export function loadAndValidatePhotos(config: GalleryConfig): Photo[] {
  const validPhotos: Photo[] = [];

  for (const photo of config.photos) {
    const validationResult = validatePhoto(photo);

    if (validationResult.isValid) {
      validPhotos.push(validationResult.data!);
    } else {
      const photoId =
        (photo as unknown as Record<string, unknown>)?.id || "unknown";
      console.error(
        `Invalid photo (id: ${photoId}): ${validationResult.errors.join(", ")}`,
      );
    }
  }

  return validPhotos;
}

/**
 * Loads and validates albums from the gallery configuration.
 * Skips invalid albums and logs errors for each invalid album.
 * Requirements: 4.1
 *
 * @param config - The gallery configuration containing albums
 * @returns Array of valid Album objects
 */
export function loadAndValidateAlbums(config: GalleryConfig): Album[] {
  const validAlbums: Album[] = [];

  for (const album of config.albums) {
    const validationResult = validateAlbum(album);

    if (validationResult.isValid) {
      validAlbums.push(validationResult.data!);
    } else {
      const albumId =
        (album as unknown as Record<string, unknown>)?.id || "unknown";
      console.error(
        `Invalid album (id: ${albumId}): ${validationResult.errors.join(", ")}`,
      );
    }
  }

  return validAlbums;
}

/**
 * Loads the complete gallery data including photos and albums.
 * Validates all data and skips invalid entries.
 * Requirements: 4.1, 4.2, 4.3
 *
 * @returns Promise resolving to an object containing valid photos and albums
 */
export async function loadGalleryData(): Promise<{
  photos: Photo[];
  albums: Album[];
  title: string;
  description: string;
}> {
  const config = await loadGalleryConfig();
  const photos = loadAndValidatePhotos(config);
  const albums = loadAndValidateAlbums(config);

  return {
    photos,
    albums,
    title: config.title,
    description: config.description
  };
}
