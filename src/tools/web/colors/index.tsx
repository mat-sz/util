import { IoColorFilter } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const colors: ToolInfo = {
  id: 'colors',
  name: 'Color picker',
  icon: <IoColorFilter />,
  Component,
};
