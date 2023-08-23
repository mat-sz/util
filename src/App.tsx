import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import { allTools } from './tools/index.js';
import { ToolSelect } from './components/ToolSelect/index.js';
import { Home } from './pages/home/index.js';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.main}>
        <ToolSelect />
        <div className={styles.tool}>
          <Routes>
            {allTools.map(({ id, name, Component }) => (
              <Route
                key={id}
                path={`/tool/${id}`}
                element={
                  <>
                    <h1>{name}</h1>
                    <div className={styles.toolContent}>
                      <Component />
                    </div>
                  </>
                }
              />
            ))}
            <Route
              path={'*'}
              index
              element={
                <>
                  <h1>util.to</h1>
                  <div className={styles.toolContent}>
                    <Home />
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
