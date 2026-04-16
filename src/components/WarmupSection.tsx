'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WarmupExercise } from '@/data/workouts';
import ExerciseAnimation from './ExerciseAnimation';
import styles from './WarmupSection.module.css';

interface WarmupSectionProps {
  warmup: WarmupExercise[];
  color: string;
}

export default function WarmupSection({ warmup, color }: WarmupSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedWarmup, setSelectedWarmup] = useState<WarmupExercise | null>(null);

  if (!warmup.length) return null;

  const warmupColor = '#FF7043';

  return (
    <>
      <motion.div
        className={styles.section}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <button
          className={styles.header}
          onClick={() => setIsExpanded(!isExpanded)}
          id="warmup-toggle"
        >
          <div className={styles.headerLeft}>
            <div className={styles.warmupIcon}>🔥</div>
            <div>
              <h3 className={styles.title}>Warmup Routine</h3>
              <p className={styles.subtitle}>{warmup.length} exercises · RAMP Protocol</p>
            </div>
          </div>
          <motion.div
            className={styles.chevron}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={styles.content}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className={styles.exerciseList}>
                {warmup.map((exercise, index) => (
                  <motion.button
                    key={exercise.id}
                    className={styles.exerciseItem}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    onClick={() => exercise.gifUrl ? setSelectedWarmup(exercise) : undefined}
                    style={{ cursor: exercise.gifUrl ? 'pointer' : 'default' }}
                  >
                    <div className={styles.exerciseIndex} style={{ 
                      background: `${warmupColor}15`,
                      color: warmupColor,
                      borderColor: `${warmupColor}25`,
                    }}>
                      {index + 1}
                    </div>
                    <div className={styles.exerciseInfo}>
                      <div className={styles.exerciseNameRow}>
                        <h4 className={styles.exerciseName}>{exercise.name}</h4>
                        {exercise.gifUrl && (
                          <div className={styles.demoIcon} style={{ color: warmupColor }}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M5 3.5L12 8L5 12.5V3.5Z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className={styles.exerciseTarget}>{exercise.target}</p>
                      <div className={styles.exerciseMeta}>
                        <span className={styles.exerciseReps} style={{ color: warmupColor }}>
                          {exercise.repsOrDuration}
                        </span>
                        <span className={styles.exerciseRationale}>{exercise.rationale}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Warmup GIF Modal */}
      <AnimatePresence>
        {selectedWarmup && selectedWarmup.gifUrl && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedWarmup(null)}
            id="warmup-modal-overlay"
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.dragBar}>
                <div className={styles.dragIndicator} />
              </div>
              <button className={styles.closeButton} onClick={() => setSelectedWarmup(null)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <div className={styles.modalAnimation}>
                <ExerciseAnimation gifUrl={selectedWarmup.gifUrl} color={warmupColor} exerciseName={selectedWarmup.name} />
              </div>
              <div className={styles.modalInfo}>
                <div className={styles.modalLabel} style={{ color: warmupColor }}>Warmup</div>
                <h2 className={styles.modalName}>{selectedWarmup.name}</h2>
                <p className={styles.modalTarget}>{selectedWarmup.target} · {selectedWarmup.repsOrDuration}</p>
                <div className={styles.modalRationale} style={{ borderColor: `${warmupColor}20`, background: `${warmupColor}08` }}>
                  <span className={styles.modalRationaleIcon}>💡</span>
                  <p className={styles.modalRationaleText}>{selectedWarmup.rationale}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
