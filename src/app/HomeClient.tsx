'use client';

import { motion } from 'framer-motion';
import { workouts } from '@/data/workouts';
import WorkoutCard from '@/components/WorkoutCard';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Header Section */}
      <div className={styles.hero}>
        {/* Ambient glow */}
        <div className={styles.heroGlow} />

        <motion.div
          className={styles.logoContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className={styles.logoIcon}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L4 12L20 20L36 12L20 4Z" fill="url(#grad1)" opacity="0.9" />
              <path d="M4 12V28L20 36V20L4 12Z" fill="url(#grad2)" opacity="0.7" />
              <path d="M36 12V28L20 36V20L36 12Z" fill="url(#grad3)" opacity="0.5" />
              <defs>
                <linearGradient id="grad1" x1="4" y1="4" x2="36" y2="20">
                  <stop stopColor="#00D4FF" />
                  <stop offset="1" stopColor="#00E676" />
                </linearGradient>
                <linearGradient id="grad2" x1="4" y1="12" x2="20" y2="36">
                  <stop stopColor="#00D4FF" />
                  <stop offset="1" stopColor="#FF8C00" />
                </linearGradient>
                <linearGradient id="grad3" x1="36" y1="12" x2="20" y2="36">
                  <stop stopColor="#00E676" />
                  <stop offset="1" stopColor="#FF8C00" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className={styles.logo}>APEX</h1>
        </motion.div>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Push · Pull · Legs
        </motion.p>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          Your workout. Perfected.
        </motion.p>
      </div>

      {/* Workout Cards */}
      <div className={styles.cardsSection}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Today&apos;s Split
        </motion.h2>

        <div className={styles.cardsList}>
          {workouts.map((workout, index) => (
            <WorkoutCard key={workout.id} workout={workout} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom spacer for safe area */}
      <div className={styles.bottomSpacer} />
    </div>
  );
}
