import { GroupInfo } from '../../types.js';
import { backslash } from './backslash/index.js';
import { base64 } from './base64/index.js';
import { charset } from './charset/index.js';
import { hash } from './hash/index.js';
import { json } from './json/index.js';
import { markdown } from './markdown/index.js';
import { regexp } from './regexp/index.js';
import { sort } from './sort/index.js';

export const text: GroupInfo = {
  id: 'text',
  name: 'Text',
  tools: [json, regexp, base64, backslash, hash, sort, markdown, charset],
};
