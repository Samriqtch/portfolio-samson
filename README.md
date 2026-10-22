# Portfolio Samson Klougan

Site portfolio de **Samson Klougan** (Dream Conception, Lomé), en deux univers :

- `/developpeur/` : projets web, boîte à outils, parcours
- `/graphiste/` : affiches, identités visuelles, pages gérées, vidéos, parcours

Construit avec [Astro](https://astro.build) : le site final est du HTML/CSS statique, très léger, avec les images converties automatiquement en WebP.

---

## 1. Installer le projet sur ton ordinateur

Il faut **Node.js 22.12 ou plus récent** ([nodejs.org](https://nodejs.org), version LTS). Vérifie avec `node -v`.

```bash
npm install        # une seule fois, installe Astro
npm run dev        # lance le site sur http://localhost:4321
```

Pendant que `npm run dev` tourne, chaque modification s'affiche tout de suite dans le navigateur.

## 2. Où modifier quoi

```
src/
├── data/                 ← TOUS LES TEXTES ET CONTENUS (fichiers JSON)
│   ├── projets.json          projets dev
│   ├── outils.json           boîte à outils dev
│   ├── parcours-dev.json     parcours côté dev
│   ├── parcours-graphiste.json
│   ├── affiches.json         galerie d'affiches
│   ├── identites.json        identités visuelles (planches)
│   ├── communication.json    projets de communication
│   ├── clients.json          liste des clients
│   ├── pages-gerees.json     pages réseaux sociaux + résultats
│   ├── evenements.json       couverture d'événements
│   ├── videos.json           vidéos
│   ├── chiffres.json         compteurs (100+, 5 800+…)
│   ├── metiers.json          les 4 métiers
│   ├── textes.json           textes d'accueil, intros, à propos, contacts
│   └── contact.json          WhatsApp, téléphone, e-mail, réseaux
├── assets/images/        ← toutes les images (optimisées automatiquement)
├── components/           ← une section = un fichier .astro (HTML + CSS)
│   ├── dev/                  sections de la page développeur
│   ├── design/               sections de la page graphiste
│   └── shared/               parcours, à propos, contact, visionneuse…
├── pages/                ← les 3 pages : index, developpeur, graphiste
└── styles/global.css     ← couleurs, polices, boutons communs
public/
├── videos/               ← fichiers vidéo (copiés tels quels)
└── favicon.svg
```

### Ajouter une affiche

1. Mets l'image dans `src/assets/images/` (JPG ou PNG, nom sans espaces ni accents : `club-malt-noel.jpg`).
2. Ajoute une ligne dans `src/data/affiches.json` :

```json
{ "image": "club-malt-noel.jpg", "client": "Club Malt", "type": "Affiche de Noël" }
```

Les 12 premières affiches de la liste sont visibles directement, les autres apparaissent avec le bouton « Afficher toutes les affiches ».

### Ajouter un projet dev

Ajoute un bloc dans `src/data/projets.json` (et la capture dans `src/assets/images/`) :

```json
{
  "titre": "Nom du projet",
  "type": "Site vitrine",
  "enCours": false,
  "description": "Ce que fait le projet, pour qui.",
  "technos": ["Laravel", "MySQL"],
  "lien": "https://lien-du-site.com",
  "image": "capture-projet.jpg",
  "alt": "Description de la capture"
}
```

Mets `"lien": null` s'il n'y a pas de site en ligne, et `"enCours": true` pour afficher le badge « En cours ».

### Ajouter une identité visuelle

Dans `src/data/identites.json` : `planches` est la liste des images, dans l'ordre. La première sert de vignette.

### Changer un chiffre ou un texte

Tout est dans `src/data/`. Exemple : le nombre d'abonnés d'une page est dans `pages-gerees.json`.

> Si une image citée dans un JSON n'existe pas, le build s'arrête avec le message
> `Image introuvable : "nom.jpg"`. Vérifie alors le nom du fichier.

## 3. Construire la version finale

```bash
npm run build      # crée le dossier dist/
npm run preview    # pour vérifier le résultat avant de le mettre en ligne
```

C'est **le contenu du dossier `dist/`** qu'on met en ligne.

## 4. Mettre en ligne sur le VPS Hostinger (CloudPanel)

### Première mise en ligne

1. **Domaine** : dans la zone DNS du domaine, deux enregistrements **A** (`@` et `www`) vers l'IP du VPS.
2. **CloudPanel** → *Sites* → *Add Site* → *Create a Static HTML Site* : le domaine, et un **Site User** dédié (ex. `portfolio`).
3. Lance `npm run build`, puis envoie **le contenu** de `dist/` dans `/home/portfolio/htdocs/ton-domaine/`
   avec FileZilla (SFTP, port 22, identifiants du Site User) ou le gestionnaire de fichiers de CloudPanel.
4. **CloudPanel** → ton site → *SSL/TLS* → *Actions* → *New Let's Encrypt Certificate*.

### Mettre à jour

Modifie → `npm run build` → renvoie le contenu de `dist/` (FileZilla remplace les fichiers modifiés).

### Option : mise à jour automatique avec GitHub

Le fichier `.github/workflows/deploy.yml` construit le site et l'envoie sur le VPS depuis GitHub.
Dans ton dépôt GitHub → *Settings* → *Secrets and variables* → *Actions*, crée ces secrets :

| Secret | Valeur |
| --- | --- |
| `VPS_HOST` | l'IP du VPS |
| `VPS_USER` | le Site User CloudPanel (ex. `portfolio`) |
| `VPS_PATH` | `/home/portfolio/htdocs/ton-domaine/` |
| `VPS_SSH_KEY` | une clé SSH privée dont la clé publique est ajoutée au Site User (CloudPanel → ton site → *SSH/FTP*) |

Ensuite, onglet *Actions* → *Déploiement* → *Run workflow*. Pour un déploiement automatique à chaque `git push`,
décommente les lignes `push:` en haut du fichier.

## 5. Mettre le projet sur GitHub

```bash
git init
git add .
git commit -m "Portfolio Samson Klougan"
git branch -M main
git remote add origin https://github.com/Samriqtch/portfolio-samson.git
git push -u origin main
```

(Crée d'abord le dépôt vide `portfolio-samson` sur github.com.)

---

Icônes : [Lucide](https://lucide.dev) (ISC) et [Simple Icons](https://simpleicons.org) (CC0). Polices : Archivo et JetBrains Mono (SIL Open Font License), hébergées dans le site.
