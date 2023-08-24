import React from 'react';
import { IoBarcode } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const barcodegenerator: ToolInfo = {
  id: 'barcodegenerator',
  name: 'Barcode generator',
  icon: <IoBarcode />,
  Component: React.lazy(() => import('./component.js')),
};
