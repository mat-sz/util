import React from 'react';

import styles from './index.module.scss';

export const Info: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.info}>{children}</div>;
};
