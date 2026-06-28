import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Link2, ExternalLink, Heart, Calendar, Tag } from 'lucide-react';
import { projectsApi, MOCK_PROJECTS } from '../services/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Skeleton } from '../components/ui/Skeleton';
import styles from './ProjectDetails.module.css';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((s) => s.favorites.ids);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsApi.getById(id!),
    enabled: !!id,
    retry: 1,
  });

  const project = data?.data ?? MOCK_PROJECTS.find((p) => p._id === id);
  const isFav = id ? favoriteIds.includes(id) : false;

  if (isError) {
    return (
      <div className={styles.errorPage}>
        <span style={{ fontSize: '4rem' }}>⚠️</span>
        <h2>{t('common.error')}</h2>
        <button onClick={() => navigate('/projects')} className="btn btn-primary">
          {t('projects.back')}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={`orb orb-purple ${styles.orb1}`} />
      <div className={`orb orb-pink ${styles.orb2}`} />

      <div className="container">
        <div className={styles.inner}>
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/projects" className={styles.backBtn}>
              <ArrowLeft size={16} /> {t('projects.back')}
            </Link>
          </motion.div>

          {isLoading ? (
            <div className={styles.loadingGrid}>
              <div>
                <Skeleton height="420px" borderRadius="var(--radius-xl)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Skeleton height="2.5rem" width="70%" />
                <Skeleton height="1rem" />
                <Skeleton height="1rem" width="90%" />
                <Skeleton height="1rem" width="80%" />
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  {[1, 2, 3].map((i) => <Skeleton key={i} height="1.8rem" width="70px" borderRadius="999px" />)}
                </div>
              </div>
            </div>
          ) : project ? (
            <motion.div
              className={styles.grid}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Image */}
              <div className={styles.imageSection}>
                <div className={styles.mainImage}>
                  <img src={project.image} alt={project.title} />
                  <div className={styles.imageOverlay}>
                    {project.featured && (
                      <span className={styles.featuredBadge}>⭐ {t('projects.featured')}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className={styles.infoSection}>
                <div className={styles.infoHeader}>
                  <div>
                    <span className={styles.category}>{project.category}</span>
                    <h1 className={styles.title}>{project.title}</h1>
                  </div>
                  <button
                    onClick={() => id && dispatch(toggleFavorite(id))}
                    className={`${styles.favBtn} ${isFav ? styles.favActive : ''}`}
                    aria-label={isFav ? t('projects.remove_favorite') : t('projects.add_favorite')}
                  >
                    <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <p className={styles.description}>{project.longDescription || project.description}</p>

                {/* Meta info */}
                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <Calendar size={14} />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Tag size={14} />
                    <span className={`${styles.statusBadge} ${styles[project.status]}`}>
                      {t(`projects.status_${project.status === 'in-progress' ? 'progress' : project.status}`)}
                    </span>
                  </div>
                </div>

                {/* Technologies */}
                <div className={styles.techSection}>
                  <h3>{t('projects.technologies')}</h3>
                  <div className={styles.techTags}>
                    {project.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        className="tag"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <ExternalLink size={16} /> {t('projects.view_demo')}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <Link2 size={16} /> {t('projects.view_code')}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
