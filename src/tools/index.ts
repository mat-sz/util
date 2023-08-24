import { ToolInfo } from '../types.js';

import { text } from './text/index.js';
import { general } from './general/index.js';
import { image } from './image/index.js';
import { random } from './random/index.js';
import { file } from './file/index.js';
import { sysadmin } from './sysadmin/index.js';
import { web } from './web/index.js';

export const toolGroups: { id: string; name: string; tools: ToolInfo[] }[] = [
  general,
  text,
  web,
  image,
  file,
  sysadmin,
  random,
];
