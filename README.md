# Christopher VALLOT — Consultant Data & BI freelance

Portfolio professionnel de [Christopher VALLOT](https://christophervallot.fr),
basé à Tours. Le site présente mes services, six études de cas issues de mon
parcours professionnel et un formulaire pour discuter d’un besoin Data & BI.

## Objectif

Expliquer clairement mon accompagnement en intégration, Data Quality,
automatisation et reporting Power BI. L’accueil met en avant quatre services,
trois réalisations et la prise de contact, sans présenter les employeurs ou
missions du parcours comme des clients freelance.

## Stack

Next.js 16 (App Router), React 19, TypeScript, CSS et Tailwind CSS 4.
Lucide et React Icons pour les icônes, Zod pour la validation serveur,
Resend pour les e-mails. Versions verrouillées dans `package-lock.json`.

## Installation locale

Node.js 20.9 minimum et npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Sous PowerShell, remplacer la commande `cp` par
`Copy-Item .env.example .env.local`. Ne pas écraser un `.env.local` existant.
Ouvrir <http://localhost:3000> ; les pages sont disponibles en `/fr` et `/en`.

`.env.example` décrit les variables nécessaires. Sans Resend, le formulaire
valide les données en développement mais n’envoie aucun e-mail. Les secrets
restent côté serveur et les fichiers `.env.local` ne sont pas suivis.

## Commandes utiles

| Commande | Usage |
| --- | --- |
| `npm run dev` | Développement local |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm test` | Tests du formulaire, des contenus, de l’i18n, des icônes et de l’indexation |
| `npm run build` | Build de production |
| `npm start` | Exécution du build |
| `npm run icons:generate` | Régénération des icônes depuis le PNG maître |

Les polices sont des piles système : aucun téléchargement externe de police.
Les fichiers maîtres de marque et leurs scripts sont conservés dans `assets/`
et `scripts/` ; seuls les dérivés utiles sont servis depuis `public/` et `app/`.
Ne pas supprimer une source au seul motif qu’elle n’apparaît pas directement
dans une page : les scripts et tests peuvent en dépendre.

Un build exige `NEXT_PUBLIC_SITE_URL` avec l’origine HTTPS publique.
L’indexation est activée uniquement avec `SITE_ENV=production`, hors preview.

## Architecture

- `app/[locale]/` : pages partagées FR/EN, métadonnées et layouts.
- `app/api/contact/` : validation, antispam et envoi serveur.
- `components/` : navigation, formulaire, sections et illustrations statiques.
- `data/identity.ts` : identité et liens publics.
- `data/profile.ts` : expériences, dates, technologies et formation.
- `data/projects.ts` : six études de cas liées aux expériences par identifiant.
- `data/services.ts` : quatre domaines d’intervention.
- `data/legal-config.ts` : informations légales et de confidentialité.
- `i18n/` : traductions, URLs, registre des pages et métadonnées.
- `styles/` : palette centralisée dans `theme.css`, styles et responsive.
- `public/` : CV, logos des technologies et déclinaisons du hibou.
- `tests/` : tests automatisés avec le moteur de test Node.js.

Les faits communs du parcours ne sont pas recopiés dans les traductions.
Les études de cas réutilisent les technologies de leur expérience source.
Le CV français téléchargeable est `public/cv-christopher-vallot.pdf`.
Les mentions d’attribution des logos sont dans `public/technologies/LICENSE.txt`.

## FR / EN et accessibilité

Les URLs canoniques utilisent `/fr` et `/en`. Le sélecteur conserve la page,
les paramètres et l’ancre. Les anciennes URLs sans préfixe redirigent en 308
vers le français. L’accueil `/` redirige en 307 selon la préférence mémorisée,
ou vers `/fr`. Le registre `i18n/routes.ts` alimente le sitemap.

L’interface propose des focus visibles, des erreurs de formulaire associées
aux champs et le respect de `prefers-reduced-motion`. Aucun mode de couleurs
alternatif n’est nécessaire. Le cookie de langue dure un an. Aucun outil
d’analytics n’est intégré.

## Formulaire

Validation client et serveur, champ antispam invisible et non focalisable,
contrôle de durée, limite de taille et limitation de débit en mémoire.
Cette dernière n’est pas partagée entre instances. Aucun envoi réussi n’est
annoncé lorsque le service d’e-mail est indisponible.

Laisser les variables d’e-mail vides en développement pour tester sans envoi.
En production, une configuration manquante renvoie une indisponibilité (503).
Un test visuel avec réponse simulée ne valide pas la livraison réelle d’un e-mail.

## Déploiement

Le site est déployé automatiquement via Netlify à partir de la branche de
production. L’intégration Next.js et la route serveur de contact sont conservées.

Avant publication : exécuter lint, typecheck, tests et build ; configurer
`NEXT_PUBLIC_SITE_URL` (origine HTTPS) et `SITE_ENV=production` au build.
En preview, conserver `SITE_ENV=preview`. Côté serveur, renseigner
`RESEND_API_KEY`, `CONTACT_EMAIL` et `CONTACT_FROM_EMAIL` avec un domaine
d’envoi vérifié. Ne jamais préfixer ces secrets par `NEXT_PUBLIC_`.
Valider un envoi réel sur l’hébergement et confirmer les informations légales
dans `data/legal-config.ts` avant l’ouverture commerciale.

## Vérification avant publication

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Pour vérifier le build localement sous PowerShell :

```powershell
$env:NEXT_PUBLIC_SITE_URL = 'https://christophervallot.fr'
$env:SITE_ENV = 'preview'
npm run build
npm start
```

Le domaine canonique doit rester public et en HTTPS, même pour ce test local
du build. `SITE_ENV=preview` garde ce build hors indexation.

Contrôler les deux langues sur mobile et ordinateur : images, menus,
liens des réalisations, formulaire, changements de langue et page 404.
La compilation seule ne détecte pas une image publique manquante.
Les dossiers `.next/` et `node_modules/` sont générés et ignorés par Git ;
ils ne constituent pas du vieux code à publier.

## Licence

Code sous licence MIT, voir `LICENSE`. Les contenus personnels, le CV,
le portrait et les éléments de marque conservent leurs droits propres.
