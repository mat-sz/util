import React from 'react';
import { TbBackslash } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';

export const backslash: ToolInfo = {
  id: 'backslash',
  name: 'Backslash escape/unescape',
  icon: <TbBackslash />,
  Component: React.lazy(() => import('./component.js')),
};
