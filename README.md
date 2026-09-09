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

- présentation des expertises et services Data & BI.
- parcours professionnel et études de cas détaillées.
- interface responsive avec animations adaptées au défilement.
- navigation clavier et prise en charge de `prefers-reduced-motion`.
- versions française et anglaise, avec choix de langue conservé pendant la navigation.
- mode couleurs accessibles mémorisé dans le navigateur.
- formulaire de contact avec validation serveur, protection antispam et envoi
  par Resend.
- métadonnées, sitemap, `robots.txt`, manifeste et image Open Graph.

## Stack technique

- Next.js 16 avec App Router.
- React 19 et TypeScript.
- Motion pour les animations.
- Zod pour la validation serveur.
- Resend pour les e-mails.
- CSS et Tailwind CSS 4.

Les versions exactes sont définies dans `package.json` et verrouillées dans
`package-lock.json`.

## Langues et couleurs accessibles

Le sélecteur **FR / EN** reste disponible sur ordinateur et dans le menu mobile.
Il ouvre la même page dans l’autre langue en conservant les paramètres et l’ancre.
Les deux versions partagent les mêmes pages et les mêmes slugs d’études de cas,
avec un contenu traduit et un préfixe de langue : `/fr/projets` et `/en/projets`,
par exemple. Les liens vers le CV et les services externes ne sont pas modifiés.
Le CV téléchargeable reste le PDF français fourni.

Les anciennes URL sans préfixe redirigent vers leur version française avec un
statut **308**. L’accueil `/` utilise une redirection **307** vers la langue
mémorisée, ou vers `/fr` sans préférence. La langue du navigateur n’impose aucune
redirection automatique. Chaque page localisée possède ses métadonnées, son
URL canonique et ses liens `hreflang`.

Le réglage **Couleurs accessibles** conserve l’identité sombre du site et renforce
les contrastes, les contours, les soulignements et les indications textuelles.
Les états actifs, erreurs et confirmations restent compréhensibles autrement
que par la couleur. Il s’agit d’une palette et de repères d’interface adaptés,
sans filtre appliqué à toute la page.

| Préférence | Mémorisation |
| --- | --- |
| Langue | Cookie `portfolio-locale`, enregistré lors d’un choix explicite, pendant un an. |
| Couleurs | Stockage local `portfolio-colors`, valeur `default` ou `accessible`, jusqu’à son effacement dans le navigateur. |

Le mode de couleurs enregistré est restauré avant le premier affichage pour
éviter un changement de palette visible. Ces réglages ne servent ni à la mesure
d’audience ni au suivi publicitaire. Leur fonctionnement est décrit dans la
politique de confidentialité.

## Installation locale

### Prérequis

- Node.js 20.9 ou plus récent.
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

Les valeurs locales d’exemple sont documentées dans `.env.example`.

| Variable | Utilisation |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origine HTTPS utilisée pour les URL canoniques, le sitemap et `robots.txt`. |
| `SITE_ENV` | Active l’indexation uniquement avec la valeur `production`. Toute preview doit utiliser `preview`. |
| `RESEND_API_KEY` | Clé privée Resend utilisée uniquement par la route serveur de contact. |
| `CONTACT_EMAIL` | Adresse destinataire des demandes. |
| `CONTACT_FROM_EMAIL` | Expéditeur associé à un domaine vérifié dans Resend. |

Ne jamais committer `.env.local`. Les secrets serveur ne doivent pas utiliser le
préfixe `NEXT_PUBLIC_`.

## Scripts disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement. |
| `npm run lint` | Vérifie le code avec ESLint. |
| `npm run typecheck` | Vérifie les types TypeScript. |
| `npm test` | Lance les tests automatisés avec le moteur de test de Node.js. |
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
| `data/legal-config.ts` | Informations légales et de confidentialité centralisées. |
| `i18n/content.ts` | Sélection des données françaises ou anglaises avec `getContent(locale)`. |
| `i18n/content/en/` et `i18n/content/en.ts` | Traductions anglaises du profil, des services, de la FAQ et des études de cas. |
| `i18n/messages/` | Textes FR/EN de l’interface, des métadonnées, du formulaire et des pages légales. |
| `public/cv-christopher-vallot.pdf` | CV proposé au téléchargement. |
| `assets/photo-profil-christopher-vallot.webp` | Portrait affiché sur le site. |

Les routes des études de cas sont générées à partir des slugs déclarés dans
`data/projects.ts`.

