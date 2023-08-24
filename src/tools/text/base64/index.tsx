import React from 'react';
import { TbBracketsContain } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';

export const base64: ToolInfo = {
  id: 'base64',
  name: 'Base64',
  icon: <TbBracketsContain />,
  Component: React.lazy(() => import('./component.js')),
};
