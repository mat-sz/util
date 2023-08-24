import { Tb123 } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const base: ToolInfo = {
  id: 'base',
  name: 'Number base conversion',
  icon: <Tb123 />,
  Component,
};
