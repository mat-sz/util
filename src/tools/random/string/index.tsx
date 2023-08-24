import React from 'react';
import { TbAbc } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';

export const string: ToolInfo = {
  id: 'string',
  name: 'String',
  icon: <TbAbc />,
  Component: React.lazy(() => import('./component.js')),
};
