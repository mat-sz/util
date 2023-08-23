import { GroupInfo } from '../../types.js';
import { base64 } from './base64/index.js';
import { hash } from './hash/index.js';
import { json } from './json/index.js';
import { jwt } from './jwt/index.js';
import { regexp } from './regexp/index.js';
import { sort } from './sort/index.js';
import { urlencode } from './urlencode/index.js';

export const text: GroupInfo = {
  id: 'text',
  name: 'Text',
  tools: [json, jwt, regexp, base64, urlencode, hash, sort],
};
