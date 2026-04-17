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
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={styles.restCard} id={`workout-card-${workout.id}`}>
          <div className={styles.restGlow} />
          <div className={styles.restContent}>
            <div className={styles.restIconWrap}>
              <span className={styles.restIcon}>{workout.icon}</span>
            </div>
            <div>
              <div className={styles.restHeader}>
                <span className={styles.restDay}>{workout.subtitle}</span>
                <h2 className={styles.restName}>Rest Day</h2>
              </div>
              <p className={styles.restDescription}>
                Recovery & regeneration. Active recovery — a 20-min walk with full-body stretching accelerates repair.
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
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/workout/${workout.id}`} className={styles.card} id={`workout-card-${workout.id}`}>
        {/* Gradient border effect */}
        <div 
          className={styles.cardBorderGlow}
          style={{ background: `linear-gradient(135deg, ${workout.color}20, transparent 60%)` }}
        />
        
        <div
          className={styles.glowOrb}
          style={{ background: `radial-gradient(circle, ${workout.color}15 0%, transparent 70%)` }}
        />
        
        <div className={styles.header}>
          <div className={styles.dayBadge} style={{ 
            background: `${workout.color}12`,
            borderColor: `${workout.color}25`,
          }}>
            <span className={styles.dayBadgeText} style={{ color: workout.color }}>
              {workout.subtitle}
            </span>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.titleRow}>
            <span className={styles.icon}>{workout.icon}</span>
            <h2 className={styles.name}>{workout.name}</h2>
          </div>
          <p className={styles.muscles}>{workout.muscles}</p>
        </div>

        <div className={styles.footer}>
          <div className={styles.badgeRow}>
            <div
              className={styles.badge}
              style={{
                background: `${workout.color}10`,
                color: workout.color,
                borderColor: `${workout.color}20`,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v20M2 12h20" strokeLinecap="round" />
              </svg>
              {workout.exercises.length} exercises
            </div>
            <div className={styles.badge} style={{
              background: 'rgba(255,255,255,0.03)',
              color: 'var(--text-secondary)',
              borderColor: 'rgba(255,255,255,0.06)',
            }}>
              4×12
            </div>
          </div>
          <div className={styles.arrow} style={{ color: workout.color }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
