'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Workout, Exercise } from '@/data/workouts';
import Header from '@/components/Header';
import WarmupSection from '@/components/WarmupSection';
import RestTimer from '@/components/RestTimer';
import ExerciseCard from '@/components/ExerciseCard';
import ExerciseModal from '@/components/ExerciseModal';
import styles from './WorkoutDetail.module.css';

interface WorkoutDetailProps {
  workout: Workout;
}

export default function WorkoutDetail({ workout }: WorkoutDetailProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <div className={styles.page}>
      <Header title={workout.name} showBack accentColor={workout.color} />

      <div className={styles.content}>
        {/* Workout header */}
        <motion.div
          className={styles.workoutHeader}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.headerGlow} style={{
            background: `radial-gradient(circle, ${workout.color}12 0%, transparent 70%)`
          }} />
          <span className={styles.workoutIcon}>{workout.icon}</span>
          <h2 className={styles.workoutTitle}>{workout.subtitle}: {workout.name}</h2>
          <p className={styles.workoutMuscles}>{workout.muscles}</p>
          <div className={styles.headerStats}>
            <div className={styles.headerStat}>
              <span className={styles.headerStatValue} style={{ color: workout.color }}>
                {workout.exercises.length}
              </span>
              <span className={styles.headerStatLabel}>Exercises</span>
            </div>
            <div className={styles.headerStatDivider} style={{ background: `${workout.color}30` }} />
            <div className={styles.headerStat}>
              <span className={styles.headerStatValue} style={{ color: workout.color }}>
                {workout.exercises.reduce((sum, e) => sum + e.sets, 0)}
              </span>
              <span className={styles.headerStatLabel}>Total Sets</span>
            </div>
            <div className={styles.headerStatDivider} style={{ background: `${workout.color}30` }} />
            <div className={styles.headerStat}>
              <span className={styles.headerStatValue} style={{ color: workout.color }}>
                4×12
              </span>
              <span className={styles.headerStatLabel}>Sets × Reps</span>
            </div>
          </div>
        </motion.div>

        {/* Warmup Section */}
        {workout.warmup.length > 0 && (
          <WarmupSection warmup={workout.warmup} color={workout.color} />
        )}

        {/* Rest Timer */}
        <motion.div
          className={styles.timerSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <RestTimer color={workout.color} />
        </motion.div>

        {/* Important tip */}
        <motion.div
          className={styles.tipBanner}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          style={{ borderColor: `${workout.color}15`, background: `${workout.color}06` }}
        >
          <span className={styles.tipBannerIcon}>⚡</span>
          <p className={styles.tipBannerText}>
            Last reps should be <strong>challenging but clean</strong>. If your form breaks, lower the weight.
          </p>
        </motion.div>

        {/* Exercise list */}
        <div className={styles.exerciseList}>
          {workout.exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index}
              color={workout.color}
              onPress={() => setSelectedExercise(exercise)}
            />
          ))}
        </div>

        {/* Tap hint */}
        <motion.p
          className={styles.tapHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Tap an exercise to see the movement demo
        </motion.p>

        <div className={styles.bottomSpacer} />
      </div>

      {/* Modal */}
      <ExerciseModal
        exercise={selectedExercise}
        color={workout.color}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
}
