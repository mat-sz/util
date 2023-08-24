import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

interface GridProps {
  className?: string;
  xs?: number;
  s?: number;
  m?: number;
  l?: number;
  xl?: number;
}

export const Grid: React.FC<React.PropsWithChildren<GridProps>> = ({
  className,
  xs,
  s,
  m,
  l,
  xl,
  children,
}) => {
  return (
    <div
      className={clsx(styles.grid, className)}
      style={{
        '--cols-xs': xs,
        '--cols-s': s,
        '--cols-m': m,
        '--cols-l': l,
        '--cols-xl': xl,
      }}
    >
      {children}
    </div>
  );
};
