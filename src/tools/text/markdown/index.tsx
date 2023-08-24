import { VscMarkdown } from 'react-icons/vsc/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const markdown: ToolInfo = {
  id: 'markdown',
  name: 'Markdown',
  icon: <VscMarkdown />,
  Component,
};
