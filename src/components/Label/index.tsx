import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

interface LabelProps {
  className?: string;
  title: string;
}

export const Label: React.FC<LabelProps> = ({ className, title }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <label>{title}</label>
    </div>
  );
};
