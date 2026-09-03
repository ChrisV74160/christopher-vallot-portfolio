"use client";

import {
  ChartNoAxesCombined,
  Database,
  Gauge,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

import { Container } from "@/components/ui/container";

type PipelineStep = {
  action: string;
  code: string;
  icon: LucideIcon;
  input: string;
  nodeDetail: string;
  nodeLabel: string;
  output: string;
  title: string;
};

const pipelineSteps: readonly PipelineStep[] = [
  {
    code: "CADRER",
    nodeLabel: "Sources",
    nodeDetail: "Connecter et documenter",
    title: "Cadrer les sources utiles",
    icon: Database,
    input: "Bases, fichiers, API et outils métier.",
    action:
      "Cartographier les formats, les propriétaires, les règles d’usage et le périmètre réellement nécessaire.",
    output: "Des sources identifiées, documentées et prêtes à être intégrées.",
  },
  {
    code: "PRÉPARER",
    nodeLabel: "Préparation",
    nodeDetail: "Nettoyer et automatiser",
    title: "Préparer et automatiser les traitements",
    icon: Gauge,
    input: "Données brutes, dispersées ou hétérogènes.",
    action:
      "Nettoyer, harmoniser, consolider et automatiser les transformations avec Python et SQL.",
    output: "Des traitements reproductibles, lisibles et maintenables.",
  },
  {
    code: "FIABILISER",
    nodeLabel: "Qualité",
    nodeDetail: "Contrôler et tracer",
    title: "Contrôler et fiabiliser les données",
    icon: ShieldCheck,
    input: "Données transformées et règles métier attendues.",
    action:
      "Détecter doublons, valeurs manquantes et écarts, puis tracer chaque contrôle et son résultat.",
    output: "Des données contrôlées, explicables et prêtes pour l’analyse.",
  },
  {
    code: "PILOTER",
    nodeLabel: "Pilotage",
    nodeDetail: "Analyser et restituer",
    title: "Restituer une information actionnable",
    icon: ChartNoAxesCombined,
    input: "Données validées et besoins de pilotage cadrés.",
    action:
      "Construire les modèles de données, KPI et rapports Power BI, avec les mesures DAX adaptées aux besoins métier.",
    output: "Une information claire, exploitable et directement actionnable.",
  },
];

type StepState = "active" | "complete" | "upcoming";

function getStepState(stepIndex: number, activeStepIndex: number): StepState {
  if (stepIndex < activeStepIndex) return "complete";
  if (stepIndex === activeStepIndex) return "active";
  return "upcoming";
}

interface StepFactsProps {
  step: PipelineStep;
}

function StepFacts({ step }: StepFactsProps) {
  return (
    <dl className="pipeline-step-facts">
      <div>
        <dt>Entrées</dt>
        <dd>{step.input}</dd>
      </div>
      <div>
        <dt>Intervention</dt>
        <dd>{step.action}</dd>
      </div>
      <div>
        <dt>Résultat</dt>
        <dd>{step.output}</dd>
      </div>
    </dl>
  );
}

interface ActiveStepProps {
  step: PipelineStep;
  stepIndex: number;
}

function ActiveStep({ step, stepIndex }: ActiveStepProps) {
  const StepIcon = step.icon;

  return (
    <article className="pipeline-active-step" data-testid="pipeline-active-step">
      <header className="pipeline-active-step__heading">
        <span className="pipeline-active-step__icon" aria-hidden="true">
          <StepIcon size={24} strokeWidth={1.65} />
        </span>
        <div>
          <small>
            Étape {stepIndex + 1} sur {pipelineSteps.length} · {step.code}
          </small>
          <h3>{step.title}</h3>
        </div>
      </header>
      <StepFacts step={step} />
    </article>
  );
}

export function DecisionPipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 30,
    mass: 0.24,
    skipInitialAnimation: true,
  });
  const particlePosition = useTransform(progress, [0, 1], ["7%", "93%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reducedMotion) return;

    const normalizedProgress = Math.max(0, Math.min(0.9999, latest));
    const nextStepIndex = Math.min(
      pipelineSteps.length - 1,
      Math.floor(normalizedProgress * pipelineSteps.length),
    );

    setActiveStepIndex((currentStepIndex) =>
      currentStepIndex === nextStepIndex ? currentStepIndex : nextStepIndex,
    );
  });

  const activeStep = pipelineSteps[activeStepIndex];

  return (
    <section
      ref={sectionRef}
      className="pipeline-story"
      data-testid="pipeline-section"
      id="pipeline"
      aria-labelledby="decision-title"
    >
      <div className="pipeline-story__stage">
        <Container className="pipeline-story__layout">
          <div className="pipeline-story__copy">
            <p className="eyebrow">Méthode / 4 étapes concrètes</p>
            <h2 className="section-title" id="decision-title">
              De vos sources à une information fiable et exploitable.
            </h2>
            <p className="pipeline-story__intro">
              Faites défiler : chaque étape précise ce qui entre, ce qui est
              réalisé et ce que les équipes obtiennent.
            </p>
            <ol
              className="pipeline-markers"
              aria-label="Les quatre étapes du processus Data et BI"
            >
              {pipelineSteps.map((step, stepIndex) => {
                const state = getStepState(stepIndex, activeStepIndex);

                return (
                  <li
                    aria-current={state === "active" ? "step" : undefined}
                    data-state={state}
                    key={step.code}
                  >
                    <span>0{stepIndex + 1}</span>
                    <span className="pipeline-marker__copy">
                      <strong>{step.title}</strong>
                      <small>{step.output}</small>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="pipeline-console" data-active-step={activeStepIndex + 1}>
            <div className="pipeline-console__head">
              <span>
                <i aria-hidden="true" /> PROCESSUS DATA &amp; BI · 4 ÉTAPES
              </span>
              <strong>
                ÉTAPE {activeStepIndex + 1} SUR {pipelineSteps.length}
              </strong>
            </div>

            <div className="pipeline-flow" aria-hidden="true">
              <span className="pipeline-flow__rail">
                <motion.i style={{ scaleX: reducedMotion ? 1 : progress }} />
              </span>
              <motion.span
                className="pipeline-flow__particle"
                style={{ left: reducedMotion ? "93%" : particlePosition }}
              />
              <ol>
                {pipelineSteps.map((step, stepIndex) => {
                  const StepIcon = step.icon;

                  return (
                    <li
                      data-state={getStepState(stepIndex, activeStepIndex)}
                      key={step.code}
                    >
                      <span className="pipeline-flow__icon">
                        <StepIcon size={22} strokeWidth={1.65} />
                      </span>
                      <small>0{stepIndex + 1}</small>
                      <strong>{step.nodeLabel}</strong>
                      <span>{step.nodeDetail}</span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="pipeline-console__detail">
              <ActiveStep step={activeStep} stepIndex={activeStepIndex} />
            </div>

            <div className="pipeline-console__foot">
              <span>Progression globale</span>
              <span className="pipeline-progress" aria-hidden="true">
                <motion.i style={{ scaleX: reducedMotion ? 1 : progress }} />
              </span>
              <span>
                {activeStepIndex === pipelineSteps.length - 1
                  ? "Prêt à piloter"
                  : "Continuez à faire défiler"}
              </span>
            </div>
          </div>

          <div className="pipeline-step-list" aria-label="Détail des quatre étapes">
            {pipelineSteps.map((step, stepIndex) => {
              const StepIcon = step.icon;

              return (
                <article className="pipeline-step-card" key={step.code}>
                  <header>
                    <span className="pipeline-step-card__index">
                      0{stepIndex + 1}
                    </span>
                    <span className="pipeline-step-card__icon" aria-hidden="true">
                      <StepIcon size={22} strokeWidth={1.65} />
                    </span>
                    <div>
                      <small>{step.code}</small>
                      <h3>{step.title}</h3>
                    </div>
                  </header>
                  <StepFacts step={step} />
                </article>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
