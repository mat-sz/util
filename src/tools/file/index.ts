import { GroupInfo } from '../../types.js';
import { charset } from './charset/index.js';
import { dataurl } from './dataurl/index.js';
import { hash } from './hash/index.js';

export const file: GroupInfo = {
  id: 'file',
  name: 'File',
  tools: [dataurl, hash, charset],
};
