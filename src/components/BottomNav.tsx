'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './BottomNav.module.css';

const tabs = [
  {
    id: 'workouts',
    label: 'Workouts',
    href: '/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11v11h-11z" />
        <path d="M6.5 1v5.5M17.5 1v5.5M6.5 17.5V23M17.5 17.5V23M1 6.5h5.5M1 17.5h5.5M17.5 6.5H23M17.5 17.5H23" />
      </svg>
    ),
  },
  {
    id: 'calculator',
    label: 'Calculator',
    href: '/calculator',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="10" y2="10" />
        <line x1="14" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="10" y2="14" />
        <line x1="14" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="16" y2="18" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === '/calculator') return 'calculator';
    return 'workouts';
  };

  const activeTab = getActiveTab();

  return (
    <nav className={styles.nav} id="bottom-nav">
      <div className={styles.inner}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Link key={tab.id} href={tab.href} className={styles.tab} id={`nav-${tab.id}`}>
              <div className={styles.tabContent}>
                <div className={`${styles.iconWrap} ${isActive ? styles.iconActive : ''}`}>
                  {tab.icon}
                </div>
                <span className={`${styles.label} ${isActive ? styles.labelActive : ''}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
