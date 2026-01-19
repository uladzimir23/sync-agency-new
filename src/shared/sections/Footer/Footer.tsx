import React from 'react';
import { FooterForm } from './FooterForm/FooterForm';
import { AnimatedCircle } from './AnimatedCircle/AnimatedCircle';
import styles from './Footer.module.scss';
import { useTheme } from '@/shared/hooks/useTheme';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
        
        {/* Текстовая секция */}
        <div className={styles.textSection}>
          <h2 className={styles.title}>LET'S TALK</h2>
          <p className={styles.subtitle}>
            Get in touch <br />
            if you have any questions or ideas
          </p>
        </div>

        {/* Форма */}
        <div className={styles.formSection}>
          <FooterForm />
        </div>

        {/* Контакты */}
        <div className={styles.contactsSection}>
          <a 
            href="https://t.me/sync_agency" 
            className={styles.contactLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            t.me/sync_agency
          </a>
          <a 
            href="mailto:marketing@sync-agency.com" 
            className={styles.contactLink}
          >
            marketing@sync-agency.com
          </a>
        </div>

        {/* Анимированный круг */}
        <div className={styles.animatedCircleWrapper}>
          <AnimatedCircle />
        </div>

        {/* Логотипы */}
        <div className={styles.logosSection}>
          <div className={styles.logoMain}>SYNс AGENCY</div>
          <div className={styles.logoInverted}>YCNEGA сNYS</div>
          <div className={styles.logoInvertedSecondary}>YCNEGA сNYS</div>
        </div>

      </div>
    </footer>
  );
};