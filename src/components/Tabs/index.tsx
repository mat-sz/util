import React, { useState } from 'react';

import styles from './index.module.scss';
import clsx from 'clsx';

interface TabItem {
  id: string;
  title: string;
  view: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [active, setActive] = useState(tabs[0].id);
  const activeItem = tabs.find(item => item.id === active);

  return (
    <>
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <div
            className={clsx(styles.tab, {
              [styles.active]: active === tab.id,
            })}
            key={tab.id}
            onClick={() => setActive(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {activeItem?.view}
    </>
  );
};
