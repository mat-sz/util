import React from 'react';
import clsx from 'clsx';
import { IoClipboard, IoClose, IoCopy } from 'react-icons/io5/index.js';
import _CodeEditor from '@uiw/react-textarea-code-editor/esm/index.js';

const CodeEditor = _CodeEditor as any;

import styles from './index.module.scss';
import { Button } from '../Button/index.js';
import { copy } from '../../helpers/copy.js';
import { ControlsWrapper } from '../ControlsWrapper/index.js';

interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    'onChange'
  > {
  onChange?: (value: string) => void;
  readOnly?: boolean;
  value?: string | number;
  variant?: 'default' | 'code' | 'hex';
  language?: string;
  flex?: boolean;
}

export const Textarea: React.FC<InputProps> = ({
  className,
  onChange,
  value = '',
  variant = 'default',
  language,
  flex = false,
  ...props
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <ControlsWrapper
      className={clsx(styles.wrapper, className, {
        [styles.flex]: flex,
        [styles.readonly]: props.readOnly,
      })}
      controls={
        <>
          <Button
            icon={<IoCopy />}
            onClick={() => value && copy(`${value}`)}
            title="Copy"
          />
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
              title="Paste"
            />
          )}
          {value && !props.readOnly && (
            <Button
              icon={<IoClose />}
              onClick={() => {
                onChange?.('');
              }}
              title="Reset"
            />
          )}
        </>
      }
    >
      <div className={styles.input}>
        {variant === 'code' && (
          <CodeEditor
            ref={textareaRef}
            className={clsx(styles.textarea, styles.code)}
            {...props}
            data-color-mode="dark"
            language={language}
            value={value}
            onChange={(e: any) => onChange?.(e.target.value)}
          />
        )}
        {variant === 'default' && (
          <textarea
            ref={textareaRef}
            className={clsx(styles.textarea)}
            {...props}
            spellCheck={false}
            value={value}
            onChange={e => onChange?.(e.target.value)}
          />
        )}
      </div>
    </ControlsWrapper>
  );
};
