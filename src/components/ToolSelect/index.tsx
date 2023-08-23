import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { IoClose, IoSearch } from 'react-icons/io5/index.js';

import styles from './index.module.scss';
import { toolGroups } from '../../tools/index.js';
import { Button } from '../Button/index.js';

export const ToolSelect: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <div className={clsx(styles.select, { [styles.open]: open })}>
      <div className={styles.placeholder}>Select a tool</div>
      <div className={styles.items} onClick={() => setOpen(open => !open)}>
        <div
          className={styles.search}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <IoSearch />
          <input
            type="text"
            className={styles.searchInput}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {!!search && (
            <Button icon={<IoClose />} onClick={() => setSearch('')} />
          )}
        </div>
        {toolGroups.map(group => {
          return (
            <React.Fragment key={group.id}>
              <div className={styles.group}>{group.name}</div>
              {group.tools.map(tool => (
                <NavLink
                  key={tool.id}
                  to={`/tool/${tool.id}`}
                  className={({ isActive }) =>
                    clsx({ [styles.active]: isActive })
                  }
                >
                  {tool.icon}
                  <span>{tool.name}</span>
                </NavLink>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
