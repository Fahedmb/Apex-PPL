const GIF_BASE = 'https://raw.githubusercontent.com/omercotkd/exercises-gifs/main/assets';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  tip: string;
  muscleGroup: string;
  gifUrl: string;
}

export interface Workout {
  id: string;
  name: string;
  subtitle: string;
  muscles: string;
  color: string;
  colorRgb: string;
  icon: string;
  exercises: Exercise[];
}

export const workouts: Workout[] = [
  {
    id: 'push',
    name: 'Push',
    subtitle: 'Workout A',
    muscles: 'Chest, Shoulders, Triceps',
    color: '#00D4FF',
    colorRgb: '0, 212, 255',
    icon: '💪',
    exercises: [
      {
        id: 'incline-db-press',
        name: 'Incline Dumbbell Press',
        sets: 4,
        reps: '8-10',
        tip: 'Focus on the stretch at the bottom',
        muscleGroup: 'Chest',
        gifUrl: `${GIF_BASE}/0314.gif`,
      },
      {
        id: 'flat-bench-press',
        name: 'Flat Barbell Bench Press',
        sets: 3,
        reps: '8-12',
        tip: 'Drive your feet into the floor and keep a slight arch',
        muscleGroup: 'Chest',
        gifUrl: `${GIF_BASE}/0025.gif`,
      },
      {
        id: 'shoulder-press',
        name: 'Seated Dumbbell Shoulder Press',
        sets: 3,
        reps: '8-10',
        tip: 'Don\'t lock out at the top — keep tension on the delts',
        muscleGroup: 'Shoulders',
        gifUrl: `${GIF_BASE}/0405.gif`,
      },
      {
        id: 'lateral-raises',
        name: 'Lateral Raises',
        sets: 4,
        reps: '12-15',
        tip: 'Keep the weight moderate and control the descent',
        muscleGroup: 'Shoulders',
        gifUrl: `${GIF_BASE}/0334.gif`,
      },
      {
        id: 'tricep-pushdowns',
        name: 'Triceps Rope Pushdowns',
        sets: 3,
        reps: '10-12',
        tip: 'Spread the rope at the bottom for a full contraction',
        muscleGroup: 'Triceps',
        gifUrl: `${GIF_BASE}/0200.gif`,
      },
      {
        id: 'overhead-extension',
        name: 'Overhead Triceps Extension',
        sets: 3,
        reps: '10-12',
        tip: 'Great for the long head of the tricep',
        muscleGroup: 'Triceps',
        gifUrl: `${GIF_BASE}/0194.gif`,
      },
    ],
  },
  {
    id: 'pull',
    name: 'Pull',
    subtitle: 'Workout B',
    muscles: 'Back, Biceps, Rear Delts',
    color: '#FF8C00',
    colorRgb: '255, 140, 0',
    icon: '🔥',
    exercises: [
      {
        id: 'barbell-rows',
        name: 'Barbell Rows',
        sets: 4,
        reps: '8-10',
        tip: 'Keep your back flat and pull to your lower chest',
        muscleGroup: 'Back',
        gifUrl: `${GIF_BASE}/0027.gif`,
      },
      {
        id: 'lat-pulldowns',
        name: 'Lat Pulldowns',
        sets: 3,
        reps: '8-12',
        tip: 'Pull with your elbows, not your hands — feel the lats',
        muscleGroup: 'Back',
        gifUrl: `${GIF_BASE}/2330.gif`,
      },
      {
        id: 'cable-rows',
        name: 'Seated Cable Rows',
        sets: 3,
        reps: '10-12',
        tip: 'Squeeze your shoulder blades together at the top',
        muscleGroup: 'Back',
        gifUrl: `${GIF_BASE}/0861.gif`,
      },
      {
        id: 'face-pulls',
        name: 'Face Pulls',
        sets: 3,
        reps: '12-15',
        tip: 'Non-negotiable for fixing that desk posture',
        muscleGroup: 'Rear Delts',
        gifUrl: `${GIF_BASE}/0203.gif`,
      },
      {
        id: 'bicep-curls',
        name: 'Barbell Bicep Curls',
        sets: 3,
        reps: '8-12',
        tip: 'Keep elbows pinned to your sides — no swinging',
        muscleGroup: 'Biceps',
        gifUrl: `${GIF_BASE}/0031.gif`,
      },
      {
        id: 'hammer-curls',
        name: 'Hammer Curls',
        sets: 3,
        reps: '10-12',
        tip: 'Builds the brachialis to make your arms look thicker',
        muscleGroup: 'Biceps',
        gifUrl: `${GIF_BASE}/0313.gif`,
      },
    ],
  },
  {
    id: 'legs',
    name: 'Legs',
    subtitle: 'Workout C',
    muscles: 'Quads, Hamstrings, Calves, Core',
    color: '#00E676',
    colorRgb: '0, 230, 118',
    icon: '⚡',
    exercises: [
      {
        id: 'squats',
        name: 'Barbell Squats',
        sets: 4,
        reps: '8-10',
        tip: 'If your lower back rounds, switch to Hack Squats',
        muscleGroup: 'Quads',
        gifUrl: `${GIF_BASE}/0043.gif`,
      },
      {
        id: 'rdls',
        name: 'Romanian Deadlifts',
        sets: 3,
        reps: '8-10',
        tip: 'Push your hips back — feel the stretch in your hamstrings',
        muscleGroup: 'Hamstrings',
        gifUrl: `${GIF_BASE}/0085.gif`,
      },
      {
        id: 'leg-press',
        name: 'Leg Press',
        sets: 3,
        reps: '10-15',
        tip: 'Don\'t lock your knees at the top',
        muscleGroup: 'Quads',
        gifUrl: `${GIF_BASE}/0739.gif`,
      },
      {
        id: 'leg-curls',
        name: 'Leg Curls',
        sets: 3,
        reps: '10-15',
        tip: 'Slow the eccentric — 3 seconds on the way down',
        muscleGroup: 'Hamstrings',
        gifUrl: `${GIF_BASE}/0586.gif`,
      },
      {
        id: 'calf-raises',
        name: 'Standing Calf Raises',
        sets: 4,
        reps: '15-20',
        tip: 'Full range of motion — stretch at the bottom, squeeze at the top',
        muscleGroup: 'Calves',
        gifUrl: `${GIF_BASE}/0605.gif`,
      },
      {
        id: 'hanging-leg-raises',
        name: 'Hanging Leg Raises',
        sets: 3,
        reps: 'To Failure',
        tip: 'Control the movement — no swinging!',
        muscleGroup: 'Core',
        gifUrl: `${GIF_BASE}/0472.gif`,
      },
    ],
  },
];
