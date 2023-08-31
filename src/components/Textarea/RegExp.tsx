import React, { useState } from 'react';
import clsx from 'clsx';
import {
  IoCheckmark,
  IoClipboard,
  IoClose,
  IoCopy,
} from 'react-icons/io5/index.js';
import _CodeEditor from '@uiw/react-textarea-code-editor/esm/index.js';

const CodeEditor = _CodeEditor as any;

import styles from './index.module.scss';
import { Button } from '../Button/index.js';
import { copy } from '../../helpers/copy.js';
import { ControlsWrapper } from '../ControlsWrapper/index.js';

const regexpFlags = {
  g: {
    name: 'global',
    description: "Don't return after first match",
  },
  m: {
    name: 'multi line',
    description: '^ and $ match start/end of line',
  },
  i: {
    name: 'insensitive',
    description: 'Case insensitive match',
  },
  y: {
    name: 'sticky',
    description:
      'Anchor to start of pattern, or at the end of the most recent match',
  },
  s: {
    name: 'single line',
    description: 'Dot matches newline',
  },
  u: {
    name: 'unicode',
    description: 'Match with full unicode',
  },
  v: {
    name: 'unicode (all)',
    description: 'Enable all unicode and character set features',
  },
};

function regexpFromString(str: string) {
  const firstSlash = str.indexOf('/');
  const lastSlash = str.lastIndexOf('/');
  if (firstSlash !== -1 && lastSlash !== -1 && firstSlash !== lastSlash) {
    const source = str.substring(firstSlash + 1, lastSlash);
    const flags = str.substring(lastSlash + 1);
    return tryRegexp(source, flags);
  } else {
    return tryRegexp(str, '');
  }
}

function tryRegexp(source: string, flags: string): TextareaRegExpValue {
  try {
    return { source, flags, regexp: new RegExp(source, flags + 'd') };
  } catch (e) {
    return { source, flags };
  }
}

interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    'onChange'
  > {
  onChange?: (value?: TextareaRegExpValue) => void;
  readOnly?: boolean;
  value?: TextareaRegExpValue;
  language?: string;
  flex?: boolean;
}

export interface TextareaRegExpValue {
  source: string;
  flags: string;
  regexp?: RegExp;
}

export const TextareaRegExp: React.FC<InputProps> = ({
  className,
  onChange,
  value,
  flex = false,
  ...props
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const [showRegexpFlags, setShowRegexpFlags] = useState(false);

  const flags = value?.flags || '';
  const source = value?.source || '';

  return (
    <ControlsWrapper
      className={clsx(styles.wrapper, styles.wrapperRegexp, className, {
        [styles.flex]: flex,
        [styles.readonly]: props.readOnly,
      })}
      controls={
        <>
          {props.readOnly && (
            <Button
              icon={<IoCopy />}
              onClick={() => value && copy(`${value}`)}
            />
          )}
          {!props.readOnly && (
            <Button
              icon={<IoClipboard />}
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  if (text) {
                    onChange?.(regexpFromString(text));
                  }
                } catch (e) {
                  //
                }
              }}
            />
          )}
          {value && !props.readOnly && (
            <Button
              icon={<IoClose />}
              onClick={() => {
                onChange?.({ source: '', flags: 'g' });
              }}
            />
          )}
        </>
      }
    >
      <div className={styles.regexp}>
        <div className={styles.regexpDelimiter}>/</div>
        <CodeEditor
          ref={textareaRef}
          className={clsx(styles.textarea, styles.code)}
          {...props}
          data-color-mode="dark"
          language="regex"
          value={source}
          onChange={(e: any) => onChange?.(tryRegexp(e.target.value, flags))}
          padding={0}
        />
        <div
          className={clsx(styles.regexpDelimiter, styles.flags, {
            [styles.flagsShow]: showRegexpFlags,
          })}
          onClick={() => !props.readOnly && setShowRegexpFlags(show => !show)}
        >
          <span>/{flags}</span>
          <div className={clsx(styles.flagsMenu)}>
            {Object.entries(regexpFlags).map(([flag, meta]) => (
              <div
                key={flag}
                className={styles.flag}
                onClick={e => {
                  e.stopPropagation();

                  if (flags.includes(flag)) {
                    onChange?.(tryRegexp(source, flags.replaceAll(flag, '')));
                  } else {
                    onChange?.(tryRegexp(source, flags + flag));
                  }
                }}
              >
                <div>
                  <span>
                    {flag} - {meta.name}
                  </span>
                  <span>{meta.description}</span>
                </div>
                {flags.includes(flag) ? <IoCheckmark /> : <span />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ControlsWrapper>
  );
};
