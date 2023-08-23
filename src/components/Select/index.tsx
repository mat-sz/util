import React from 'react';
import clsx from 'clsx';
import { IoClose } from 'react-icons/io5/index.js';

import styles from './index.module.scss';
import { Button } from '../Button/index.js';

interface SelectProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    'onChange'
  > {
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  value?: string | number;
  defaultValue?: string;
  flex?: boolean;
}

export const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({
  className,
  icon,
  onChange,
  value = '',
  defaultValue,
  flex,
  ...props
}) => {
  const selectRef = React.useRef<HTMLSelectElement>(null);

  return (
    <div className={clsx(styles.wrapper, className, { [styles.flex]: flex })}>
      {icon}
      <select
        ref={selectRef}
        className={clsx(styles.select)}
        {...props}
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
      <span>
        {!!defaultValue && (
          <Button
            icon={<IoClose />}
            onClick={() => {
              onChange?.(defaultValue);
            }}
          />
        )}
      </span>
    </div>
  );
};
