import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Download, Link2, AtSign, Send, Sparkles, ChevronDown } from 'lucide-react';
import styles from './Home.module.css';

const TECH_ICONS = [
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'MongoDB', color: '#4ea94b' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Python', color: '#f7d84b' },
];

const STATS = [
  { key: 'experience', value: '1+' },
  { key: 'projects_count', value: '10+' },
  { key: 'clients', value: '15+' },
  { key: 'coffee', value: '∞' },
];

export default function Home() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className={styles.page} ref={containerRef}>
      {/* Background orbs */}
      <div className={`orb orb-purple ${styles.orb1}`} />
      <div className={`orb orb-pink ${styles.orb2}`} />
      <div className={`orb orb-cyan ${styles.orb3}`} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className={styles.heroText}
            >
              {/* Available badge */}
              <motion.div variants={item} className={styles.badge}>
                <span className={styles.badgeDot} />
                <Sparkles size={13} />
                {t('hero.available')}
              </motion.div>

              <motion.p variants={item} className={styles.greeting}>
                {t('hero.greeting')}
              </motion.p>

              <motion.h1 variants={item} className={styles.name}>
                {t('hero.name')}
              </motion.h1>

              <motion.div variants={item} className={styles.roleWrapper}>
                <span className={`gradient-text ${styles.role}`}>{t('hero.role')}</span>
              </motion.div>

              <motion.p variants={item} className={styles.tagline}>
                {t('hero.tagline')}
              </motion.p>

              <motion.div variants={item} className={styles.ctas}>
                <Link to="/projects" className="btn btn-primary">
                  {t('hero.cta_projects')} <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  {t('hero.cta_contact')}
                </Link>
                <a href="#" className="btn btn-ghost">
                  <Download size={16} /> CV
                </a>
              </motion.div>

              <motion.div variants={item} className={styles.socials}>
                {[
                  { icon: Link2, href: 'https://github.com' },
                  { icon: AtSign, href: 'https://linkedin.com' },
                  { icon: Send, href: 'https://twitter.com' },
                ].map(({ icon: Icon, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    className={styles.socialLink}>
                    <Icon size={18} />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero visual */}
            <motion.div
              className={styles.heroVisual}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ y }}
            >
              <div className={styles.avatar}>
                <div className={styles.avatarInner}>
                  <motion.div
                    className={styles.avatarGlow}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className={styles.avatarImg}>
                    <span className={styles.avatarEmoji}>👨‍💻</span>
                  </div>
                </div>

                {/* Floating tech cards */}
                {TECH_ICONS.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    className={styles.techFloat}
                    style={{
                      '--angle': `${i * 60}deg`,
                      '--color': tech.color,
                    } as React.CSSProperties}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <motion.span
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear' }}
                      className={styles.techName}
                    >
                      {tech.name}
                    </motion.span>
                  </motion.div>
                ))}

                {/* Orbit ring */}
                <div className={styles.orbit} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className="container">
          <motion.div
            className={styles.statsGrid}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {STATS.map(({ key, value }, i) => (
              <motion.div
                key={key}
                className={styles.statCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <span className={`gradient-text ${styles.statValue}`}>{value}</span>
                <span className={styles.statLabel}>{t(`about.${key}`)}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured section teaser */}
      <section className={styles.featuredSection}>
        <div className="container">
          <motion.div
            className={styles.featuredHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>{t('projects.title')}</h2>
            <Link to="/projects" className="btn btn-secondary">
              {t('projects.view_all')} <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
