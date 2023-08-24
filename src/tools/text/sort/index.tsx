import React from 'react';
import { TbSortAscendingLetters } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';

export const sort: ToolInfo = {
  id: 'sort',
  name: 'Sort/Deduplicate lines',
  icon: <TbSortAscendingLetters />,
  Component: React.lazy(() => import('./component.js')),
};
