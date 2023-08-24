import { TbSortAscendingLetters } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const sort: ToolInfo = {
  id: 'sort',
  name: 'Sort/Deduplicate lines',
  icon: <TbSortAscendingLetters />,
  Component,
};
