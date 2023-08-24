import React from 'react';
import { IoList } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const exif: ToolInfo = {
  id: 'exif',
  name: 'EXIF',
  icon: <IoList />,
  Component: React.lazy(() => import('./component.js')),
};
