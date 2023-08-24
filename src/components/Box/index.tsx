import React from 'react';

import styles from './index.module.scss';

export const Box: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.preview}>{children}</div>;
};
