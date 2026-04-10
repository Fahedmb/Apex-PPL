'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  accentColor?: string;
}

export default function Header({ title, showBack = false, accentColor }: HeaderProps) {
  const router = useRouter();

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.inner}>
        {showBack ? (
          <button className={styles.backButton} onClick={() => router.push('/')} id="header-back-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back</span>
          </button>
        ) : (
          <div className={styles.spacer} />
        )}
        {title && (
          <h1 className={styles.title} style={accentColor ? { color: accentColor } : undefined}>
            {title}
          </h1>
        )}
        <div className={styles.spacer} />
      </div>
    </motion.header>
  );
}
