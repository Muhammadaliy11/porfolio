import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useForm } from '../hooks/useForm';
import toast from 'react-hot-toast';
import { Send, MapPin, Mail, Phone, Link2, AtSign } from 'lucide-react';
import styles from './Contact.module.css';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialValues: ContactFormData = { name: '', email: '', subject: '', message: '' };

function validate(values: ContactFormData, t: (k: string) => string) {
  const errors: Partial<ContactFormData> = {};
  if (!values.name.trim()) errors.name = t('contact.name_required');
  if (!values.email.trim()) errors.email = t('contact.email_required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = t('contact.email_invalid');
  if (!values.message.trim()) errors.message = t('contact.message_required');
  return errors;
}

const CONTACTS = [
  { icon: MapPin, label: 'Location', value: 'Tashkent, Uzbekistan' },
  { icon: Mail, label: 'Email', value: 'yaminjonovmuhammadali@gmail.com', href: 'mailto:yaminjonovmuhammadali@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+998 97 324 22 33', href: 'tel:+998973242233' },
];

const SOCIALS = [
  { icon: Link2, href: 'https://github.com', label: 'GitHub' },
  { icon: AtSign, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Send, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, errors, handleChange, handleBlur, validateAll, reset } = useForm(
    initialValues,
    (vals) => validate(vals, t)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      toast.success(t('contact.success'));
      reset();
    } catch {
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={styles.page}>
      <div className={`orb orb-purple ${styles.orb1}`} />
      <div className={`orb orb-pink ${styles.orb2}`} />

      <section className="section">
        <div className="container">
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>{t('nav.contact')}</span>
            <h1 className={styles.title}>{t('contact.title')}</h1>
            <p className={styles.subtitle}>{t('contact.subtitle')}</p>
          </motion.div>

          <div className={styles.grid}>
            {/* Left: Info */}
            <motion.div
              className={styles.infoCol}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className={styles.infoCard}>
                <h3>Let's connect</h3>
                <p>
                  I'm a Junior Full Stack Developer actively looking for opportunities to grow.
                  Whether it's a project collaboration, internship, or just a hello — feel free to reach out!
                </p>
              </motion.div>

              {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                <motion.div key={label} variants={itemVariants} className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className={styles.contactLabel}>{label}</span>
                    {href ? (
                      <a href={href} className={styles.contactValue}>{value}</a>
                    ) : (
                      <p className={styles.contactValue}>{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <motion.div variants={itemVariants}>
                <p className={styles.followLabel}>{t('contact.follow')}</p>
                <div className={styles.socials}>
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className={styles.socialLink} aria-label={label}>
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">{t('contact.name')}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      placeholder="John Doe"
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">{t('contact.email')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">{t('contact.subject')}</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                    placeholder="Project inquiry..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    placeholder="Hello, I'd like to talk about..."
                  />
                  {errors.message && <span className={styles.error}>{errors.message}</span>}
                </div>

                <motion.button
                  type="submit"
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner} />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('contact.send')}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
