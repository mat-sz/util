import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { IoClose, IoHome, IoSearch } from 'react-icons/io5/index.js';

import styles from './index.module.scss';
import { toolGroups } from '../../tools/index.js';
import { Button } from '../Button/index.js';
import { GroupInfo, ToolInfo } from '../../types.js';

interface ToolItemProps {
  group: GroupInfo;
  tool: ToolInfo;
}

const ToolItem: React.FC<ToolItemProps> = ({ group, tool }) => {
  return (
    <NavLink
      key={tool.id}
      to={`/${group.id}/${tool.id}`}
      className={({ isActive }) => clsx({ [styles.active]: isActive })}
    >
      {tool.icon}
      <span>{tool.name}</span>
    </NavLink>
  );
};

interface ToolGroupProps {
  group: GroupInfo;
  search?: string;
}

const ToolGroup: React.FC<ToolGroupProps> = ({ group, search }) => {
  let tools = group.tools;
  if (search) {
    const str = search.toLowerCase();
    tools = group.tools.filter(
      tool =>
        tool.id.toLowerCase().includes(str) ||
        tool.name.toLowerCase().includes(str) ||
        tool.keywords?.toLowerCase().includes(str) ||
        tool.description?.toLowerCase().includes(str),
    );
  }

  if (!tools.length) {
    return null;
  }

  return (
    <>
      <div className={styles.group}>{group.name}</div>
      {tools.map(tool => (
        <ToolItem key={tool.id} group={group} tool={tool} />
      ))}
    </>
  );
};

export const ToolSelect: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      searchRef.current?.focus();
    }
  }, [open]);

  return (
    <div className={clsx(styles.select, { [styles.open]: open })}>
      <div className={styles.placeholder}>Select a tool</div>
      <div
        className={styles.items}
        onClick={() => {
          setOpen(open => !open);
        }}
      >
        <div
          className={styles.search}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <IoSearch />
          <input
            className={styles.searchInput}
            value={search}
            onChange={e => setSearch(e.target.value)}
            ref={searchRef}
          />
          {!!search && (
            <Button icon={<IoClose />} onClick={() => setSearch('')} />
          )}
        </div>
        <div className={styles.groups}>
          <NavLink
            to="/"
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
          >
            <IoHome />
            <span>Home</span>
          </NavLink>
          {toolGroups.map(group => (
            <ToolGroup
              key={group.id}
              group={group}
              search={open ? search : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
