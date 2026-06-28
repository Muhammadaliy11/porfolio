import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './Skills.module.css';

const SKILL_CATEGORIES = [
  {
    key: 'frontend',
    icon: '🎨',
    color: '#61dafb',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'CSS / Tailwind', level: 92 },
      { name: 'Framer Motion', level: 80 },
      { name: 'Redux Toolkit', level: 88 },
    ],
  },
  {
    key: 'backend',
    icon: '⚙️',
    color: '#68a063',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express.js', level: 72 },
      { name: 'REST API', level: 80 },
      { name: 'JWT / Auth', level: 70 },
      { name: 'GraphQL', level: 50 },
      { name: 'Socket.io', level: 55 },
    ],
  },
  {
    key: 'database',
    icon: '🗄️',
    color: '#4ea94b',
    skills: [
      { name: 'MongoDB', level: 88 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Redis', level: 72 },
      { name: 'Mongoose', level: 87 },
      { name: 'Prisma', level: 75 },
      { name: 'Firebase', level: 78 },
    ],
  },
  {
    key: 'tools',
    icon: '🛠️',
    color: '#f59e0b',
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'Docker', level: 75 },
      { name: 'AWS / Vercel', level: 78 },
      { name: 'Figma', level: 72 },
      { name: 'Jest / Testing', level: 80 },
      { name: 'Linux / CLI', level: 82 },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={`orb orb-purple ${styles.orb1}`} />
      <div className={`orb orb-cyan ${styles.orb2}`} />

      <section className="section">
        <div className="container">
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>{t('nav.skills')}</span>
            <h1 className={styles.title}>{t('skills.title')}</h1>
            <p className={styles.subtitle}>{t('skills.subtitle')}</p>
          </motion.div>

          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {SKILL_CATEGORIES.map((cat) => (
              <motion.div key={cat.key} variants={itemVariants} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>{cat.icon}</span>
                  <h3>{t(`skills.${cat.key}`)}</h3>
                </div>
                <div className={styles.skills}>
                  {cat.skills.map((skill, i) => (
                    <div key={skill.name} className={styles.skillItem}>
                      <div className={styles.skillMeta}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillLevel} style={{ color: cat.color }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={styles.progressBar}>
                        <motion.div
                          className={styles.progressFill}
                          style={{ background: cat.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack Icons */}
          <motion.div
            className={styles.techStack}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Tech Stack</h3>
            <div className={styles.techIcons}>
              {['React', 'TypeScript', 'Node.js', 'MongoDB', 'Next.js', 'PostgreSQL',
                'Docker', 'AWS', 'Redis', 'GraphQL', 'Git'].map((tech, i) => (
                <motion.div
                  key={tech}
                  className={styles.techIcon}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
