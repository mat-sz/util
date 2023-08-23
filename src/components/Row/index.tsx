import React from 'react';

import styles from './index.module.scss';

export const Row: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.row}>{children}</div>;
};
