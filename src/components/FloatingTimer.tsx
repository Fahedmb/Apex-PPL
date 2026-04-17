'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from './TimerProvider';
import styles from './FloatingTimer.module.css';

export default function FloatingTimer() {
  const { timer, stopTimer } = useTimer();

  const showBanner = timer.isRunning;
  const progress = timer.totalDuration > 0 ? 1 - timer.timeLeft / timer.totalDuration : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className={styles.banner}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          id="floating-timer-banner"
        >
          {/* Progress bar background */}
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              style={{ background: timer.workoutColor }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.pulseRing} style={{ borderColor: timer.workoutColor }}>
                <div className={styles.pulseDot} style={{ background: timer.workoutColor }} />
              </div>
              <div className={styles.info}>
                <span className={styles.label}>Rest Timer</span>
                <span className={styles.time} style={{ color: timer.workoutColor }}>
                  {formatTime(timer.timeLeft)}
                </span>
              </div>
            </div>
            <button className={styles.stopBtn} onClick={stopTimer}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="3" y="3" width="10" height="10" rx="1.5" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
