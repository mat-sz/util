import React from 'react';
import { IoLink } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const urlsearchparams: ToolInfo = {
  id: 'urlsearchparams',
  name: 'URLSearchParams',
  icon: <IoLink />,
  Component: React.lazy(() => import('./component.js')),
};
