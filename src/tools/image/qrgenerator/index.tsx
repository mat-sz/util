import React from 'react';
import { IoQrCode } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const qrgenerator: ToolInfo = {
  id: 'qrgenerator',
  name: 'QR code generator',
  icon: <IoQrCode />,
  Component: React.lazy(() => import('./component.js')),
};
