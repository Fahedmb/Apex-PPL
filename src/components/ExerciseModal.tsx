'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Exercise } from '@/data/workouts';
import ExerciseAnimation from './ExerciseAnimation';
import styles from './ExerciseModal.module.css';

interface ExerciseModalProps {
  exercise: Exercise | null;
  color: string;
  onClose: () => void;
}

export default function ExerciseModal({ exercise, color, onClose }: ExerciseModalProps) {
  return (
    <AnimatePresence>
      {exercise && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          id="exercise-modal-overlay"
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            id="exercise-modal-content"
          >
            {/* Drag indicator */}
            <div className={styles.dragBar}>
              <div className={styles.dragIndicator} />
            </div>

            {/* Close button */}
            <button className={styles.closeButton} onClick={onClose} id="exercise-modal-close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Animation area */}
            <div className={styles.animationContainer}>
              <ExerciseAnimation gifUrl={exercise.gifUrl} color={color} exerciseName={exercise.name} />
            </div>

            {/* Info section */}
            <div className={styles.infoSection}>
              <div className={styles.muscleLabel} style={{ color }}>
                {exercise.muscleGroup}
              </div>
              <h2 className={styles.exerciseName}>{exercise.name}</h2>

              {/* Stats */}
              <div className={styles.stats}>
                <div className={styles.statCard} style={{ borderColor: `${color}20` }}>
                  <span className={styles.statValue} style={{ color }}>{exercise.sets}</span>
                  <span className={styles.statLabel}>Sets</span>
                </div>
                <div className={styles.statCard} style={{ borderColor: `${color}20` }}>
                  <span className={styles.statValue} style={{ color }}>{exercise.reps}</span>
                  <span className={styles.statLabel}>Reps</span>
                </div>
              </div>

              {/* Pro Tip */}
              <div className={styles.tipCard} style={{ borderColor: `${color}20`, background: `${color}08` }}>
                <div className={styles.tipHeader}>
                  <span className={styles.tipIcon}>💡</span>
                  <span className={styles.tipTitle} style={{ color }}>Pro Tip</span>
                </div>
                <p className={styles.tipText}>{exercise.tip}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
