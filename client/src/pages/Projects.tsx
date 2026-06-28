import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Search, Heart, ExternalLink, Link2, Filter, X } from 'lucide-react';
import { projectsApi, MOCK_PROJECTS } from '../services/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { ProjectCardSkeleton } from '../components/ui/Skeleton';
import type { Project } from '../types';
import styles from './Projects.module.css';

const CATEGORIES = ['all', 'frontend', 'backend', 'fullstack', 'mobile'] as const;

export default function Projects() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((s) => s.favorites.ids);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [sort, setSort] = useState('-createdAt');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.getAll(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const projects = data?.data ?? MOCK_PROJECTS;

  const filtered = useMemo(() => {
    let result = [...projects];

    if (showFavorites) result = result.filter((p) => favoriteIds.includes(p._id));
    if (category !== 'all') result = result.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort === '-createdAt') result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (sort === 'createdAt') result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return result;
  }, [projects, category, search, showFavorites, sort, favoriteIds]);

  const isFav = (id: string) => favoriteIds.includes(id);

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
            <span className={styles.label}>{t('nav.projects')}</span>
            <h1 className={styles.title}>{t('projects.title')}</h1>
            <p className={styles.subtitle}>{t('projects.subtitle')}</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className={styles.filters}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Search */}
            <div className={styles.searchWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder={t('projects.search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              {search && (
                <button onClick={() => setSearch('')} className={styles.clearBtn}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className={styles.categoryFilters}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`${styles.filterBtn} ${category === cat ? styles.active : ''}`}
                >
                  {t(`projects.${cat}`)}
                </button>
              ))}
            </div>

            {/* Right side filters */}
            <div className={styles.rightFilters}>
              <button
                onClick={() => setShowFavorites((p) => !p)}
                className={`${styles.favFilterBtn} ${showFavorites ? styles.active : ''}`}
              >
                <Heart size={14} fill={showFavorites ? 'currentColor' : 'none'} />
                {t('projects.favorites')}
                {favoriteIds.length > 0 && (
                  <span className={styles.favCount}>{favoriteIds.length}</span>
                )}
              </button>

              <div className={styles.sortWrapper}>
                <Filter size={14} />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="-createdAt">{t('projects.newest')}</option>
                  <option value="createdAt">{t('projects.oldest')}</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results count */}
          {!isLoading && !isError && (
            <motion.p
              className={styles.resultsCount}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            </motion.p>
          )}

          {/* Error */}
          {isError && (
            <div className={styles.errorState}>
              <p>⚠️ {t('common.error')}</p>
              <button onClick={() => refetch()} className="btn btn-primary">
                {t('common.retry')}
              </button>
            </div>
          )}

          {/* Grid */}
          <div className={styles.grid}>
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
              : filtered.length === 0
              ? (
                <motion.div
                  className={styles.emptyState}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span style={{ fontSize: '3rem' }}>🔍</span>
                  <p>{t('projects.no_results')}</p>
                </motion.div>
              )
              : (
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, i) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      index={i}
                      isFav={isFav(project._id)}
                      onToggleFav={() => dispatch(toggleFavorite(project._id))}
                      t={t}
                    />
                  ))}
                </AnimatePresence>
              )
            }
          </div>
        </div>
      </section>
    </div>
  );
}

interface CardProps {
  project: Project;
  index: number;
  isFav: boolean;
  onToggleFav: () => void;
  t: (key: string) => string;
}

function ProjectCard({ project, index, isFav, onToggleFav, t }: CardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={styles.card}
    >
      {/* Image */}
      <div className={styles.cardImg}>
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className={styles.cardOverlay}>
          {project.featured && (
            <span className={styles.featuredBadge}>⭐ {t('projects.featured')}</span>
          )}
          <span className={`${styles.statusBadge} ${styles[project.status]}`}>
            {t(`projects.status_${project.status === 'in-progress' ? 'progress' : project.status}`)}
          </span>
        </div>
        <button
          onClick={onToggleFav}
          className={`${styles.favBtn} ${isFav ? styles.favActive : ''}`}
          aria-label={isFav ? t('projects.remove_favorite') : t('projects.add_favorite')}
        >
          <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.category}>{project.category}</span>
        </div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>

        <div className={styles.techTags}>
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tag">+{project.technologies.length - 4}</span>
          )}
        </div>

        <div className={styles.cardActions}>
          <Link to={`/projects/${project._id}`} className="btn btn-primary" style={{ flex: 1, fontSize: '0.82rem', padding: '0.6rem 1rem' }}>
            {t('projects.details')}
          </Link>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary" style={{ padding: '0.6rem 0.875rem' }}>
              <Link2 size={15} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary" style={{ padding: '0.6rem 0.875rem' }}>
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
