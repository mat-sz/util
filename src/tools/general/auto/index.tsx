import React from 'react';
import { IoRefresh } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const auto: ToolInfo = {
  id: 'auto',
  name: 'Auto-detect',
  icon: <IoRefresh />,
  Component: React.lazy(() => import('./component.js')),
};
