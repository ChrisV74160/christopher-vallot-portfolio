# Christopher VALLOT — Consultant Data & BI freelance

Portfolio professionnel de [Christopher VALLOT](https://christophervallot.fr),
basé à Tours : quatre services Data & BI, six études de cas issues du parcours
professionnel et un formulaire de contact. Les employeurs et missions du parcours
ne sont pas présentés comme des clients freelance.

Next.js 16 (App Router), React 19, TypeScript, CSS et Tailwind CSS 4 ; Lucide et
React Icons pour les icônes, Zod pour la validation serveur, Resend pour les e-mails.
Les versions sont verrouillées dans `package-lock.json` ; les polices sont système.

## Installation locale

Node.js 24 LTS recommandé (`.nvmrc`) et npm. Versions prises en charge :
Node 22.13 ou supérieur dans la branche 22, ou Node 24 et supérieur.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Sous PowerShell, utiliser `Copy-Item .env.example .env.local`.
Ne pas écraser un `.env.local` existant. Ouvrir <http://localhost:3000> ;
les pages sont disponibles en `/fr` et `/en`.

Sans configuration Resend, le formulaire valide les données en développement
mais n’envoie aucun e-mail. Les secrets restent côté serveur ; `.env.local`,
`node_modules/`, `.next/` et les caches TypeScript sont ignorés par Git.

## Commandes

| Commande | Usage |
| --- | --- |
| `npm run dev` | Développement local |
| `npm run check` | Lint, types, tests et cohérence des assets générés |
| `npm run lint` | ESLint |
| `npm run typecheck` | Génération des types Next.js, puis vérification TypeScript |
| `npm test` | Tests Node.js : formulaire, i18n, contenus, routes, marque et indexation |
| `npm run test:http` | Tests du site compilé démarré sur le port 3001, avec de vraies réponses HTTP |
| `npm run assets:check` | Comparaison des dérivés avec leurs sources, sans écriture |
| `npm run build` | Build de production, séparé de `check` |
| `npm start` | Exécution du build |
| `npm run assets:generate` | Régénération de toutes les images depuis leurs sources |
| `npm run icons:generate` | Icônes PNG/ICO depuis le hibou vectoriel encadré |
| `npm run illustrations:generate` | Hibou et 17 illustrations SVG autonomes |
| `npm run technologies:generate` | Logos SVG depuis les sources natives et le catalogue |

`npm test` découvre automatiquement `tests/*.test.cjs` et `tests/*.test.mjs`.
La CI utilise Node 24 et exécute `check`, l’audit des dépendances de production
et le build. Aucun secret d’e-mail n’est nécessaire pour ces contrôles.

## Architecture et maintenance

- `app/[locale]/` : pages FR/EN, layout, métadonnées et images de partage.
- `app/api/contact/route.ts` : orchestration de la validation et de l’envoi.
- `lib/contact-*.ts` : contrat partagé, schéma serveur, limites de requête et contenu des e-mails.
- `components/` : navigation, formulaire, sections et illustrations statiques.
- `data/` : identité publique, faits du parcours, études de cas, services et configuration légale.
- `i18n/` : traductions, assemblage des contenus, URLs et registre des pages.
- `styles/` : palette dans `theme.css` et styles importés par `app/globals.css`.
- `assets/` et `scripts/` : sources de marque et génération ; `public/` et `app/` servent les dérivés utiles.
- `tests/` : tests exécutés avec le moteur Node.js.

Les faits du parcours sont partagés entre langues ; les études de cas réutilisent
les technologies de leur expérience source. Les secrets et la validation Zod restent côté serveur.

Les dessins sont définis dans `assets/vectors/`, les tracés du hibou dans
`assets/illustration-owl.source.svg`, les logos dans `assets/technologies/`
et `data/technology-icons.json`. Les scripts figent la palette et exportent des SVG
autonomes, sans image bitmap incorporée. Le même hibou vectoriel alimente le logo
encadré, les icônes PNG/ICO et les aperçus sociaux PNG. La police des aperçus est
convertie en tracés ; sa source et sa licence sont dans `assets/fonts/`.
Le portrait reste une photo : `assets/portrait.source.webp` produit un WebP de 672 px.
Les pictogrammes d’interface restent les SVG natifs des bibliothèques verrouillées.

Après une modification des sources, exécuter `npm run assets:generate` et versionner
les dérivés avec leurs sources. `assets:check` vérifie leur cohérence sans les modifier
et signale les images non enregistrées dans les dossiers générés ; le build et la CI
exécutent ce contrôle. Les rendus intermédiaires restent en mémoire.

Le CV français est `public/cv-christopher-vallot.pdf`. L’attribution des logos des
technologies est conservée dans `public/technologies/LICENSE.txt`.

## Langues et accessibilité

Les URLs canoniques utilisent `/fr` et `/en`. Le sélecteur conserve la page,
les paramètres et l’ancre. Les anciennes URLs sans préfixe redirigent en 308
vers le français ; `/` redirige en 307 selon le cookie de langue, ou vers `/fr`.
Le registre `i18n/routes.ts` alimente le proxy et le sitemap.

Focus visibles, erreurs associées aux champs et respect de `prefers-reduced-motion`
sont intégrés. Le cookie de langue dure un an. Aucun outil d’analytics n’est intégré.

## Formulaire et limites

Validation client et serveur, antispam invisible, contrôle de durée, limite de
corps et limitation de débit en mémoire. Cette limite s’applique à un seul
processus : elle disparaît au redémarrage et n’est pas partagée entre instances.
Une limite stricte nécessite un mécanisme distribué ou une règle de plateforme.

Netlify fournit `SITE_ID` aux Functions ; ne pas le définir localement. Le serveur
utilise alors l’adresse de connexion fournie par Netlify. Sur un autre hébergement,
le proxy doit remplacer les en-têtes d’adresse transmis par le client avant la route.

En développement, une configuration d’e-mail absente valide sans envoyer.
En production, une clé Resend absente ou un destinataire invalide renvoie 503.
Un refus d’envoi ou une réponse Resend sans identifiant valide renvoie 502.
Les tests utilisent un client d’e-mail simulé : ils ne prouvent pas la livraison
réelle. Celle-ci doit être vérifiée sur l’hébergement configuré.

## Déploiement Netlify

Le raccordement du dépôt, la branche de production, la commande `npm run build`
et l’intégration Next.js se configurent dans le tableau de bord Netlify.
Le dépôt ne contient pas de `netlify.toml` ; la CI GitHub contrôle le code et ne déploie pas.
Conserver la prise en charge des Functions pour la route de contact et utiliser Node 24.

Configurer `NEXT_PUBLIC_SITE_URL` avec l’origine publique HTTPS au build,
y compris en preview ; une URL locale ou temporaire fait échouer le build.
Activer l’indexation avec `SITE_ENV=production` uniquement pour le contexte public
Production. Utiliser `SITE_ENV=preview` ailleurs ; le code bloque aussi les
contextes Netlify hors production.

Dans les Functions, configurer `RESEND_API_KEY` et `CONTACT_EMAIL`, puis un
`CONTACT_FROM_EMAIL` sur un domaine d’envoi vérifié. Sans expéditeur explicite,
le code conserve l’adresse de test Resend, qui reste soumise à ses restrictions.
Ne jamais préfixer ces secrets par `NEXT_PUBLIC_`. Vérifier les informations
légales dans `data/legal-config.ts` avant l’ouverture commerciale.

## Vérification avant publication

```powershell
npm run check
$env:NEXT_PUBLIC_SITE_URL = 'https://christophervallot.fr'
$env:SITE_ENV = 'preview'
npm run build
npm start
```

Pour les tests d’intégration, démarrer le build avec
`npm start -- --hostname 127.0.0.1 --port 3001`, puis exécuter
`npm run test:http` dans un autre terminal. `SITE_TEST_BASE_URL` permet de choisir
une autre origine. Ces tests font uniquement des lectures HTTP : pages FR/EN,
canoniques, redirections, chemins encodés, vraies 404 et images publiques.
Le workflow démarre son propre serveur et exécute ces tests après la compilation.

Le domaine canonique reste public et HTTPS même pour ce test local du build ;
`SITE_ENV=preview` le garde hors indexation. Contrôler les deux langues sur mobile
et ordinateur : images, menus, liens, formulaire, changement de langue et page 404.
Une compilation réussie ne vérifie pas tous les chemins d’assets publics ni un envoi réel.

## Licence

Code sous licence MIT, voir `LICENSE`. Les contenus personnels, le CV,
le portrait et les éléments de marque conservent leurs droits propres.
