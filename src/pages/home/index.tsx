import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './index.module.scss';
import { toolGroups } from '../../tools/index.js';

export const Home: React.FC = () => {
  return (
    <div>
      {toolGroups.map(group => {
        return (
          <React.Fragment key={group.id}>
            <div className={styles.group}>{group.name}</div>
            {group.tools.map(tool => (
              <NavLink
                key={tool.id}
                to={`/tool/${tool.id}`}
                className={styles.tool}
              >
                {tool.icon}
                <span>{tool.name}</span>
              </NavLink>
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};
