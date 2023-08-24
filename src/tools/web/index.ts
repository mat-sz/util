import { GroupInfo } from '../../types.js';
import { colors } from './colors/index.js';
import { htmlentities } from './htmlentities/index.js';
import { jwt } from './jwt/index.js';
import { url } from './url/index.js';
import { urlencode } from './urlencode/index.js';

export const web: GroupInfo = {
  id: 'web',
  name: 'Web',
  tools: [jwt, url, urlencode, htmlentities, colors],
};
