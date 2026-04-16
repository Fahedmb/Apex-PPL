'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Workout } from '@/data/workouts';
import styles from './WorkoutCard.module.css';

interface WorkoutCardProps {
  workout: Workout;
  index: number;
}

export default function WorkoutCard({ workout, index }: WorkoutCardProps) {
  if (workout.isRestDay) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={styles.restCard} id={`workout-card-${workout.id}`}>
          <div className={styles.restContent}>
            <span className={styles.restIcon}>{workout.icon}</span>
            <div>
              <div className={styles.restHeader}>
                <span className={styles.restSubtitle}>{workout.subtitle}</span>
                <h2 className={styles.restName}>{workout.name} Day</h2>
              </div>
              <p className={styles.restDescription}>
                Recovery & regeneration. Active recovery like a 20-min walk with full-body stretching accelerates repair.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/workout/${workout.id}`} className={styles.card} id={`workout-card-${workout.id}`}>
        <div
          className={styles.glowOrb}
          style={{ background: `radial-gradient(circle, ${workout.color}20 0%, transparent 70%)` }}
        />
        <div className={styles.header}>
          <span className={styles.icon}>{workout.icon}</span>
          <span
            className={styles.subtitle}
            style={{ color: workout.color }}
          >
            {workout.subtitle}
          </span>
        </div>
        <h2 className={styles.name}>{workout.name}</h2>
        <p className={styles.muscles}>{workout.muscles}</p>
        <div className={styles.footer}>
          <div className={styles.badgeRow}>
            <div
              className={styles.badge}
              style={{
                background: `${workout.color}15`,
                color: workout.color,
                border: `1px solid ${workout.color}30`,
              }}
            >
              {workout.exercises.length} exercises
            </div>
            <div
              className={styles.badge}
              style={{
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text-secondary)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              4×12
            </div>
          </div>
          <div className={styles.arrow} style={{ color: workout.color }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
