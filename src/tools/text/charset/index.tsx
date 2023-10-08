import React from 'react';
import { TbLanguage } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';

export const charset: ToolInfo = {
  id: 'charset',
  name: 'Character encoding',
  icon: <TbLanguage />,
  Component: React.lazy(() => import('./component.js')),
};