Les pages partagent leurs composants dans `app/[locale]/`. Les règles d’URL
sont centralisées dans `i18n/config.ts` et les redirections dans `proxy.ts`.
Le registre `i18n/routes.ts` alimente le sitemap et distingue les pages existantes
des URL inconnues, qui conservent un statut HTTP 404 et un affichage traduit.
Lors de l’ajout d’une page, mettre ce registre à jour. Les nouvelles études de cas
y sont ajoutées automatiquement depuis `data/projects.ts`.
Pour modifier un texte, conserver la version française dans sa source puis
mettre à jour son équivalent anglais. Les noms propres, technologies et slugs
doivent rester identiques dans les deux langues. Les styles du mode couleurs
accessibles se trouvent dans `styles/accessibility.css`.

## Déploiement Netlify

Netlify détecte automatiquement Next.js. Le projet utilise le rendu Next.js
standard et la route serveur `/api/contact`, il ne doit donc pas être converti
en export statique.

### 1. Relier le dépôt

1. Dans Netlify, choisir **Add new site**, puis **Import an existing project**.
2. Relier GitHub et sélectionner ce dépôt.
3. Conserver la détection Next.js avec les réglages suivants.

| Réglage | Valeur |
| --- | --- |
| Branche de production | `main` |
| Base directory | vide |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Version de Node.js | version Netlify compatible avec la contrainte `>=20.9.0` de `package.json` |

Aucun plugin Next.js ni fichier `netlify.toml` n’est nécessaire pour cette
configuration.

### 2. Configurer les variables Netlify

Ajouter les variables dans **Site configuration > Environment variables**.
Ne jamais saisir de secret dans le dépôt ou dans `netlify.toml`.

| Variable | Valeur attendue | Contextes | Scope |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL principale du site, d’abord `https://<nom-du-site>.netlify.app`, puis le domaine personnalisé | Tous | Builds |
| `SITE_ENV` | `production` | Production uniquement | Builds |
| `SITE_ENV` | `preview` | Deploy Previews et Branch Deploys | Builds |
| `RESEND_API_KEY` | Clé privée Resend | Production uniquement | Functions |
| `CONTACT_EMAIL` | Adresse destinataire réelle | Production uniquement | Functions |
| `CONTACT_FROM_EMAIL` | Expéditeur sur un domaine vérifié dans Resend | Production uniquement | Functions |

`NEXT_PUBLIC_SITE_URL` doit toujours contenir l’URL publique principale, y
compris pendant les builds de preview. Ne pas utiliser `DEPLOY_PRIME_URL`, qui
produirait des URL canoniques temporaires.

### 3. Publier puis raccorder le domaine

1. Lancer le premier déploiement et vérifier l’URL principale en `.netlify.app`.
2. Tester les routes, le formulaire, `/robots.txt` et `/sitemap.xml`.
3. Ajouter le domaine personnalisé dans **Domain management** et configurer le
   DNS selon les instructions de Netlify.
4. Remplacer `NEXT_PUBLIC_SITE_URL` par le domaine HTTPS final.
5. Relancer un déploiement de production, puis vérifier les URL canoniques,
   Open Graph, `robots.txt` et le sitemap sur ce domaine.

Les Deploy Previews et Branch Deploys restent non indexables grâce à
`SITE_ENV=preview` et au contrôle du contexte Netlify dans l’application.

### Vérifications avant publication

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Avant la mise en ligne publique :

- confirmer les coordonnées légales requises pour l’éditeur et l’hébergeur.
- définir la règle de conservation appliquée aux e-mails reçus.
- vérifier le CV, les liens LinkedIn et les cinq études de cas.
- configurer puis tester l’envoi Resend avec un domaine vérifié.
- contrôler le formulaire, `/robots.txt` et `/sitemap.xml` sur le domaine final.
- parcourir les pages en FR et EN, dans les modes normal et couleurs accessibles,
  et vérifier les deux réglages au clavier et sur mobile.
- relire les pages légales et la politique de confidentialité avant publication.

La limitation de débit du formulaire est stockée en mémoire. Pour un déploiement
sur plusieurs instances, prévoir une limitation distribuée ou une règle WAF.

## Licence

Le code source est distribué sous licence MIT. Voir `LICENSE`.

Cette licence ne transfère pas les droits relatifs aux contenus personnels, au
CV, à la photographie ou aux éléments de marque présents dans ce dépôt.
