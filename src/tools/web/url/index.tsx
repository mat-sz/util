import React from 'react';
import { IoLink } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const url: ToolInfo = {
  id: 'url',
  name: 'URL',
  icon: <IoLink />,
  Component: React.lazy(() => import('./component.js')),
};
