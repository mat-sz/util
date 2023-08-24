import React from 'react';
import { IoColorFilter } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const colors: ToolInfo = {
  id: 'colors',
  name: 'Color picker',
  icon: <IoColorFilter />,
  Component: React.lazy(() => import('./component.js')),
};
