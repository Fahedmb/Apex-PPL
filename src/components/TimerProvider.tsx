'use client';

import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from 'react';

interface TimerState {
  isRunning: boolean;
  timeLeft: number;
  totalDuration: number;
  workoutName: string;
  workoutColor: string;
}

interface TimerContextType {
  timer: TimerState;
  startTimer: (duration: number, workoutName: string, workoutColor: string) => void;
  stopTimer: () => void;
  isTimerActive: boolean;
}

const TimerContext = createContext<TimerContextType | null>(null);

export function useTimer() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimer must be used within TimerProvider');
  return ctx;
}

// Generate a bell tone using Web Audio API
function playBellSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();

    // Main bell tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(830, ctx.currentTime);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 1.5);

    // Harmonic
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1245, ctx.currentTime);
    gain2.gain.setValueAtTime(0.15, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 1.0);

    // Second bell hit
    setTimeout(() => {
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(830, ctx.currentTime);
      gain3.gain.setValueAtTime(0.25, ctx.currentTime);
      gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(ctx.currentTime);
      osc3.stop(ctx.currentTime + 1.2);
    }, 400);
  } catch {
    // Audio not available
  }
}

function triggerVibration() {
  try {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 300]);
    }
  } catch {
    // Vibration not available
  }
}

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timer, setTimer] = useState<TimerState>({
    isRunning: false,
    timeLeft: 0,
    totalDuration: 0,
    workoutName: '',
    workoutColor: '#00D4FF',
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (timer.isRunning && timer.timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev.timeLeft <= 1) {
            // Timer finished!
            playBellSound();
            triggerVibration();
            return { ...prev, timeLeft: 0, isRunning: false };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return clearTimer;
  }, [timer.isRunning, timer.timeLeft, clearTimer]);

  const startTimer = useCallback((duration: number, workoutName: string, workoutColor: string) => {
    clearTimer();
    setTimer({
      isRunning: true,
      timeLeft: duration,
      totalDuration: duration,
      workoutName,
      workoutColor,
    });
  }, [clearTimer]);

  const stopTimer = useCallback(() => {
    clearTimer();
    setTimer(prev => ({ ...prev, isRunning: false, timeLeft: 0 }));
  }, [clearTimer]);

  const isTimerActive = timer.isRunning || (timer.timeLeft === 0 && timer.totalDuration > 0 && !timer.isRunning);

  return (
    <TimerContext.Provider value={{ timer, startTimer, stopTimer, isTimerActive }}>
      {children}
    </TimerContext.Provider>
  );
}
