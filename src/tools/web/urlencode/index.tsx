import React from 'react';
import { TbPercentage } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';

export const urlencode: ToolInfo = {
  id: 'urlencode',
  name: 'URLEncode',
  icon: <TbPercentage />,
  Component: React.lazy(() => import('./component.js')),
};
