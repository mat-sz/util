import { IoList } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const exif: ToolInfo = {
  id: 'exif',
  name: 'EXIF',
  icon: <IoList />,
  Component,
};
