import React from 'react';
import { IoQrCode } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';

export const qrreader: ToolInfo = {
  id: 'qrreader',
  name: 'QR code reader',
  icon: <IoQrCode />,
  Component: React.lazy(() => import('./component.js')),
};
