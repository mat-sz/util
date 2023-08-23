import React from 'react';
import clsx from 'clsx';
import { IoClipboard, IoClose, IoCopy } from 'react-icons/io5/index.js';

import styles from './index.module.scss';
import { Button } from '../Button/index.js';
import { copy } from '../../helpers/copy.js';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  readOnly?: boolean;
  value?: string | number;
  defaultValue?: string;
  flex?: boolean;
}

export const Input: React.FC<InputProps> = ({
  className,
  icon,
  onChange,
  value = '',
  flex,
  defaultValue,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div
      className={clsx(styles.wrapper, className, {
        [styles.readonly]: props.readOnly,
      })}
      onClick={() => inputRef.current?.focus()}
      style={{ flex: flex ? 1 : undefined }}
    >
      {icon}
      <input
        ref={inputRef}
        className={clsx(styles.input)}
        spellCheck={false}
        {...props}
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
      <span>
        {props.readOnly && (
          <Button icon={<IoCopy />} onClick={() => value && copy(`${value}`)} />
        )}
        {!props.readOnly && (
          <Button
            icon={<IoClipboard />}
            onClick={async () => {
              try {
                const text = await navigator.clipboard.readText();
                if (text) {
                  onChange?.(text);
                }
              } catch (e) {
                //
              }
            }}
          />
        )}
        {!props.readOnly && (
          <Button
            icon={<IoClose />}
            onClick={() => {
              onChange?.(defaultValue || '');
            }}
          />
        )}
      </span>
    </div>
  );
};
