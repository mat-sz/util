import React from 'react';
import { filesize } from 'filesize';
import { download } from 'fitool';
import {
  IoAdd,
  IoClipboard,
  IoClose,
  IoDownload,
} from 'react-icons/io5/index.js';

import styles from './index.module.scss';
import { Button } from '../Button/index.js';
import { ControlsWrapper } from '../ControlsWrapper/index.js';

interface FileSelectProps {
  file?: File;
  onChange?: (file?: File) => void;
}

export const FileSelect: React.FC<FileSelectProps> = ({ file, onChange }) => {
  return (
    <ControlsWrapper
      controls={
        <>
          {' '}
          <Button
            icon={<IoClipboard />}
            onClick={async () => {
              try {
                const file = await (
                  await navigator.clipboard.read()
                )[0]?.getType('image/png');
                if (file) {
                  onChange?.(new File([file], 'clipboard.png'));
                }
              } catch (e) {
                //
              }
            }}
            title="Paste"
          />
          {file && (
            <>
              {' '}
              <Button
                icon={<IoDownload />}
                onClick={() => {
                  download(file, file.name);
                }}
                title="Download"
              />
              <Button
                icon={<IoClose />}
                onClick={() => {
                  onChange?.(undefined);
                }}
                title="Reset"
              />
            </>
          )}
        </>
      }
    >
      <div className={styles.select}>
        <IoAdd />
        {file ? (
          <div className={styles.preview}>
            <div className={styles.name}>{file.name}</div>
            <div className={styles.info}>
              <span>{filesize(file.size)}</span>
              <span>{file.type}</span>
            </div>
          </div>
        ) : (
          <div>No file selected.</div>
        )}
        <input
          type="file"
          onChange={e => {
            onChange?.(e.target.files?.[0]);
          }}
        />
      </div>
    </ControlsWrapper>
  );
};
