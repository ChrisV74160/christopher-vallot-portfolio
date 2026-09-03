# Portfolio Consultant Data & BI Freelance — Christopher Vallot

Portfolio professionnel de Christopher Vallot, Consultant Data & BI freelance
spécialisé dans la transformation, la fiabilisation et l’automatisation des
données avec Python, SQL et Power BI.

Le site présente mes services, mon parcours et cinq études de cas issues de mes
expériences professionnelles, sans divulguer de données internes ou
confidentielles.

- [Profil LinkedIn](https://www.linkedin.com/in/christopher-vallot/)
- [Dépôt GitHub](https://github.com/ChrisV74160/christopher-vallot-portfolio)

## Fonctionnalités

- présentation des expertises et services Data & BI ;
- parcours professionnel et études de cas détaillées ;
- interface responsive avec animations adaptées au défilement ;
- navigation clavier et prise en charge de `prefers-reduced-motion` ;
- formulaire de contact avec validation serveur, protection antispam et envoi
  par Resend ;
- métadonnées, sitemap, `robots.txt`, manifeste et image Open Graph.

## Stack technique

- Next.js 16 avec App Router ;
- React 19 et TypeScript ;
- Motion pour les animations ;
- Zod pour la validation serveur ;
- Resend pour les e-mails ;
- CSS et Tailwind CSS 4.

Les versions exactes sont définies dans `package.json` et verrouillées dans
`package-lock.json`.

## Installation locale

### Prérequis

- Node.js 20.9 ou plus récent ;
- npm.

### Démarrage

```bash
git clone https://github.com/ChrisV74160/christopher-vallot-portfolio.git
cd christopher-vallot-portfolio
npm ci
```

Créer ensuite le fichier d’environnement local.

Sous Windows PowerShell :

```powershell
Copy-Item .env.example .env.local
```

Sous macOS ou Linux :

```bash
cp .env.example .env.local
```

Lancer le serveur :

```bash
npm run dev
```

Le site est alors disponible sur <http://localhost:3000>.

Sans configuration Resend, le formulaire peut être validé en développement,
mais aucun e-mail n’est envoyé.

## Variables d’environnement

Les valeurs attendues sont documentées dans `.env.example`.

| Variable | Utilisation |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique du site. Utiliser le domaine HTTPS final en production. |
| `SITE_ENV` | Conserver `preview` en local et en prévisualisation. Utiliser `production` uniquement sur le site public. |
| `RESEND_API_KEY` | Clé privée Resend nécessaire à l’envoi des messages. |
| `CONTACT_EMAIL` | Adresse qui reçoit les demandes envoyées depuis le formulaire. |
| `CONTACT_FROM_EMAIL` | Expéditeur du message, idéalement associé à un domaine vérifié dans Resend. |

Ne jamais committer `.env.local`. Les secrets serveur ne doivent pas utiliser le
préfixe `NEXT_PUBLIC_`.

## Scripts disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement. |
| `npm run lint` | Vérifie le code avec ESLint. |
| `npm run typecheck` | Vérifie les types TypeScript. |
| `npm run build` | Génère le build de production. |
| `npm start` | Démarre le build de production. |

## Modifier le contenu

Les principales sources de contenu sont centralisées :

| Fichier | Contenu |
| --- | --- |
| `data/profile.ts` | Profil, coordonnées, parcours et compétences. |
| `data/projects.ts` | Études de cas. |
| `data/services.ts` | Services et formats de mission. |
| `data/faq.ts` | Questions fréquentes. |
| `data/placeholders.ts` | Informations légales restant à confirmer. |
| `public/cv-christopher-vallot.pdf` | CV proposé au téléchargement. |
| `assets/photo-profil-christopher-vallot.webp` | Portrait affiché sur le site. |

Les routes des études de cas sont générées à partir des slugs déclarés dans
`data/projects.ts`.

## Déploiement

Le projet peut être déployé sur Vercel ou sur tout hébergeur compatible avec
Next.js et Node.js.

1. Importer le dépôt GitHub dans la plateforme choisie.
2. Configurer les variables d’environnement.
3. Définir `NEXT_PUBLIC_SITE_URL` avec le domaine HTTPS définitif.
4. Garder `SITE_ENV=preview` sur les déploiements de test.
5. Utiliser `SITE_ENV=production` uniquement pour la version publique validée.

La route `/api/contact` nécessite un runtime serveur. Un hébergement entièrement
statique, comme GitHub Pages seul, ne permet pas d’utiliser le formulaire dans
sa configuration actuelle.

### Vérifications avant publication

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

Avant la mise en ligne publique :

- remplacer toutes les valeurs `[À COMPLÉTER]` de `data/placeholders.ts` ;
- vérifier le CV, les liens LinkedIn et les cinq études de cas ;
- configurer puis tester l’envoi Resend avec un domaine vérifié ;
- contrôler le formulaire, `/robots.txt` et `/sitemap.xml` sur le domaine final ;
- vérifier les pages légales et la politique de confidentialité.

La limitation de débit du formulaire est stockée en mémoire. Pour un déploiement
sur plusieurs instances, prévoir une limitation distribuée ou une règle WAF.

## Licence

Le code source est distribué sous licence MIT. Voir `LICENSE`.

Cette licence ne transfère pas les droits relatifs aux contenus personnels, au
CV, à la photographie ou aux éléments de marque présents dans ce dépôt.
