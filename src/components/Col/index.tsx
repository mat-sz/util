import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

interface ColProps {
  center?: boolean;
}

export const Col: React.FC<React.PropsWithChildren<ColProps>> = ({
  center,
  children,
}) => {
  return (
    <div className={clsx(styles.col, { [styles.center]: center })}>
      {children}
    </div>
  );
};
