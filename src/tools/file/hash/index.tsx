import { TbHexagon } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const hash: ToolInfo = {
  id: 'hash',
  name: 'Hash',
  icon: <TbHexagon />,
  Component,
};
