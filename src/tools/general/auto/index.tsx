import { IoRefresh } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const auto: ToolInfo = {
  id: 'auto',
  name: 'Auto-detect',
  icon: <IoRefresh />,
  Component,
};
