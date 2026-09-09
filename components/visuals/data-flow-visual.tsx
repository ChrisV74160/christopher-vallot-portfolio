"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { Locale } from "@/i18n/config";
import { visualMessages } from "@/i18n/messages/visuals";

const sources = ["SQL", "CSV", "API"];

interface RelayLinkProps {
  active: boolean;
  delay?: number;
}

/**
 * A short, low-cost signal animation between two steps of the Data & BI flow.
 * The loop is paused when the visual leaves the viewport and is fully disabled
 * when the visitor prefers reduced motion.
 */
function RelayLink({ active, delay = 0 }: RelayLinkProps) {
  return (
    <span className="data-relay__link">
      <motion.i
        animate={
          active
            ? { opacity: [0, 1, 1, 0], x: ["-70%", "520%"] }
            : { opacity: 0, x: "-70%" }
        }
        initial={false}
        transition={
          active
            ? {
                delay,
                duration: 2.35,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.45,
                times: [0, 0.16, 0.8, 1],
              }
            : { duration: 0 }
        }
      />
    </span>
  );
}

/**
 * Compact overview of the value chain presented in the hero. It deliberately
 * uses DOM and CSS primitives instead of a canvas/WebGL scene, keeping the
 * animation crisp and inexpensive on both desktop and mobile devices.
 */
export function DataFlowVisual({ locale = "fr" }: { locale?: Locale }) {
  const messages = visualMessages[locale].flow;
  const visualRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(visualRef, { amount: 0.35 });
  const isAnimated = isInView && reducedMotion !== true;

  return (
    <motion.div
      ref={visualRef}
      className="data-relay"
      data-animated={isAnimated}
      data-testid="dataflow-visual"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.985, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      role="img"
      aria-label={messages.description}
    >
      <header className="data-relay__header">
        <span className="data-relay__identity">
          <i aria-hidden="true" />
          {messages.title}
        </span>
        <span className="data-relay__status">{messages.status}</span>
      </header>

      <div className="data-relay__scene" aria-hidden="true">
        <div className="data-relay__stage data-relay__sources">
          <small>{messages.sources}</small>
          <div>
            {sources.map((source) => (
              <span key={source}>{source}</span>
            ))}
          </div>
        </div>

        <RelayLink active={isAnimated} />

        <div className="data-relay__stage data-relay__hub">
          <motion.span
            className="data-relay__halo"
            animate={
              isAnimated
                ? {
                    opacity: [0.18, 0.46, 0.18],
                    scale: [0.84, 1.08, 0.84],
                  }
                : { opacity: 0.25, scale: 1 }
            }
            initial={false}
            transition={
              isAnimated
                ? { duration: 2.8, ease: "easeInOut", repeat: Infinity }
                : { duration: 0 }
            }
          />
          <span className="data-relay__hub-icon">
            <i />
            <i />
            <i />
          </span>
          <small>{messages.checked}</small>
          <strong>{messages.reliableData}</strong>
        </div>

        <RelayLink active={isAnimated} delay={0.85} />

        <div className="data-relay__stage data-relay__output">
          <small>Power BI</small>
          <div className="data-relay__chart">
            <span />
            <span />
            <span />
            <span />
          </div>
          <strong>{messages.ready}</strong>
        </div>
      </div>

      <footer className="data-relay__steps" aria-hidden="true">
        {messages.steps.map((step) => <span key={step}>{step}</span>)}
      </footer>
    </motion.div>
  );
}
