import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download, MapPin, Calendar, Award, Code2, Coffee, Users } from 'lucide-react';
import styles from './About.module.css';

const STATS = [
  { icon: Calendar, key: 'experience', value: '1+', color: '#6c63ff' },
  { icon: Code2, key: 'projects_count', value: '10+', color: '#a855f7' },
  { icon: Users, key: 'clients', value: '15+', color: '#ec4899' },
  { icon: Coffee, key: 'coffee', value: '∞', color: '#f59e0b' },
];

const TIMELINE = [
  {
    year: '2025',
    title: 'Junior Full Stack Developer',
    company: 'Freelance / Pet Projects',
    desc: 'Building full-stack applications with React, TypeScript, Node.js and MongoDB. Actively developing portfolio projects and improving skills daily.',
  },
  {
    year: '2024',
    title: 'Started Programming Journey',
    company: 'Self-taught',
    desc: 'Began learning web development from scratch — HTML, CSS, JavaScript, then React and Node.js. Completed multiple courses and built first real projects.',
  },
  {
    year: '2024',
    title: 'First React Project',
    company: 'Personal Project',
    desc: 'Built first React application using hooks, state management and REST API integration. Learned TypeScript fundamentals and modern tooling.',
  },
  {
    year: '2024',
    title: 'Backend & Database',
    company: 'Learning Path',
    desc: 'Mastered Node.js, Express.js, MongoDB and Mongoose. Built RESTful APIs with authentication and CRUD operations.',
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function About() {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={`orb orb-purple ${styles.orb1}`} />
      <div className={`orb orb-pink ${styles.orb2}`} />

      <section className="section">
        <div className="container">
          {/* Header */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>{t('nav.about')}</span>
            <h1 className={styles.title}>{t('about.title')}</h1>
            <p className={styles.subtitle}>{t('about.subtitle')}</p>
          </motion.div>

          {/* Content grid */}
          <div className={styles.grid}>
            {/* Left: Image + info */}
            <motion.div
              className={styles.leftCol}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <div className={styles.profileCard}>
                <div className={styles.profileImg}>
                  <span style={{ fontSize: '5rem' }}>👨‍💻</span>
                  <div className={styles.profileGlow} />
                </div>
                <div className={styles.profileInfo}>
                  <h3>Muhammadali Yaminjonov</h3>
                  <p className="gradient-text">Junior Full Stack Developer</p>
                  <div className={styles.profileMeta}>
                    <span><MapPin size={14} /> Tashkent, Uzbekistan</span>
                    <span><Calendar size={14} /> Since 2024</span>
                    <span><Award size={14} /> Junior Level</span>
                  </div>
                </div>
                <a href="#" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Download size={16} /> {t('about.download_cv')}
                </a>
              </div>

              {/* Stats */}
              <div className={styles.statsGrid}>
                {STATS.map(({ icon: Icon, key, value, color }, i) => (
                  <motion.div
                    key={key}
                    className={styles.statCard}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    style={{ '--stat-color': color } as React.CSSProperties}
                  >
                    <div className={styles.statIcon}>
                      <Icon size={20} />
                    </div>
                    <span className={styles.statValue}>{value}</span>
                    <span className={styles.statLabel}>{t(`about.${key}`)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Text + Timeline */}
            <motion.div
              className={styles.rightCol}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className={styles.bioSection}>
                <h2>{t('about.my_story')}</h2>
                <p>{t('about.bio1')}</p>
                <p>{t('about.bio2')}</p>
              </motion.div>

              <motion.div variants={itemVariants} className={styles.timeline}>
                <h3>Experience</h3>
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    className={styles.timelineItem}
                    variants={itemVariants}
                  >
                    <div className={styles.timelineLeft}>
                      <span className={styles.timelineYear}>{item.year}</span>
                      {i < TIMELINE.length - 1 && <div className={styles.timelineLine} />}
                    </div>
                    <div className={styles.timelineContent}>
                      <h4>{item.title}</h4>
                      <span className={styles.company}>{item.company}</span>
                      <p>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
