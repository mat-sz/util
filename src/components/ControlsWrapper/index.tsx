import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

interface ControlsWrapperProps {
  controls?: React.ReactNode;
  className?: string;
}

export const ControlsWrapper: React.FC<
  React.PropsWithChildren<ControlsWrapperProps>
> = ({ children, controls, className }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.controls}>{controls}</div>
      {children}
    </div>
  );
};
