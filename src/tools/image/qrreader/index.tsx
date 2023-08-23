import { IoQrCode } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const qrreader: ToolInfo = {
  id: 'qrreader',
  name: 'QR code reader',
  icon: <IoQrCode />,
  Component,
};
