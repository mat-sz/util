import React from 'react';
import { TbArrowsExchange } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';

export const convert: ToolInfo = {
  id: 'convert',
  name: 'Convert',
  icon: <TbArrowsExchange />,
  Component: React.lazy(() => import('./component.js')),
};
