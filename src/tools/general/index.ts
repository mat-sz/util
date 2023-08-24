import { GroupInfo } from '../../types.js';
import { auto } from './auto/index.js';
import { base } from './base/index.js';
import { timestamp } from './timestamp/index.js';

export const general: GroupInfo = {
  id: 'general',
  name: 'General',
  tools: [auto, base, timestamp],
};
