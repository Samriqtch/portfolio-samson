/**
 * Accès aux images du dossier src/assets/images par leur nom de fichier.
 * Dans les fichiers JSON de src/data, on écrit seulement le nom : "mobile-home.jpg".
 */
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

/** Renvoie l'image demandée, ou une erreur claire si le fichier n'existe pas. */
export function img(name: string): ImageMetadata {
  const file = files[`/src/assets/images/${name}`];
  if (!file) {
    throw new Error(`Image introuvable : "${name}". Vérifie qu'elle est bien dans src/assets/images/.`);
  }
  return file.default;
}

/** Version optimisée (WebP) d'une image, sans dépasser sa taille d'origine. */
export async function optimized(name: string, maxWidth: number, quality = 72): Promise<string> {
  const source = img(name);
  const result = await getImage({
    src: source,
    width: Math.min(source.width, maxWidth),
    format: 'webp',
    quality,
  });
  return result.src;
}

/** Deux versions d'un fond : une grande pour ordinateur, une petite pour téléphone. */
export async function background(name: string, large = 1600, small = 900) {
  return {
    large: await optimized(name, large, 68),
    small: await optimized(name, small, 62),
  };
}

/** Style CSS qui expose un fond en variables --bg-lg et --bg-sm. */
export function backgroundStyle(bg: { large: string; small: string }): string {
  return `--bg-lg:url("${bg.large}");--bg-sm:url("${bg.small}")`;
}

/**
 * Fond chargé seulement quand la section approche de l'écran (sections plus bas dans la page).
 * À mettre sur la section : <section {...lazyBackground(bg)}>
 */
export function lazyBackground(bg: { large: string; small: string }) {
  return { 'data-bg-lg': bg.large, 'data-bg-sm': bg.small };
}
