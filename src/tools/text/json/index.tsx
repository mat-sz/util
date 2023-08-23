import { VscJson } from 'react-icons/vsc/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const json: ToolInfo = {
  id: 'json',
  name: 'JSON',
  icon: <VscJson />,
  Component,
};
