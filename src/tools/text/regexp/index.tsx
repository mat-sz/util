import React from 'react';
import { VscRegex } from 'react-icons/vsc/index.js';

import { ToolInfo } from '../../../types.js';

export const regexp: ToolInfo = {
  id: 'regexp',
  name: 'RegExp',
  icon: <VscRegex />,
  Component: React.lazy(() => import('./component.js')),
};
