import { VscRegex } from 'react-icons/vsc/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const regexp: ToolInfo = {
  id: 'regexp',
  name: 'RegExp',
  icon: <VscRegex />,
  Component,
};
