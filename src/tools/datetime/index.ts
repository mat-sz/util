import { GroupInfo } from '../../types.js';
import { timestamp } from './timestamp/index.js';

export const datetime: GroupInfo = {
  id: 'datetime',
  name: 'Date/Time',
  tools: [timestamp],
};
