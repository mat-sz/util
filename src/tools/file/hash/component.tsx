import React, { useState } from 'react';
import { buf } from 'crc-32';
import { toArrayBuffer } from 'fitool';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Input } from '../../../components/Input/index.js';
import { FileSelect } from '../../../components/FileSelect/index.js';
import { Info } from '../../../components/Info/index.js';

async function digestMessage(
  algorithm: AlgorithmIdentifier,
  data: ArrayBuffer,
) {
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

interface Hashes {
  CRC32: string;
  SHA1: string;
  SHA256: string;
  SHA384: string;
  SHA512: string;
}

export const Component: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [hashes, setHashes] = useState<Hashes>();

  return (
    <Grid m={2}>
      <Col>
        <Label title="Input:" />
        <FileSelect
          file={file}
          onChange={async file => {
            setFile(file);
            setHashes(undefined);

            if (file) {
              const arrayBuffer = await toArrayBuffer(file);
              setHashes({
                CRC32: (buf(new Uint8Array(arrayBuffer)) >>> 0)
                  .toString(16)
                  .padStart(8, '0'),
                SHA1: await digestMessage('SHA-1', arrayBuffer),
                SHA256: await digestMessage('SHA-256', arrayBuffer),
                SHA384: await digestMessage('SHA-384', arrayBuffer),
                SHA512: await digestMessage('SHA-512', arrayBuffer),
              });
            }
          }}
        />
      </Col>
      <Col>
        {hashes ? (
          Object.entries(hashes).map(([key, hash]) => (
            <React.Fragment key={key}>
              <Label title={`${key}:`} />
              <Input readOnly value={hash} />
            </React.Fragment>
          ))
        ) : (
          <Info>{!file ? 'Please select a file.' : 'Recalculating...'}</Info>
        )}
      </Col>
    </Grid>
  );
};

export default Component;
