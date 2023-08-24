import { TbAmpersand } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const htmlentities: ToolInfo = {
  id: 'htmlentities',
  name: 'HTML entities encode/decode',
  icon: <TbAmpersand />,
  Component,
};
