// Configuration Astro du portfolio.
// Doc : https://docs.astro.build/fr/reference/configuration-reference/
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Mets ici l'adresse finale du site une fois le domaine acheté (sert aux balises de partage).
  site: 'https://samsonklougan.tech',

  // Chaque page devient un dossier : /developpeur/index.html, /graphiste/index.html
  build: { format: 'directory' },
});
