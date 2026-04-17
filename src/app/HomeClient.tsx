'use client';

import { motion } from 'framer-motion';
import { workouts } from '@/data/workouts';
import WorkoutCard from '@/components/WorkoutCard';
import BottomNav from '@/components/BottomNav';
import styles from './Home.module.css';

export default function HomePage() {
  const trainingDays = workouts.filter(w => !w.isRestDay);
  const totalExercises = trainingDays.reduce((sum, w) => sum + w.exercises.length, 0);
  const totalSets = totalExercises * 4;

  return (
    <div className={styles.page}>
      {/* Ambient orbs */}
      <div className={styles.ambientOrb1} />
      <div className={styles.ambientOrb2} />
      <div className={styles.ambientOrb3} />

      {/* Header Section */}
      <div className={styles.hero}>
        <motion.div
          className={styles.logoContainer}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className={styles.logoGlow} />
          <h1 className={styles.logo}>APEX</h1>
        </motion.div>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Fahed&apos;s Routine
        </motion.p>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          7-Day Hypertrophy · 4 Sets × 12 Reps
        </motion.p>

        {/* Stats row */}
        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={styles.statItem}>
            <span className={styles.statValue}>{trainingDays.length}</span>
            <span className={styles.statLabel}>Training Days</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{totalExercises}</span>
            <span className={styles.statLabel}>Exercises</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{totalSets}</span>
            <span className={styles.statLabel}>Weekly Sets</span>
          </div>
        </motion.div>

        {/* Weekly overview strip - enhanced */}
        <motion.div
          className={styles.weekStrip}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {workouts.map((w, i) => (
            <motion.div
              key={w.id}
              className={`${styles.dayDot} ${w.isRestDay ? styles.dayDotRest : ''}`}
              style={!w.isRestDay ? { 
                background: `${w.color}08`,
                borderColor: `${w.color}25`,
              } : undefined}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.05 }}
            >
              <span 
                className={styles.dayNumber} 
                style={!w.isRestDay ? { color: w.color } : undefined}
              >
                {w.dayNumber}
              </span>
              <span className={styles.dayLabel}>
                {w.isRestDay ? 'Rest' : w.name.length > 5 ? w.name.slice(0, 4) : w.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Workout Cards */}
      <div className={styles.cardsSection}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Weekly Split</h2>
          <span className={styles.sectionBadge}>6 + 1 rest</span>
        </motion.div>

        <div className={styles.cardsList}>
          {workouts.map((workout, index) => (
            <WorkoutCard key={workout.id} workout={workout} index={index} />
          ))}
        </div>
      </div>

      <div className={styles.bottomSpacer} />
      <BottomNav />
    </div>
  );
}
