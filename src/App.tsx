import React, { Suspense } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import { toolGroups } from './tools/index.js';
import { ToolSelect } from './components/ToolSelect/index.js';
import { Home } from './pages/home/index.js';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.main}>
        <div className={styles.header}>
          <Link to="/">
            <h1>util.to</h1>
          </Link>
          <ToolSelect />
        </div>
        <div className={styles.tool}>
          <Suspense fallback={<>Loading...</>}>
            <Routes>
              {toolGroups.map(group =>
                group.tools.map(({ id, Component }) => (
                  <Route
                    key={id}
                    path={`/${group.id}/${id}`}
                    Component={Component}
                  />
                )),
              )}
              <Route path={'*'} index Component={Home} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};
