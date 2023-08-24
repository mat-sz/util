import { GroupInfo } from '../../types.js';
import { dataurl } from './dataurl/index.js';
import { exif } from './exif/index.js';
import { barcodereader } from './barcodereader/index.js';
import { qrreader } from './qrreader/index.js';
import { qrgenerator } from './qrgenerator/index.js';
import { barcodegenerator } from './barcodegenerator/index.js';
import { convert } from './convert/index.js';

export const image: GroupInfo = {
  id: 'image',
  name: 'Image',
  tools: [
    convert,
    exif,
    dataurl,
    barcodereader,
    barcodegenerator,
    qrreader,
    qrgenerator,
  ],
};
