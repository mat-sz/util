import React, { useState } from 'react';
import clsx from 'clsx';
import { IoClipboard, IoClose, IoCopy } from 'react-icons/io5/index.js';

import styles from './index.module.scss';
import { Button } from '../Button/index.js';
import { copy } from '../../helpers/copy.js';

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
  value?: string;
  highlights?: [number, number][];
  flex?: boolean;
}

export const TextareaHighlights: React.FC<InputProps> = ({
  className,
  onChange,
  value = '',
  highlights,
  flex = false,
  ...props
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const layersRef = React.useRef<HTMLDivElement>(null);
  const layers: { before: string; highlight: string; after: string }[] = [];

  const [activeLayer, setActiveLayer] = useState(-1);

  if (highlights) {
    for (const [start, end] of highlights) {
      layers.push({
        before: value.substring(0, start),
        highlight: value.substring(start, end),
        after: value.substring(end),
      });
    }
  }

  return (
    <div
      className={clsx(styles.wrapper, className, {
        [styles.flex]: flex,
        [styles.readonly]: props.readOnly,
      })}
      onClick={() => textareaRef.current?.focus()}
    >
      <span className={styles.controls}>
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
        {value && !props.readOnly && (
          <Button
            icon={<IoClose />}
            onClick={() => {
              onChange?.('');
            }}
          />
        )}
      </span>
      <div className={styles.box}>
        <div className={styles.layers} ref={layersRef}>
          {layers.map((layer, i) => (
            <div
              className={clsx(styles.layer, {
                [styles.active]: activeLayer === i,
              })}
              key={i}
            >
              <span>{layer.before}</span>
              <span className={styles.segmentHighlight} data-index={i}>
                {layer.highlight}
              </span>
              <span>{layer.after}</span>
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          spellCheck={false}
          onScroll={e => {
            console.log('onscroll', e);
            if (!layersRef.current) {
              return;
            }

            layersRef.current.style.top = `${-(e.target as HTMLTextAreaElement)
              .scrollTop}px`;
          }}
          className={clsx(styles.textarea)}
          {...props}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          onPointerMove={e => {
            const allLayers =
              layersRef.current?.querySelectorAll('span[data-index]');
            if (!allLayers) {
              setActiveLayer(-1);
              return;
            }

            const active = document
              .elementsFromPoint(e.clientX, e.clientY)
              .map(element => element.getAttribute('data-index'))
              .find(attr => attr !== null);
            if (typeof active === 'string') {
              setActiveLayer(parseInt(active));
            } else {
              setActiveLayer(-1);
            }
          }}
        />
      </div>
    </div>
  );
};
