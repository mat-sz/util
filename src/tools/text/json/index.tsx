import React from 'react';
import { VscJson } from 'react-icons/vsc/index.js';

import { ToolInfo } from '../../../types.js';

export const json: ToolInfo = {
  id: 'json',
  name: 'JSON',
  icon: <VscJson />,
  Component: React.lazy(() => import('./component.js')),
};
