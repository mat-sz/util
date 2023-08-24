import React from 'react';
import { VscJson } from 'react-icons/vsc/index.js';

import { ToolInfo } from '../../../types.js';

export const jwt: ToolInfo = {
  id: 'jwt',
  name: 'JWT',
  icon: <VscJson />,
  Component: React.lazy(() => import('./component.js')),
};
