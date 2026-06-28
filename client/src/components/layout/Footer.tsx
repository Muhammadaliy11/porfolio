import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Code2, Link2, AtSign, Send, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();

  const socials = [
    { icon: Link2, href: 'https://github.com', label: 'GitHub' },
    { icon: AtSign, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Send, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:yaminjonovmuhammadali@gmail.com', label: 'Email' },
  ];

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/skills', label: t('nav.skills') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.brand}>
              <Link to="/" className={styles.logo}>
                <div className={styles.logoIcon}><Code2 size={20} /></div>
                <span>MY<span className="gradient-text">.dev</span></span>
              </Link>
              <p className={styles.desc}>
                Junior Full Stack Developer based in Tashkent. Started coding in 2024 and building real projects every day.
              </p>
              <div className={styles.socials}>
                {socials.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className={styles.social} aria-label={label}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.nav}>
              <h4 className={styles.navTitle}>Navigation</h4>
              <ul>
                {links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={styles.navLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.contact}>
              <h4 className={styles.navTitle}>Contact</h4>
              <ul className={styles.contactList}>
                <li>📍 Tashkent, Uzbekistan</li>
                <li>📧 yaminjonovmuhammadali@gmail.com</li>
                <li>📱 +998 97 324 22 33</li>
                <li className={styles.available}>
                  <span className={styles.dot}></span> Available for work
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} Muhammadali Yaminjonov. {t('footer.rights')}.</p>
          <p>
            {t('footer.made_with')} <Heart size={13} className={styles.heart} /> {t('footer.and')} React
          </p>
        </div>
      </div>
    </footer>
  );
}
