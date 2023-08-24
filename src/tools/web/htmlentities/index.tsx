import React from 'react';
import { TbAmpersand } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';

export const htmlentities: ToolInfo = {
  id: 'htmlentities',
  name: 'HTML entities encode/decode',
  icon: <TbAmpersand />,
  Component: React.lazy(() => import('./component.js')),
};
