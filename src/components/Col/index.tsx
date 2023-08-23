import React from 'react';

import styles from './index.module.scss';

export const Col: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.col}>{children}</div>;
};
