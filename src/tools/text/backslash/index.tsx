import { TbBackslash } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const backslash: ToolInfo = {
  id: 'backslash',
  name: 'Backslash escape/unescape',
  icon: <TbBackslash />,
  Component,
};
