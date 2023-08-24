import { GroupInfo } from '../../types.js';
import { subnet } from './subnet/index.js';

export const sysadmin: GroupInfo = {
  id: 'sysadmin',
  name: 'Sysadmin',
  tools: [subnet],
};
