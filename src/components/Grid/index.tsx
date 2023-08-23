import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

interface GridProps {
  className?: string;
  cols: number;
}

export const Grid: React.FC<React.PropsWithChildren<GridProps>> = ({
  className,
  cols,
  children,
}) => {
  return (
    <div
      className={clsx(styles.grid, className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridGap: '10px',
        flex: 1,
      }}
    >
      {children}
    </div>
  );
};
