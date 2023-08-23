import { GroupInfo } from '../../types.js';
import { uuid } from './uuid/index.js';

export const random: GroupInfo = {
  id: 'random',
  name: 'Random',
  tools: [uuid],
};
