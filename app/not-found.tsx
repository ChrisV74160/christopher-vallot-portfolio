import { ArrowLeft, FolderOpen } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="container-shell not-found__content">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="page-title" id="not-found-title">
          Cette page n’existe pas.
        </h1>
        <p className="not-found__description">
          Le lien a peut-être changé ou la page demandée n’est plus disponible.
        </p>
        <div className="button-row not-found__actions">
          <Link className="button-link button-link--primary" href="/">
            <ArrowLeft size={17} aria-hidden="true" />
            Revenir à l’accueil
          </Link>
          <Link className="button-link button-link--secondary" href="/projets">
            <FolderOpen size={17} aria-hidden="true" />
            Voir les réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}
