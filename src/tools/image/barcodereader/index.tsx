import { IoBarcode } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const barcodereader: ToolInfo = {
  id: 'barcodereader',
  name: 'Barcode reader',
  icon: <IoBarcode />,
  Component,
};
