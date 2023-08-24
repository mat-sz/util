import React from 'react';
import { IoLink } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const dataurl: ToolInfo = {
  id: 'dataurl',
  name: 'Data URL',
  icon: <IoLink />,
  Component: React.lazy(() => import('./component.js')),
};
