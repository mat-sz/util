import React from 'react';

import styles from './index.module.scss';

interface SectionProps {
  title?: string;
}

export const Section: React.FC<React.PropsWithChildren<SectionProps>> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.section}>
      {!!title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};
