import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft } from 'lucide-react';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={`orb orb-purple ${styles.orb1}`} />
      <div className={`orb orb-pink ${styles.orb2}`} />

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles.number}
        >
          <span className="gradient-text">4</span>
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ display: 'inline-block' }}
          >
            0
          </motion.span>
          <span className="gradient-text">4</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={styles.text}
        >
          <h2>{t('common.not_found')}</h2>
          <p>{t('common.not_found_desc')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={styles.actions}
        >
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> {t('common.go_home')}
          </Link>
          <button onClick={() => history.back()} className="btn btn-secondary">
            <ArrowLeft size={16} /> Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
