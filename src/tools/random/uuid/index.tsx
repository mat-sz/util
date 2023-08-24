import React from 'react';
import { IoFingerPrint } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const uuid: ToolInfo = {
  id: 'uuid',
  name: 'UUID',
  icon: <IoFingerPrint />,
  Component: React.lazy(() => import('./component.js')),
};
