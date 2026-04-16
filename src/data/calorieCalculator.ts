// ─── Calorie & Macro Calculator ───
// Based on Mifflin-St Jeor equation (gold standard)
// Reference: "Calorie Calculation and Macronutrient Guide" research doc

export type Sex = 'male' | 'female';

export type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'super_active';

export const ACTIVITY_LABELS: Record<ActivityLevel, { label: string; description: string; multiplier: number }> = {
  sedentary: {
    label: 'Sedentary',
    description: 'Desk job, little to no exercise',
    multiplier: 1.2,
  },
  lightly_active: {
    label: 'Lightly Active',
    description: 'Light exercise 1–3 days/week',
    multiplier: 1.375,
  },
  moderately_active: {
    label: 'Moderately Active',
    description: 'Moderate exercise 3–5 days/week',
    multiplier: 1.55,
  },
  very_active: {
    label: 'Very Active',
    description: 'Hard exercise 6–7 days/week',
    multiplier: 1.725,
  },
  super_active: {
    label: 'Super Active',
    description: 'Very hard exercise, physical job',
    multiplier: 1.9,
  },
};

export interface MacroBreakdown {
  proteinGrams: number;
  proteinCalories: number;
  carbGrams: number;
  carbCalories: number;
  fatGrams: number;
  fatCalories: number;
}

export interface CalorieResult {
  bmr: number;
  tdee: number;
  bulking: {
    calories: number;
    macros: MacroBreakdown;
  };
  cutting: {
    calories: number;
    macros: MacroBreakdown;
  };
  maintenance: {
    calories: number;
    macros: MacroBreakdown;
  };
}

/**
 * Calculate BMR using the Mifflin-St Jeor equation
 * Men:   BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5
 * Women: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161
 */
export function calculateBMR(weightKg: number, heightCm: number, age: number, sex: Sex): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(sex === 'male' ? base + 5 : base - 161);
}

/**
 * Calculate TDEE = BMR × activity multiplier
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return Math.round(bmr * ACTIVITY_LABELS[activityLevel].multiplier);
}

/**
 * Calculate macros for a target calorie goal
 * Bulking: Protein 2.0 g/kg, Fat 0.8 g/kg, Carbs = remainder
 * Cutting: Protein 2.2 g/kg, Fat 0.8 g/kg, Carbs = remainder
 * Maintenance: Protein 1.8 g/kg, Fat 0.8 g/kg, Carbs = remainder
 */
function calculateMacros(
  totalCalories: number,
  weightKg: number,
  proteinPerKg: number,
  fatPerKg: number,
): MacroBreakdown {
  const proteinGrams = Math.round(proteinPerKg * weightKg);
  const fatGrams = Math.round(fatPerKg * weightKg);
  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;
  const carbCalories = Math.max(0, totalCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  return {
    proteinGrams,
    proteinCalories,
    carbGrams,
    carbCalories,
    fatGrams,
    fatCalories,
  };
}

/**
 * Full calorie calculation pipeline
 */
export function calculateCalories(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: Sex,
  activityLevel: ActivityLevel,
): CalorieResult {
  const bmr = calculateBMR(weightKg, heightCm, age, sex);
  const tdee = calculateTDEE(bmr, activityLevel);

  // Bulking: +15% surplus
  const bulkingCalories = Math.round(tdee * 1.15);
  // Cutting: -20% deficit
  const cuttingCalories = Math.round(tdee * 0.80);

  return {
    bmr,
    tdee,
    bulking: {
      calories: bulkingCalories,
      macros: calculateMacros(bulkingCalories, weightKg, 2.0, 0.8),
    },
    cutting: {
      calories: cuttingCalories,
      macros: calculateMacros(cuttingCalories, weightKg, 2.2, 0.8),
    },
    maintenance: {
      calories: tdee,
      macros: calculateMacros(tdee, weightKg, 1.8, 0.8),
    },
  };
}
