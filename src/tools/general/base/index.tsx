import React from 'react';
import { Tb123 } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';

export const base: ToolInfo = {
  id: 'base',
  name: 'Number base conversion',
  icon: <Tb123 />,
  Component: React.lazy(() => import('./component.js')),
};
