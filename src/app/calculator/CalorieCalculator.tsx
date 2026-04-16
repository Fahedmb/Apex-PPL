'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  calculateCalories,
  ACTIVITY_LABELS,
  type Sex,
  type ActivityLevel,
  type CalorieResult,
} from '@/data/calorieCalculator';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import styles from './CalorieCalculator.module.css';

export default function CalorieCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<Sex>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderately_active');
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age, 10);

    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) return;

    const res = calculateCalories(w, h, a, sex, activityLevel);
    setResult(res);
    setShowResults(true);
  };

  const isValid = parseFloat(weight) > 0 && parseFloat(height) > 0 && parseInt(age) > 0;

  const activityLevels = Object.entries(ACTIVITY_LABELS) as [ActivityLevel, typeof ACTIVITY_LABELS[ActivityLevel]][];

  return (
    <div className={styles.page}>
      <Header title="Calculator" showBack accentColor="#B388FF" />

      <div className={styles.content}>
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className={styles.pageTitle}>Calorie & Macro Calculator</h2>
          <p className={styles.pageSubtitle}>
            Based on the Mifflin-St Jeor equation — the gold standard for metabolic estimation.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className={styles.form}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Sex Toggle */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Sex</label>
            <div className={styles.toggleGroup}>
              <button
                className={`${styles.toggleBtn} ${sex === 'male' ? styles.toggleBtnActive : ''}`}
                onClick={() => setSex('male')}
                id="sex-male"
              >
                Male
              </button>
              <button
                className={`${styles.toggleBtn} ${sex === 'female' ? styles.toggleBtnActive : ''}`}
                onClick={() => setSex('female')}
                id="sex-female"
              >
                Female
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className={styles.inputRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="calc-weight">Weight</label>
              <div className={styles.inputWrap}>
                <input
                  id="calc-weight"
                  type="number"
                  className={styles.input}
                  placeholder="80"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <span className={styles.unit}>kg</span>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="calc-height">Height</label>
              <div className={styles.inputWrap}>
                <input
                  id="calc-height"
                  type="number"
                  className={styles.input}
                  placeholder="180"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <span className={styles.unit}>cm</span>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="calc-age">Age</label>
              <div className={styles.inputWrap}>
                <input
                  id="calc-age"
                  type="number"
                  className={styles.input}
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <span className={styles.unit}>yrs</span>
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Activity Level</label>
            <div className={styles.activityList}>
              {activityLevels.map(([key, val]) => (
                <button
                  key={key}
                  className={`${styles.activityItem} ${activityLevel === key ? styles.activityItemActive : ''}`}
                  onClick={() => setActivityLevel(key)}
                  id={`activity-${key}`}
                >
                  <div className={styles.activityDot} style={activityLevel === key ? { background: '#B388FF' } : undefined} />
                  <div>
                    <span className={styles.activityLabel}>{val.label}</span>
                    <span className={styles.activityDesc}>{val.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            className={styles.calculateBtn}
            onClick={handleCalculate}
            disabled={!isValid}
            id="calculate-button"
          >
            Calculate
          </button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {showResults && result && (
            <motion.div
              className={styles.results}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {/* BMR & TDEE */}
              <div className={styles.resultHeader}>
                <div className={styles.resultCard}>
                  <span className={styles.resultValue}>{result.bmr.toLocaleString()}</span>
                  <span className={styles.resultLabel}>BMR</span>
                </div>
                <div className={styles.resultDivider} />
                <div className={styles.resultCard}>
                  <span className={styles.resultValue} style={{ color: '#B388FF' }}>{result.tdee.toLocaleString()}</span>
                  <span className={styles.resultLabel}>TDEE</span>
                </div>
              </div>

              {/* Phase Cards */}
              <div className={styles.phaseCards}>
                {/* Bulking */}
                <div className={styles.phaseCard} style={{ borderColor: 'rgba(0, 230, 118, 0.2)' }}>
                  <div className={styles.phaseHeader}>
                    <span className={styles.phaseIcon}>📈</span>
                    <div>
                      <h3 className={styles.phaseTitle} style={{ color: '#00E676' }}>Bulking</h3>
                      <p className={styles.phaseSubtitle}>+15% surplus</p>
                    </div>
                    <span className={styles.phaseCalories} style={{ color: '#00E676' }}>
                      {result.bulking.calories.toLocaleString()} kcal
                    </span>
                  </div>
                  <div className={styles.macroRow}>
                    <MacroBar label="Protein" grams={result.bulking.macros.proteinGrams} color="#00D4FF" total={result.bulking.calories} calsPerGram={4} />
                    <MacroBar label="Carbs" grams={result.bulking.macros.carbGrams} color="#FFB300" total={result.bulking.calories} calsPerGram={4} />
                    <MacroBar label="Fat" grams={result.bulking.macros.fatGrams} color="#FF5C8D" total={result.bulking.calories} calsPerGram={9} />
                  </div>
                </div>

                {/* Maintenance */}
                <div className={styles.phaseCard} style={{ borderColor: 'rgba(179, 136, 255, 0.2)' }}>
                  <div className={styles.phaseHeader}>
                    <span className={styles.phaseIcon}>⚖️</span>
                    <div>
                      <h3 className={styles.phaseTitle} style={{ color: '#B388FF' }}>Maintenance</h3>
                      <p className={styles.phaseSubtitle}>Energy balance</p>
                    </div>
                    <span className={styles.phaseCalories} style={{ color: '#B388FF' }}>
                      {result.maintenance.calories.toLocaleString()} kcal
                    </span>
                  </div>
                  <div className={styles.macroRow}>
                    <MacroBar label="Protein" grams={result.maintenance.macros.proteinGrams} color="#00D4FF" total={result.maintenance.calories} calsPerGram={4} />
                    <MacroBar label="Carbs" grams={result.maintenance.macros.carbGrams} color="#FFB300" total={result.maintenance.calories} calsPerGram={4} />
                    <MacroBar label="Fat" grams={result.maintenance.macros.fatGrams} color="#FF5C8D" total={result.maintenance.calories} calsPerGram={9} />
                  </div>
                </div>

                {/* Cutting */}
                <div className={styles.phaseCard} style={{ borderColor: 'rgba(255, 92, 141, 0.2)' }}>
                  <div className={styles.phaseHeader}>
                    <span className={styles.phaseIcon}>📉</span>
                    <div>
                      <h3 className={styles.phaseTitle} style={{ color: '#FF5C8D' }}>Cutting</h3>
                      <p className={styles.phaseSubtitle}>−20% deficit</p>
                    </div>
                    <span className={styles.phaseCalories} style={{ color: '#FF5C8D' }}>
                      {result.cutting.calories.toLocaleString()} kcal
                    </span>
                  </div>
                  <div className={styles.macroRow}>
                    <MacroBar label="Protein" grams={result.cutting.macros.proteinGrams} color="#00D4FF" total={result.cutting.calories} calsPerGram={4} />
                    <MacroBar label="Carbs" grams={result.cutting.macros.carbGrams} color="#FFB300" total={result.cutting.calories} calsPerGram={4} />
                    <MacroBar label="Fat" grams={result.cutting.macros.fatGrams} color="#FF5C8D" total={result.cutting.calories} calsPerGram={9} />
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div className={styles.tipCard}>
                <span className={styles.tipIcon}>💡</span>
                <p className={styles.tipText}>
                  Recalculate every 4–6 weeks or when your weight shifts by more than 3 kg. Protein intake is prioritized during cuts to preserve muscle mass.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.bottomSpacer} />
      </div>

      <BottomNav />
    </div>
  );
}

function MacroBar({ label, grams, color, total, calsPerGram }: {
  label: string;
  grams: number;
  color: string;
  total: number;
  calsPerGram: number;
}) {
  const pct = Math.round((grams * calsPerGram / total) * 100);
  return (
    <div className={styles.macroItem}>
      <div className={styles.macroTop}>
        <span className={styles.macroLabel}>{label}</span>
        <span className={styles.macroGrams} style={{ color }}>{grams}g</span>
      </div>
      <div className={styles.macroBarBg}>
        <motion.div
          className={styles.macroBarFill}
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
      <span className={styles.macroPct}>{pct}%</span>
    </div>
  );
}
