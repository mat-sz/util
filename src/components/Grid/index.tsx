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
  flex?: boolean;
}

export const Grid: React.FC<React.PropsWithChildren<GridProps>> = ({
  className,
  xs,
  s,
  m,
  l,
  xl,
  flex,
  children,
}) => {
  return (
    <div
      className={clsx(styles.grid, className, { [styles.flex]: flex })}
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
