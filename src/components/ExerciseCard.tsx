'use client';

import { motion } from 'framer-motion';
import type { Exercise } from '@/data/workouts';
import styles from './ExerciseCard.module.css';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  color: string;
  onPress: () => void;
}

export default function ExerciseCard({ exercise, index, color, onPress }: ExerciseCardProps) {
  return (
    <motion.button
      className={styles.card}
      onClick={onPress}
      id={`exercise-${exercise.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileTap={{ scale: 0.97 }}
    >
      <div className={styles.left}>
        <div className={styles.indexBadge} style={{ background: `${color}15`, color: color, borderColor: `${color}25` }}>
          {index + 1}
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{exercise.name}</h3>
          <p className={styles.muscleGroup}>{exercise.muscleGroup}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.setsBadge}>
          <span className={styles.setsNumber} style={{ color }}>{exercise.sets}×{exercise.reps}</span>
        </div>
        <div className={styles.playIcon} style={{ color }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3.5L12 8L5 12.5V3.5Z" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}
