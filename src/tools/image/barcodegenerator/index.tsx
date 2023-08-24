import { IoBarcode } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const barcodegenerator: ToolInfo = {
  id: 'barcodegenerator',
  name: 'Barcode generator',
  icon: <IoBarcode />,
  Component,
};
