import React, { useEffect, useState } from 'react';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import { IoDownload } from 'react-icons/io5/index.js';
import { download } from 'fitool';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Section } from '../../../components/Section/index.js';
import { Select } from '../../../components/Select/index.js';
import { Row } from '../../../components/Row/index.js';
import { Button } from '../../../components/Button/index.js';

const encodings = {
  utf8: 'UTF-8',
  utf16: 'UTF-16',
  utf16le: 'UTF-16LE / UCS-2',
  utf16be: 'UTF-16BE',
  utf7: 'UTF-7',
  'utf7-imap': 'UTF-7 IMAP',
  utf32: 'UTF-32',
  utf32le: 'UTF-32LE / UCS-4LE',
  utf32be: 'UTF-32BE / UCS-4BE',
  ascii: 'ASCII',
  shiftjis: 'Shift JIS',
  cp437: 'CP 437 (Latin US)',
  cp737: 'CP 737 (Greek)',
  cp775: 'CP 775 (Baltic Rim)',
  cp850: 'CP 850 (Latin 1)',
  cp852: 'CP 852 (Latin 2)',
  cp855: 'CP 855 (Cyrillic)',
  cp856: 'CP 856 (Hebrew)',
  cp857: 'CP 857 (Turkish)',
  cp858: 'CP 858',
  cp860: 'CP 860 (Portuguese)',
  cp861: 'CP 861 (Icelandic)',
  cp862: 'CP 862 (Hebrew)',
  cp863: 'CP 863 (French Canada)',
  cp864: 'CP 864 (Arabic)',
  cp865: 'CP 865 (Nordic)',
  cp866: 'CP 866 (Cyrillic Russian)',
  cp869: 'CP 869 (Greek 2)',
  cp922: 'CP 922 (Estonia)',
  cp936: 'CP 936 (Simplified Chinese)',
  cp949: 'CP 949 (Korean)',
  cp950: 'CP 950 (Traditional Chinese)',
  cp1046: 'CP 1046 (Arabic Extended-Euro)',
  cp1124: 'CP 1124 (Ukrainian)',
  cp1125: 'CP 1125',
  cp1129: 'CP 1129',
  cp1133: 'CP 1133 (Lao)',
  cp1161: 'CP 1161',
  cp1162: 'CP 1162',
  cp1163: 'CP 1163',
  windows1250: 'Windows-1250 (Eastern European)',
  windows1251: 'Windows-1251 (Cyrillic)',
  windows1252: 'Windows-1252 (Latin)',
  windows1253: 'Windows-1253 (Greek)',
  windows1254: 'Windows-1254 (Turkish)',
  windows1255: 'Windows-1255 (Hebrew)',
  windows1256: 'Windows-1256 (Arabic)',
  windows1257: 'Windows-1257 (Baltic)',
  windows1258: 'Windows-1258 (Vietnamese)',
  iso88591: 'ISO-8859-1 (Western Europe)',
  iso88592: 'ISO-8859-2 (Central Europe)',
  iso88593: 'ISO-8859-3 (Maltese/Esperanto)',
  iso88594: 'ISO-8859-4 (North Europe)',
  iso88595: 'ISO-8859-5 (Cyrillic)',
  iso88596: 'ISO-8859-6 (Arabic)',
  iso88597: 'ISO-8859-7 (Greek)',
  iso88598: 'ISO-8859-8 (Hebrew)',
  iso88599: 'ISO-8859-9 (Turkish)',
  iso885910: 'ISO-8859-10 (Nordic)',
  iso885911: 'ISO-8859-11 (Thai)',
  iso885913: 'ISO-8859-13 (Baltic)',
  iso885914: 'ISO-8859-14 (Celtic)',
  iso885915: 'ISO-8859-15 (New Western Europe)',
  iso885916: 'ISO-8859-16 (Romanian)',
  macroman: 'Mac OS Roman',
  macgreek: 'Mac OS Greek',
  maccyrillic: 'Mac OS Cyrillic',
  maciceland: 'Mac OS Iceland',
  macturkish: 'Mac OS Turkish',
  maccenteuro: 'Mac OS Central European',
};

export const Component: React.FC = () => {
  const [outputEncoding, setOutputEncoding] = useState('utf16');
  const [input, setInput] = useState('test');
  const [output, setOutput] = useState<Buffer>();

  useEffect(() => {
    setOutput(iconv.encode(input, outputEncoding));
  }, [input, setOutput, outputEncoding]);

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input (UTF-8)" />
        <Textarea variant="code" flex value={input} onChange={setInput} />
      </Col>
      <Col>
        <Section title="Output" />
        <Row>
          <Select flex value={outputEncoding} onChange={setOutputEncoding}>
            {Object.entries(encodings).map(([key, name]) => (
              <option value={key} key={key}>
                {name}
              </option>
            ))}
          </Select>
          <Button
            icon={<IoDownload />}
            onClick={() => {
              if (output) {
                download(new Uint8Array(output).buffer, 'output.txt');
              }
            }}
          >
            Download
          </Button>
        </Row>
        <Textarea
          variant="code"
          flex
          value={output?.toString('utf8')}
          readOnly
        />
      </Col>
    </Grid>
  );
};

export default Component;
