import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  icon,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles.iconOnly]: !children,
      })}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};
