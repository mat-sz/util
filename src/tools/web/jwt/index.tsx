import { VscJson } from 'react-icons/vsc/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const jwt: ToolInfo = {
  id: 'jwt',
  name: 'JWT',
  icon: <VscJson />,
  Component,
};
