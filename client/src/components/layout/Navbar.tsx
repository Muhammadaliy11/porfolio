import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, Menu, X, Code2, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleTheme } from '../../features/theme/themeSlice';
import { setLanguage } from '../../features/projects/languageSlice';
import type { Language } from '../../types';
import styles from './Navbar.module.css';

const LANGS: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.mode);
  const favCount = useAppSelector((s) => s.favorites.ids.length);
  const currentLang = useAppSelector((s) => s.language.lang);
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleLang = (lang: Language) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/skills', label: t('nav.skills') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          <motion.div className={styles.logoIcon} whileHover={{ rotate: 20 }}>
            <Code2 size={22} />
          </motion.div>
          <span className={styles.logoText}>
            MY<span className="gradient-text">.dev</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <div className={styles.desktopLinks}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Language */}
          <div className={styles.langDropdown}>
            <button
              className={styles.iconBtn}
              onClick={() => setLangOpen((p) => !p)}
              aria-label={t('common.language')}
            >
              <Globe size={18} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={styles.dropdown}
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLang(l.code)}
                      className={`${styles.dropdownItem} ${currentLang === l.code ? styles.activeLang : ''}`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme */}
          <motion.button
            className={styles.iconBtn}
            onClick={() => dispatch(toggleTheme())}
            whileTap={{ scale: 0.9 }}
            aria-label={t('common.theme')}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Favorites */}
          <NavLink to="/projects" className={styles.favBtn} aria-label="Favorites">
            <Heart size={18} />
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </NavLink>

          {/* Mobile toggle */}
          <button
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={t('common.open_menu')}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.mobileMenu}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `${styles.mobileLink} ${isActive ? styles.active : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
            <div className={styles.mobileLangs}>
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLang(l.code)}
                  className={`${styles.mobileLangBtn} ${currentLang === l.code ? styles.activeLang : ''}`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
