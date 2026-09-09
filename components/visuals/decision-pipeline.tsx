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
import type { Locale } from "@/i18n/config";
import { visualMessages } from "@/i18n/messages/visuals";

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

const stepIcons = [Database, Gauge, ShieldCheck, ChartNoAxesCombined];
const stepsByLocale: Record<Locale, readonly PipelineStep[]> = {
  fr: visualMessages.fr.pipeline.steps.map((step, index) => ({ ...step, icon: stepIcons[index] })),
  en: visualMessages.en.pipeline.steps.map((step, index) => ({ ...step, icon: stepIcons[index] })),
};

type StepState = "active" | "complete" | "upcoming";

function getStepState(stepIndex: number, activeStepIndex: number): StepState {
  if (stepIndex < activeStepIndex) return "complete";
  if (stepIndex === activeStepIndex) return "active";
  return "upcoming";
}

interface StepFactsProps {
  step: PipelineStep;
  locale: Locale;
}

function StepFacts({ step, locale }: StepFactsProps) {
  const messages = visualMessages[locale].pipeline;
  return (
    <dl className="pipeline-step-facts">
      <div>
        <dt>{messages.input}</dt>
        <dd>{step.input}</dd>
      </div>
      <div>
        <dt>{messages.action}</dt>
        <dd>{step.action}</dd>
      </div>
      <div>
        <dt>{messages.output}</dt>
        <dd>{step.output}</dd>
      </div>
    </dl>
  );
}

interface ActiveStepProps {
  step: PipelineStep;
  stepIndex: number;
  locale: Locale;
}

function ActiveStep({ step, stepIndex, locale }: ActiveStepProps) {
  const StepIcon = step.icon;
  const messages = visualMessages[locale].pipeline;

  return (
    <article className="pipeline-active-step" data-testid="pipeline-active-step">
      <header className="pipeline-active-step__heading">
        <span className="pipeline-active-step__icon" aria-hidden="true">
          <StepIcon size={24} strokeWidth={1.65} />
        </span>
        <div>
          <small>
            {messages.step} {stepIndex + 1} {messages.of} {messages.steps.length} · {step.code}
          </small>
          <h3>{step.title}</h3>
        </div>
      </header>
      <StepFacts step={step} locale={locale} />
    </article>
  );
}

export function DecisionPipeline({ locale = "fr" }: { locale?: Locale }) {
  const messages = visualMessages[locale].pipeline;
  const pipelineSteps = stepsByLocale[locale];
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
            <p className="eyebrow">{messages.eyebrow}</p>
            <h2 className="section-title" id="decision-title">
              {messages.title}
            </h2>
            <p className="pipeline-story__intro">
              {messages.intro}
            </p>
            <ol
              className="sr-only"
              aria-label={messages.fullDescription}
            >
              {pipelineSteps.map((step, stepIndex) => (
                <li key={step.code}>
                  <h3>
                    {messages.step} {stepIndex + 1} : {step.title}
                  </h3>
                  <StepFacts step={step} locale={locale} />
                </li>
              ))}
            </ol>
            <ol
              className="pipeline-markers"
              aria-hidden="true"
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

          <div
            className="pipeline-console"
            data-active-step={activeStepIndex + 1}
            aria-hidden="true"
          >
            <div className="pipeline-console__head">
              <span>
                <i aria-hidden="true" /> {messages.consoleTitle}
              </span>
              <strong>
                {messages.step.toUpperCase()} {activeStepIndex + 1} {messages.of.toUpperCase()} {pipelineSteps.length}
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
              <ActiveStep step={activeStep} stepIndex={activeStepIndex} locale={locale} />
            </div>

            <div className="pipeline-console__foot">
              <span>{messages.progress}</span>
              <span className="pipeline-progress" aria-hidden="true">
                <motion.i style={{ scaleX: reducedMotion ? 1 : progress }} />
              </span>
              <span>
                {activeStepIndex === pipelineSteps.length - 1
                  ? messages.ready
                  : messages.keepScrolling}
              </span>
            </div>
          </div>

          <div className="pipeline-step-list" aria-hidden="true">
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
                  <StepFacts step={step} locale={locale} />
                </article>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}
