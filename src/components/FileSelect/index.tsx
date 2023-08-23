import React from 'react';
import { filesize } from 'filesize';
import { IoAdd } from 'react-icons/io5/index.js';

import styles from './index.module.scss';

interface FileSelectProps {
  file?: File;
  onChange?: (file?: File) => void;
}

export const FileSelect: React.FC<FileSelectProps> = ({ file, onChange }) => {
  return (
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
  );
};
