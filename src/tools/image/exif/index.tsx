import { TbBracketsContain } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const exif: ToolInfo = {
  id: 'exif',
  name: 'EXIF',
  icon: <TbBracketsContain />,
  Component,
};
