import { IoQrCode } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const qrgenerator: ToolInfo = {
  id: 'qrgenerator',
  name: 'QR code generator',
  icon: <IoQrCode />,
  Component,
};
