import type { Metadata } from "next";

import { PLACEHOLDERS } from "@/data/placeholders";
import { profile } from "@/data/profile";
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
    title: "Politique de confidentialité — Christopher Vallot",
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
        alt: "Christopher Vallot, Consultant Data & BI Freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de confidentialité — Christopher Vallot",
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
            <time dateTime="2026-08-29">Dernière mise à jour : 29 août 2026</time>
          </p>
        </div>
      </header>

      <section aria-label="Contenu de la politique de confidentialité">
        <div className="container-shell legal-content">
          <section aria-labelledby="controller-heading">
            <h2 id="controller-heading">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement est {PLACEHOLDERS.legal.legalName},
              éditeur de ce site. Ses coordonnées professionnelles figurent dans les{" "}
              <a href="/mentions-legales">mentions légales</a>. Vous pouvez le
              contacter à l’adresse{" "}
              <a href={`mailto:${profile.contact.email}`}>
                {profile.contact.email}
              </a>{" "}
              ou au moyen du <a href="/contact">formulaire de contact</a>.
            </p>
          </section>

          <section aria-labelledby="data-heading">
            <h2 id="data-heading">2. Données traitées</h2>
            <p>Lorsque vous envoyez une demande, le formulaire traite :</p>
            <ul>
              <li>votre nom ;</li>
              <li>le nom de votre entreprise, si vous choisissez de l’indiquer ;</li>
              <li>votre adresse e-mail ;</li>
              <li>le type de besoin sélectionné ;</li>
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
              Le code du site ne collecte pas le User-Agent et ne crée pas de profil
              à partir de votre navigation.
            </p>
          </section>

          <section aria-labelledby="purposes-heading">
            <h2 id="purposes-heading">3. Finalités et bases légales</h2>
            <p>Ces données sont utilisées pour :</p>
            <ul>
              <li>recevoir, qualifier et répondre à votre demande ;</li>
              <li>échanger au sujet d’une éventuelle mission ou collaboration ;</li>
              <li>prévenir les envois abusifs et protéger le formulaire.</li>
            </ul>
            <p>
              Le traitement d’une demande de prestation repose sur les mesures
              précontractuelles prises à votre initiative. Les autres demandes et
              la protection antispam reposent sur l’intérêt légitime de l’éditeur à
              gérer ses échanges professionnels et à sécuriser le site.
            </p>
            <p>
              Les informations demandées comme obligatoires sont nécessaires pour
              répondre utilement. À défaut, le message ne pourra pas être envoyé.
              Aucune décision automatisée ni prospection automatique n’est réalisée
              à partir de ces données.
            </p>
          </section>

          <section aria-labelledby="recipients-heading">
            <h2 id="recipients-heading">4. Destinataires et sous-traitants</h2>
            <p>
              Les messages sont destinés à {PLACEHOLDERS.legal.legalName}. Lorsque l’envoi
              d’e-mails est configuré, Resend assure leur acheminement vers
              l’adresse professionnelle définie par l’éditeur. L’hébergeur du site
              peut également traiter les données techniques strictement nécessaires
              à la fourniture et à la sécurisation du service.
            </p>
            <p>
              Les données ne sont ni vendues ni louées. Elles ne sont communiquées
              à d’autres tiers que si la loi l’exige ou si cela est nécessaire à la
              défense de droits en justice.
            </p>
            <p>
              Hébergeur prévu : {PLACEHOLDERS.legal.hostName}. Avant la mise en
              production, l’identité de l’hébergeur, la localisation des
              traitements et les garanties applicables aux éventuels transferts
              hors de l’Espace économique européen devront être vérifiées et
              documentées.
            </p>
          </section>

          <section aria-labelledby="retention-heading">
            <h2 id="retention-heading">5. Durées de conservation</h2>
            <p>
              Le site ne possède pas de base de données dédiée aux demandes de
              contact. Après acheminement, le message est conservé dans la messagerie
              professionnelle du destinataire.
            </p>
            <p>
              {PLACEHOLDERS.privacy.formDataRetentionPeriod}
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
              <a href={`mailto:${profile.contact.email}`}>
                {profile.contact.email}
              </a>{" "}
              ou utilisez le <a href="/contact">formulaire de contact</a> en
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
