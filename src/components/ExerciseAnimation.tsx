'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExerciseAnimation.module.css';

interface ExerciseAnimationProps {
  gifUrl: string;
  color: string;
  exerciseName: string;
}

export default function ExerciseAnimation({ gifUrl, color, exerciseName }: ExerciseAnimationProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={styles.container}>
      {/* Glow effect behind the GIF */}
      <div
        className={styles.glow}
        style={{ background: `radial-gradient(circle, ${color}15 0%, transparent 70%)` }}
      />

      {/* Loading skeleton */}
      <AnimatePresence>
        {!loaded && !error && (
          <motion.div
            className={styles.skeleton}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.pulseRing} style={{ borderColor: `${color}30` }}>
              <div className={styles.pulseInner} style={{ background: `${color}20` }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12 12-5.37 12-12S22.63 4 16 4zm-2 17V11l6 5-6 5z"
                    fill={color}
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {error && (
        <div className={styles.errorState}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" opacity="0.4" />
            <path d="M12 8v4m0 4h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className={styles.errorText}>Demo unavailable</p>
        </div>
      )}

      {/* GIF */}
      <motion.div
        className={styles.gifWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.95 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gifUrl}
          alt={`${exerciseName} demonstration`}
          className={styles.gif}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      </motion.div>
    </div>
  );
}
