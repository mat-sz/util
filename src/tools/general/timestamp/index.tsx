import React from 'react';
import { IoTime } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const timestamp: ToolInfo = {
  id: 'timestamp',
  name: 'Timestamp',
  icon: <IoTime />,
  Component: React.lazy(() => import('./component.js')),
};
