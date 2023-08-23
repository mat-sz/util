import { ToolInfo } from '../types.js';

import { text } from './text/index.js';
import { general } from './general/index.js';
import { datetime } from './datetime/index.js';
import { image } from './image/index.js';
import { random } from './random/index.js';

export const toolGroups: { id: string; name: string; tools: ToolInfo[] }[] = [
  general,
  datetime,
  text,
  image,
  random,
];

export const allTools: ToolInfo[] = toolGroups.flatMap(group => group.tools);
