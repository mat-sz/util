import React from 'react';
import { IoBarcode } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const barcodereader: ToolInfo = {
  id: 'barcodereader',
  name: 'Barcode reader',
  icon: <IoBarcode />,
  Component: React.lazy(() => import('./component.js')),
};
