import React from 'react';
import { TbHexagon } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';

export const hash: ToolInfo = {
  id: 'hash',
  name: 'Hash',
  icon: <TbHexagon />,
  Component: React.lazy(() => import('./component.js')),
};
