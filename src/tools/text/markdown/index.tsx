import React from 'react';
import { VscMarkdown } from 'react-icons/vsc/index.js';

import { ToolInfo } from '../../../types.js';

export const markdown: ToolInfo = {
  id: 'markdown',
  name: 'Markdown',
  icon: <VscMarkdown />,
  Component: React.lazy(() => import('./component.js')),
};
