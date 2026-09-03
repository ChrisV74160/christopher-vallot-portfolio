import type { Metadata } from "next";
import Link from "next/link";

import { legalConfig } from "@/data/legal-config";
import { siteName } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et informations sur les données traitées par le formulaire de contact.",
  alternates: {
    canonical: "/politique-confidentialite",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Politique de confidentialité — Christopher VALLOT",
    description:
      "Informations sur les données traitées par le formulaire de contact et sur l’exercice de vos droits.",
    url: "/politique-confidentialite",
    siteName,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Christopher VALLOT, Consultant Data & BI Freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de confidentialité — Christopher VALLOT",
    description:
      "Informations sur les données traitées par le formulaire de contact et sur l’exercice de vos droits.",
    images: ["/opengraph-image"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <header className="page-hero">
        <div className="container-shell">
          <p className="eyebrow">Vie privée</p>
          <h1 className="page-title">Politique de confidentialité</h1>
          <p className="section-intro">
            Cette page explique quelles données sont traitées lorsque vous utilisez
            le formulaire de contact et comment exercer vos droits.
          </p>
          <p className="legal-updated">
            <time dateTime="2026-09-03">
              Dernière mise à jour : 3 septembre 2026
            </time>
          </p>
        </div>
      </header>

      <section aria-label="Contenu de la politique de confidentialité">
        <div className="container-shell legal-content">
          <section aria-labelledby="controller-heading">
            <h2 id="controller-heading">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement est{" "}
              {legalConfig.privacy.controllerName}, éditeur de ce site. Ses
              coordonnées professionnelles figurent dans les{" "}
              <Link href="/mentions-legales">mentions légales</Link>. Vous pouvez le
              contacter à l’adresse{" "}
              <a href={`mailto:${legalConfig.privacy.contactEmail}`}>
                {legalConfig.privacy.contactEmail}
              </a>{" "}
              ou au moyen du <Link href="/contact">formulaire de contact</Link>.
            </p>
          </section>

          <section aria-labelledby="data-heading">
            <h2 id="data-heading">2. Données traitées</h2>
            <p>Lorsque vous envoyez une demande, le formulaire traite :</p>
            <ul>
              <li>Votre nom.</li>
              <li>Le nom de votre entreprise, si vous choisissez de l’indiquer.</li>
              <li>Votre adresse e-mail.</li>
              <li>Le type de besoin sélectionné.</li>
              <li>le contenu de votre message.</li>
            </ul>
            <p>
              Un champ invisible et l’heure de début de saisie servent uniquement
              à détecter les envois automatisés. Ils sont écartés après le contrôle
              antispam. L’adresse IP peut être utilisée comme clé temporaire pendant
              dix minutes afin de limiter le nombre d’envois. Elle n’est pas incluse
              dans l’e-mail transmis.
            </p>
            <p>
              Le code applicatif du formulaire n’exploite pas le User-Agent et ne
              crée pas de profil à partir de votre navigation.
            </p>
          </section>

          <section aria-labelledby="purposes-heading">
            <h2 id="purposes-heading">3. Finalités et bases légales</h2>
            <p>Ces données sont utilisées pour :</p>
            <ul>
              <li>Recevoir, qualifier et répondre à votre demande.</li>
              <li>Échanger au sujet d’une éventuelle mission ou collaboration.</li>
              <li>Prévenir les envois abusifs et protéger le formulaire.</li>
            </ul>
            <p>
              Le traitement d’une demande relative à une éventuelle future mission
              repose sur les mesures précontractuelles prises à votre initiative.
              Les autres demandes et la protection antispam reposent sur l’intérêt
              légitime de l’éditeur à gérer ses échanges professionnels et à
              sécuriser le site.
            </p>
            <p>
              Les informations demandées comme obligatoires sont nécessaires pour
              répondre utilement. À défaut, le message ne pourra pas être envoyé.
              Aucune décision automatisée produisant des effets juridiques ou
              similaires, ni aucune prospection automatique, n’est réalisée à
              partir de ces données.
            </p>
          </section>

          <section aria-labelledby="recipients-heading">
            <h2 id="recipients-heading">4. Destinataires et sous-traitants</h2>
            <p>
              Les messages sont destinés à {legalConfig.privacy.controllerName}.
              La requête est traitée par une fonction hébergée chez{" "}
              {legalConfig.hosting.provider}, puis Resend assure l’acheminement de
              l’e-mail vers l’adresse électronique configurée par l’éditeur. Ces
              prestataires peuvent également traiter les données techniques
              strictement nécessaires à la fourniture et à la sécurisation de
              leurs services.
            </p>
            <p>
              Les données ne sont ni vendues ni louées. Elles ne sont communiquées
              à d’autres tiers que si la loi l’exige ou si cela est nécessaire à la
              défense de droits en justice.
            </p>
            <p>
              Netlify et Resend sont des prestataires établis aux États-Unis et des
              traitements peuvent intervenir hors de l’Espace économique européen.
              Selon les situations, ces transferts sont encadrés notamment par le
              cadre de protection des données UE–États-Unis (EU-U.S. Data Privacy
              Framework) et/ou par les clauses contractuelles types de la Commission
              européenne. Les modalités et garanties applicables sont détaillées dans
              les documents de protection des données de{" "}
              <a
                href="https://www.netlify.com/pdf/netlify-dpa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Netlify
                <span className="sr-only"> (nouvel onglet)</span>
              </a>{" "}
              et{" "}
              <a
                href="https://resend.com/legal/dpa"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resend
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="retention-heading">
            <h2 id="retention-heading">5. Durées de conservation</h2>
            <p>
              Le code applicatif ne conserve les demandes de contact ni dans une
              base de données ni dans un fichier. Après acheminement, les demandes
              reçues par e-mail peuvent être conservées pendant la durée nécessaire
              au traitement des échanges et, au maximum, trois ans à compter du
              dernier contact émanant de la personne concernée. Elles sont ensuite
              supprimées, sauf lorsqu’une conservation plus longue est nécessaire
              au respect d’une obligation légale ou à la constatation, à l’exercice
              ou à la défense de droits en justice.
            </p>
            <p>
              Dans ses informations relatives au RGPD, Resend indique actuellement
              une conservation des données liées aux e-mails de{" "}
              {legalConfig.privacy.resendRetentionNotice}. La durée réellement
              applicable dépend donc de l’offre et des paramètres du compte
              utilisés. Les éventuels journaux techniques des prestataires suivent
              leurs propres durées de conservation et paramètres. Ces informations
              sont détaillées sur la{" "}
              <a
                href="https://resend.com/security/gdpr"
                target="_blank"
                rel="noopener noreferrer"
              >
                page RGPD de Resend
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
              .
            </p>
            <p>
              Une clé de limitation cesse d’être active après dix minutes. Les
              entrées expirées sont purgées périodiquement ou lors du redémarrage
              du processus serveur.
            </p>
          </section>

          <section aria-labelledby="cookies-heading">
            <h2 id="cookies-heading">6. Cookies et mesure d’audience</h2>
            <p>
              Dans sa configuration par défaut, ce site n’intègre aucun outil de
              mesure d’audience, aucun traceur publicitaire ou de réseau social et
              ne dépose pas de cookie applicatif. Aucun bandeau de consentement
              n’est donc affiché.
            </p>
            <p>
              Si une solution de mesure d’audience est ajoutée, son fonctionnement,
              les données concernées et sa durée de conservation seront documentés
              ici. Un mécanisme de consentement sera mis en place avant tout dépôt
              de traceur qui ne remplit pas les conditions d’exemption applicables.
            </p>
          </section>

          <section aria-labelledby="rights-heading">
            <h2 id="rights-heading">7. Vos droits</h2>
            <p>
              Dans les conditions prévues par la réglementation, vous pouvez
              demander l’accès à vos données, leur rectification, leur effacement,
              la limitation de leur traitement ou leur portabilité. Vous pouvez
              également vous opposer aux traitements fondés sur l’intérêt légitime.
            </p>
            <p>
              Pour exercer un droit, écrivez à{" "}
              <a href={`mailto:${legalConfig.privacy.contactEmail}`}>
                {legalConfig.privacy.contactEmail}
              </a>{" "}
              ou utilisez le <Link href="/contact">formulaire de contact</Link> en
              précisant votre demande. Une preuve d’identité pourra être demandée
              uniquement en cas de doute raisonnable sur votre identité.
            </p>
            <p>
              Si vous estimez, après avoir contacté l’éditeur, que vos droits ne sont
              pas respectés, vous pouvez adresser une réclamation à la{" "}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
              >
                Commission nationale de l’informatique et des libertés (CNIL)
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="security-heading">
            <h2 id="security-heading">8. Sécurité</h2>
            <p>
              Des mesures raisonnables de validation, de limitation des envois et
              de protection des accès sont mises en œuvre. Aucun service en ligne ne
              pouvant garantir une sécurité absolue, évitez d’envoyer des données
              sensibles ou confidentielles dans le message libre.
            </p>
          </section>

          <section aria-labelledby="changes-heading">
            <h2 id="changes-heading">9. Évolution de cette politique</h2>
            <p>
              Cette politique pourra être mise à jour si les fonctionnalités, les
              prestataires ou les obligations applicables évoluent. La date affichée
              en haut de page permet d’identifier la version en vigueur.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
