# Portfolio Consultant Data & BI Freelance — Christopher Vallot

Portfolio professionnel de Christopher Vallot, Consultant Data & BI Freelance
spécialisé dans l’intégration, la transformation, la fiabilisation et
l’automatisation des données avec Python, SQL et Power BI.

Le site associe une direction artistique holographique originale à un contenu
factuel issu du CV. Les illustrations sont réalisées en CSS et SVG dans le code :
aucune image de stock n’est nécessaire au rendu futuriste.

Technologies principales : Next.js 16, React 19, TypeScript, Motion, Zod et
Resend.

## Table des matières

- [Démarrage rapide](#démarrage-rapide)
- [Architecture et design](#architecture-et-design)
- [Modifier le contenu et les médias](#modifier-le-contenu-et-les-médias)
- [Formulaire de contact](#formulaire-de-contact)
- [Production et déploiement](#production-et-déploiement)
- [Licence](#licence)

## Démarrage rapide

### Prérequis

- Node.js 20.9 ou une version plus récente ;
- npm ;
- un compte Resend uniquement pour envoyer de vrais e-mails.

### Installation

Installer les dépendances :

```bash
npm install
```

Créer le fichier d’environnement local :

```powershell
Copy-Item .env.example .env.local
```

Sous macOS ou Linux :

```bash
cp .env.example .env.local
```

Lancer le serveur de développement :

```bash
npm run dev
```

Ouvrir ensuite <http://localhost:3000>.

Le site peut fonctionner localement sans compte Resend. Dans ce cas, le
formulaire valide la demande mais n’envoie pas d’e-mail.

### Commandes

| Commande | Utilité |
| --- | --- |
| `npm run dev` | Lance le serveur de développement. |
| `npm run lint` | Analyse le code avec ESLint. |
| `npm run typecheck` | Vérifie les types TypeScript sans produire de fichiers. |
| `npm run build` | Crée et contrôle le build de production. |
| `npm start` | Démarre un build de production déjà créé. |

En intégration continue, utiliser `npm ci` afin d’installer exactement les
versions enregistrées dans `package-lock.json`.

### Variables d’environnement

Le modèle complet se trouve dans `.env.example` :

```dotenv
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_EMAIL=contact@example.com
CONTACT_FROM_EMAIL="Portfolio Christopher Vallot <contact@example.com>"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SITE_ENV=preview
```

| Variable | Nécessité | Rôle |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Obligatoire en production | Domaine public utilisé par les URL canoniques, le sitemap, `robots.txt` et les métadonnées. |
| `SITE_ENV` | Obligatoire pour l’indexation | Garder `preview` en local et sur les previews. Utiliser `production` uniquement sur le domaine public final. |
| `RESEND_API_KEY` | Obligatoire pour envoyer | Clé privée utilisée uniquement par la route serveur. |
| `CONTACT_EMAIL` | Obligatoire pour envoyer | Adresse qui reçoit les demandes. |
| `CONTACT_FROM_EMAIL` | Recommandée en production | Expéditeur appartenant à un domaine validé dans Resend. |

Ne jamais committer `.env.local`. Une clé privée ne doit pas porter le préfixe
`NEXT_PUBLIC_`, car les variables publiques peuvent être intégrées au code
envoyé au navigateur.

## Architecture et design

### Stack technique

| Élément | Choix actuel |
| --- | --- |
| Framework | Next.js 16.3.3 avec App Router |
| Interface | React 19.2.8 et TypeScript 5 |
| Styles | CSS spécialisé, variables globales et Tailwind CSS 4 comme chaîne CSS |
| Animations | Motion 13, limité aux composants qui dépendent du navigateur |
| Icônes | Lucide React et React Icons |
| Validation | Zod 4 côté serveur |
| E-mails | Resend 6 |

Les pages et la majorité des composants restent des Server Components. Le
JavaScript client est réservé au menu, au formulaire et aux animations qui
dépendent du défilement ou du viewport.

### Pages et dossiers principaux

```text
app/
  api/contact/                 Route serveur du formulaire
  a-propos/                    Parcours professionnel
  contact/                     Page de contact
  mentions-legales/           Mentions légales
  politique-confidentialite/  Politique de confidentialité
  projets/[slug]/              Études de cas générées depuis les données
  layout.tsx                   Métadonnées globales et données structurées
  icon.svg                     Symbole Data & BI pour l’onglet du navigateur
  apple-icon.tsx               Icône tactile générée par Next.js
  manifest.ts                  Manifeste de l’application
  robots.ts                    Génération de robots.txt
  sitemap.ts                   Génération du sitemap
assets/
  photo-profil-christopher-vallot.webp
components/
  animations/                  Révélations dans le viewport
  sections/                    Sections des pages
  ui/                          Composants réutilisables
  visuals/                     Hero, pipeline et domaines d’expertise
data/
  profile.ts                   Profil, positionnement et parcours centralisés
  projects.ts                  Études de cas
  services.ts                  Services, cas d’intervention et formats de mission
  faq.ts                       Questions fréquentes
  placeholders.ts             Informations légales à confirmer
lib/
  contact-contract.ts          Contrat léger partagé avec le navigateur
  contact-schema.ts            Validation Zod réservée au serveur
public/
  cv-christopher-vallot.pdf    CV proposé au téléchargement
styles/                        Mise en page, visuels, pages et responsive
types/                         Modèles du contenu éditorial
```

### Direction artistique holographique

Le design repose sur une palette bleu nuit, cyan et violet, complétée par des
grilles techniques, des lignes de données, des halos et des surfaces de type
console. Les éléments décoratifs importants sont créés directement dans le
projet :

- le hero utilise une micro-chaîne compacte « Sources → Données fiables →
  Power BI », avec deux signaux lumineux et un halo central ;
- ce visuel est construit dans `components/visuals/data-flow-visual.tsx` avec
  des éléments HTML/CSS légers, sans canvas, WebGL ni moteur 3D ;
- le pipeline illustre quatre phases explicites : collecter, préparer,
  fiabiliser et restituer ;
- un registre compact présente quatre cas d’intervention sans répéter le rendu
  des cartes Services ;
- les quatre formats de mission sont regroupés sous les Services dans un rail
  lisible sur ordinateur comme sur mobile ;
- les cartes de projets utilisent des schémas CSS/SVG abstraits, sans donnée
  client ;
- la section Expertise présente quatre besoins complémentaires : intégrer,
  fiabiliser, automatiser et piloter. Chaque domaine relie une intervention,
  un résultat visé et les technologies principales mobilisées ;
- toutes les technologies sont accompagnées d’un libellé et d’une icône :
  aucune information n’est encodée uniquement par une couleur ou un point.

Les statistiques affichées sont dérivées des tableaux du dépôt. Elles ne
représentent ni un score de maîtrise, ni un résultat client inventé.

### Animations liées au défilement

Deux scènes principales utilisent Motion :

1. `DataFlowVisual` anime deux signaux entre les sources, la donnée fiabilisée
   et la restitution Power BI. Le halo central respire doucement et toutes les
   boucles se mettent en pause quand le visuel quitte le viewport.
2. `DecisionPipeline` transforme une section longue en récit progressif. Sur
   grand écran, les quatre jalons restent visibles et un seul panneau actif
   détaille les entrées, l’intervention et le résultat. Aucun contenu d’étape
   n’est superposé.

`DecisionPipeline` utilise `useScroll`, `useSpring` et `useTransform`. Les
valeurs continues restent des `MotionValue` ; le pipeline ne met à jour l’état
React qu’au passage de l’un de ses quatre seuils. Le petit visuel du hero utilise
uniquement un test de visibilité pour éviter les boucles inutiles hors écran.

Le comportement se dégrade volontairement de façon simple :

- sous `70rem`, le pipeline quitte son mode épinglé et affiche quatre cartes
  complètes dans l’ordre ;
- sur les petits écrans, la grille des expertises passe sur une seule colonne et
  ne nécessite aucun défilement horizontal ;
- avec `prefers-reduced-motion: reduce`, le pipeline affiche toutes ses étapes
  dans l’ordre et les animations décoratives sont neutralisées ;
- le contenu et les actions restent compréhensibles sans animation.

Les règles correspondantes se trouvent dans `styles/visuals.css` et
`styles/responsive.css`.

### Accessibilité et performance

Le projet prévoit notamment :

- un lien d’évitement vers le contenu principal ;
- des titres hiérarchisés et des régions nommées ;
- des focus visibles et une navigation clavier ;
- des descriptions accessibles pour les schémas utiles ;
- des éléments purement décoratifs retirés de l’arbre d’accessibilité ;
- une version sans mouvement renforcé ;
- `next/image` avec dimensions connues, image responsive et aperçu flouté pour
  le portrait ;
- `content-visibility` sur les grandes sections statiques situées sous la ligne
  de flottaison ;
- des composants serveur par défaut et aucune dépendance WebGL.

## Modifier le contenu et les médias

### Profil, LinkedIn et parcours

`data/profile.ts` est la source principale pour :

- l’identité, le rôle, la présentation et la localisation ;
- l’adresse e-mail et le lien LinkedIn ;
- les expériences, la formation et les compétences ;
- le chemin public du CV.

Ce contenu a été centralisé à partir du CV fourni et du positionnement LinkedIn
validé afin d’éviter les divergences entre l’accueil, la page À propos, les
métadonnées et le document téléchargeable. Le site ne relit pas automatiquement
le PDF au démarrage : après une évolution du CV ou du positionnement, il faut
mettre à jour le PDF et les données TypeScript concernées.

Ne jamais compléter une information professionnelle par déduction. Les champs
encore inconnus restent explicitement marqués dans `data/placeholders.ts`.

### Remplacer le CV

Le fichier public est :

```text
public/cv-christopher-vallot.pdf
```

Le plus simple est de conserver ce nom. Si le chemin change, modifier également
`profile.contact.cvUrl` dans `data/profile.ts`.

Avant publication :

- ouvrir le PDF final ;
- contrôler les coordonnées et les dates ;
- vérifier qu’aucune information confidentielle n’est présente ;
- tester le téléchargement depuis le hero, la page À propos et le footer.

### Remplacer la photo

La photo utilisée sur l’accueil et la page À propos est :

```text
assets/photo-profil-christopher-vallot.webp
```

Conserver ce nom permet de remplacer l’image sans changer les imports. Préférer
un portrait net et carré, d’au moins 1000 px, compressé en WebP avec une qualité
élevée. La photo est réservée aux portraits de l’accueil et de la page À propos.

Deux fichiers pilotent ce rendu :

- `components/ui/profile-portrait.tsx` et `styles/layout.css` pour le cadrage du
  grand portrait ;
- `assets/photo-profil-christopher-vallot.webp` pour l’image source.

L’en-tête et le pied de page utilisent le symbole futuriste défini dans
`components/ui/data-brand-icon.tsx`. L’icône autonome de l’onglet se trouve dans
`app/icon.svg` et l’icône Apple est générée par `app/apple-icon.tsx`. Ces
versions reprennent le même langage graphique et ne dépendent pas de la photo
de profil.

### Services, FAQ et projets

- modifier les offres dans `data/services.ts` ;
- modifier les questions dans `data/faq.ts` ;
- ajouter ou corriger les réalisations dans `data/projects.ts`.

Chaque projet respecte le type `ProjectCaseStudy` de `types/content.ts`. Il doit
contenir un slug unique, un contexte, une problématique, des objectifs, des
données, une méthode, une intervention, un résultat, des technologies et un
statut honnête.

Les slugs alimentent automatiquement les routes `/projets/[slug]` et le sitemap.
Après une modification, vérifier la liste, la page détaillée et une URL inconnue.

Les études de cas reprennent des expériences professionnelles. Ne pas publier
de donnée interne ou confidentielle, ni de résultat non confirmé.

### Technologies et icônes

Le registre partagé se trouve dans
`components/ui/technology-icon.tsx`. Il associe un libellé à une icône et une
couleur. Une technologie sans entrée reçoit un pictogramme générique.

Pour ajouter une stack :

1. employer exactement le même libellé dans les données ;
2. ajouter son entrée au registre si une icône spécifique est pertinente ;
3. vérifier les badges du hero, les projets, la page À propos et la carte des
   expertises ;
4. conserver un texte visible : l’icône ne doit jamais être le seul libellé.

### Couleurs et mise en page

Les tokens principaux sont déclarés dans `app/globals.css`. Les styles sont
répartis par responsabilité :

- `styles/layout.css` pour le header, les sections, cartes et portrait ;
- `styles/visuals.css` pour le hero SVG, le pipeline et les visualisations ;
- `styles/pages.css` pour le contact, les projets détaillés et les pages légales ;
- `styles/responsive.css` pour les adaptations d’écran et de mouvement.

Après toute modification visuelle, vérifier le contraste, le focus, le mode
mobile et `prefers-reduced-motion`. Une information importante ne doit dépendre
ni du survol, ni de la couleur, ni d’une animation.

## Formulaire de contact

Le formulaire envoie un objet JSON vers `POST /api/contact`.

Le navigateur gère l’état d’envoi et les messages accessibles. La route serveur
effectue les contrôles de sécurité et l’envoi Resend :

- validation stricte avec Zod ;
- limite de corps à 16 Kio ;
- champ honeypot ;
- refus des envois effectués en moins de trois secondes ou après expiration ;
- limitation locale à cinq demandes sur dix minutes par clé IP ;
- échappement du contenu réinjecté dans l’e-mail HTML ;
- réponses JSON sans mise en cache.

Les options et types partagés vivent dans `lib/contact-contract.ts`, sans
dépendance. Zod reste exclusivement dans `lib/contact-schema.ts` et dans la
route serveur afin de ne pas alourdir le JavaScript envoyé au navigateur.

Sans configuration Resend, le développement retourne un succès de validation
sans prétendre qu’un e-mail a été envoyé. En production, une configuration
incomplète rend le service indisponible avec une erreur explicite.

### Activer Resend

1. Créer une clé API Resend.
2. Valider le domaine utilisé pour l’expédition.
3. Définir `RESEND_API_KEY` et `CONTACT_EMAIL`.
4. Définir `CONTACT_FROM_EMAIL` avec une adresse du domaine validé.
5. Redémarrer l’application et envoyer une demande de test complète.

La valeur de secours `onboarding@resend.dev` convient aux essais, pas à un
envoi public normal.

La limitation actuelle est stockée dans la mémoire d’un processus Node. Elle
disparaît au redémarrage et n’est pas partagée entre plusieurs instances. Pour
une limitation stricte sur une plateforme serverless, ajouter un stockage
distribué ou une règle WAF adaptée.

## Production et déploiement

### SEO et métadonnées

Le projet fournit :

- des métadonnées par page ;
- une image Open Graph générée par Next.js ;
- des données structurées `Person` et `CreativeWork` ;
- un manifeste ;
- `robots.txt` ;
- un sitemap incluant les études de cas.

`NEXT_PUBLIC_SITE_URL` doit contenir le domaine final en HTTPS avant le build.
Le build de production s’arrête volontairement si cette variable est absente,
locale ou temporaire (`trycloudflare.com`, domaine de preview Vercel ou
Cloudflare Pages), afin d’éviter de publier des URL canoniques incorrectes.

L’indexation est volontairement désactivée par défaut. Définir
`SITE_ENV=production` uniquement sur le déploiement public final. En local et en
preview, les métadonnées et l’en-tête `X-Robots-Tag` indiquent `noindex`, et
`robots.txt` refuse l’exploration sans exposer le sitemap.

Les mentions légales et la politique de confidentialité demandent aux moteurs
de ne pas les indexer et ne figurent pas dans le sitemap. Elles restent cependant
accessibles publiquement depuis le site.

### En-têtes et confidentialité

`next.config.ts` :

- retire l’en-tête `X-Powered-By` ;
- ajoute `X-Content-Type-Options: nosniff` ;
- limite l’intégration en frame à la même origine ;
- applique une politique de référent prudente ;
- désactive caméra, microphone, géolocalisation et ciblage thématique ;
- applique une Content Security Policy compatible avec le rendu statique, les
  styles du site et les animations. Resend reste appelé uniquement côté serveur.

Dans sa configuration initiale, le site n’ajoute ni analytics, ni traceur
publicitaire, ni cookie applicatif. Toute nouvelle mesure d’audience doit être
documentée et évaluée avant activation.

### Checklist légale obligatoire

`data/placeholders.ts` contient volontairement des valeurs `[À COMPLÉTER]`.
Elles ne doivent pas rester dans une publication définitive.

Vérifier au minimum :

- le statut et le nom légal de l’éditeur ;
- le SIREN ou SIRET et la TVA, lorsque ces mentions s’appliquent ;
- l’adresse et les coordonnées professionnelles ;
- le directeur de la publication ;
- l’identité et l’adresse de l’hébergeur ;
- la durée de conservation des messages ;
- les coordonnées Resend réellement utilisées.

Pour retrouver les champs :

```bash
rg "\[À COMPLÉTER" . -g "!node_modules/**" -g "!.next/**"
```

### Vérifications avant mise en ligne

Installer les versions verrouillées puis exécuter :

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm start
```

Contrôler ensuite :

- l’accueil, À propos, Contact et la liste des projets ;
- chaque étude de cas et une URL de projet inexistante ;
- LinkedIn et tous les téléchargements du CV ;
- le formulaire avec une réponse valide, une erreur de validation et une erreur
  de service ;
- `/robots.txt`, `/sitemap.xml`, le manifeste et l’image de partage ;
- les largeurs 360, 768, 1024 et 1440 pixels ;
- le pipeline sur écran large et son fallback sous `70rem` ;
- `prefers-reduced-motion: reduce` ;
- la navigation complète au clavier et les focus ;
- les contrastes, les débordements horizontaux et les erreurs de console ;
- les pages légales une fois toutes les informations confirmées.

### Déployer

Sur Vercel :

1. Importer le dépôt.
2. Laisser la plateforme détecter Next.js.
3. Ajouter les variables d’environnement.
4. Définir `NEXT_PUBLIC_SITE_URL` avec le domaine public.
5. Garder `SITE_ENV=preview` sur les déploiements de test et vérifier le
   `noindex`.
6. Créer un déploiement Preview et suivre la checklist.
7. Définir `SITE_ENV=production` uniquement sur le déploiement final, puis
   tester le formulaire, les métadonnées et les journaux.

Une autre plateforme est possible si elle prend en charge Next.js et le runtime
Node.js utilisé par l’API de contact. Elle doit exécuter `npm run build`, puis
`npm start`. Un hébergement purement statique ne suffit pas pour l’envoi du
formulaire tel qu’il est implémenté.

## Licence

Le code source est distribué sous licence MIT. Le texte complet se trouve dans
`LICENSE`.

La licence du code ne transfère pas automatiquement les droits sur les contenus
personnels, la photographie, le CV, les textes professionnels ou les éléments de
marque. Leur réutilisation doit être vérifiée séparément.
