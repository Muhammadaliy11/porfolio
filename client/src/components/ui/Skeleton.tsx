import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = '1rem', borderRadius, className }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${styles.skeleton} ${className ?? ''}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton height="220px" borderRadius="0" />
      <div className={styles.body}>
        <Skeleton height="1.4rem" width="70%" />
        <Skeleton height="0.9rem" />
        <Skeleton height="0.9rem" width="85%" />
        <div className={styles.tags}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height="1.5rem" width="60px" borderRadius="999px" />
          ))}
        </div>
        <div className={styles.actions}>
          <Skeleton height="2.2rem" width="100px" borderRadius="8px" />
          <Skeleton height="2.2rem" width="80px" borderRadius="8px" />
        </div>
      </div>
    </div>
  );
}
