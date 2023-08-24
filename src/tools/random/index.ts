import { GroupInfo } from '../../types.js';
import { string } from './string/index.js';
import { uuid } from './uuid/index.js';

export const random: GroupInfo = {
  id: 'random',
  name: 'Random',
  tools: [uuid, string],
};
