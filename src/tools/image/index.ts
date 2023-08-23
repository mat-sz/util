import { GroupInfo } from '../../types.js';
import { dataurl } from './dataurl/index.js';
import { exif } from './exif/index.js';
import { barcodereader } from './barcodereader/index.js';
import { qrreader } from './qrreader/index.js';

export const image: GroupInfo = {
  id: 'image',
  name: 'Image',
  tools: [exif, dataurl, barcodereader, qrreader],
};
