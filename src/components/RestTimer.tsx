'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from './TimerProvider';
import styles from './RestTimer.module.css';

interface RestTimerProps {
  color: string;
  workoutName: string;
}

export default function RestTimer({ color, workoutName }: RestTimerProps) {
  const { timer, startTimer, stopTimer } = useTimer();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(90);

  const durations = [60, 75, 90];

  const handleStart = (duration: number) => {
    startTimer(duration, workoutName, color);
    setIsOpen(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = timer.totalDuration > 0 ? 1 - timer.timeLeft / timer.totalDuration : 0;

  return (
    <>
      <motion.button
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.95 }}
        id="rest-timer-button"
        style={{
          borderColor: `${color}25`,
          background: timer.isRunning ? `${color}12` : `${color}08`,
        }}
      >
        <div className={styles.triggerContent}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className={styles.triggerLabel}>
            {timer.isRunning ? (
              <span style={{ color }}>
                Rest: {formatTime(timer.timeLeft)}
              </span>
            ) : timer.timeLeft === 0 && timer.totalDuration > 0 ? (
              <span style={{ color: '#00E676' }}>Rest Complete ✓</span>
            ) : (
              <>Rest Timer <span style={{ color: 'rgba(255,255,255,0.35)' }}>60–90s</span></>
            )}
          </span>
        </div>
        {timer.isRunning && (
          <div className={styles.triggerProgress}>
            <motion.div
              className={styles.triggerProgressBar}
              style={{ background: color }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
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

              <div className={styles.timerContent}>
                <h3 className={styles.timerTitle}>Rest Timer</h3>
                <p className={styles.timerSubtitle}>
                  {timer.isRunning 
                    ? 'Timer running — bell will ring when done' 
                    : 'Rest between sets: 60–90 sec'}
                </p>

                {/* Circle timer display */}
                <div className={styles.circleContainer}>
                  <svg className={styles.circleSvg} viewBox="0 0 120 120">
                    <circle
                      cx="60" cy="60" r="52"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="60" cy="60" r="52"
                      fill="none"
                      stroke={color}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress)}`}
                      transform="rotate(-90 60 60)"
                      style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                    />
                  </svg>
                  <div className={styles.circleTime}>
                    <span className={styles.timeDisplay} style={{ color: timer.isRunning ? color : undefined }}>
                      {formatTime(timer.isRunning ? timer.timeLeft : selectedDuration)}
                    </span>
                    <span className={styles.timeLabel}>
                      {timer.isRunning ? 'remaining' : 'tap start'}
                    </span>
                  </div>
                </div>

                {/* Duration selectors */}
                {!timer.isRunning && (
                  <div className={styles.durations}>
                    {durations.map((d) => (
                      <button
                        key={d}
                        className={`${styles.durationBtn} ${selectedDuration === d ? styles.durationBtnActive : ''}`}
                        onClick={() => setSelectedDuration(d)}
                        style={{
                          borderColor: selectedDuration === d ? `${color}40` : undefined,
                          background: selectedDuration === d ? `${color}12` : undefined,
                          color: selectedDuration === d ? color : undefined,
                        }}
                      >
                        {d}s
                      </button>
                    ))}
                  </div>
                )}

                {/* Action button */}
                <div className={styles.actions}>
                  {timer.isRunning ? (
                    <button
                      className={styles.actionBtn}
                      onClick={() => { stopTimer(); setIsOpen(false); }}
                      style={{ background: 'rgba(255, 92, 92, 0.15)', color: '#FF5C5C', border: '1px solid rgba(255, 92, 92, 0.25)' }}
                    >
                      Stop Timer
                    </button>
                  ) : (
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleStart(selectedDuration)}
                      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
                    >
                      Start {selectedDuration}s Rest
                    </button>
                  )}
                </div>

                <p className={styles.hint}>
                  🔔 Bell + vibration when done · Timer persists across pages
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
