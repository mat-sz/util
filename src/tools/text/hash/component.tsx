import React, { useState } from 'react';
import {
  MD5,
  SHA1,
  SHA224,
  SHA256,
  SHA384,
  SHA512,
  SHA3,
  RIPEMD160,
} from 'crypto-js';
import { str } from 'crc-32';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Input } from '../../../components/Input/index.js';

const functions = [
  {
    name: 'MD5',
    fn: MD5,
  },
  {
    name: 'SHA1',
    fn: SHA1,
  },
  {
    name: 'SHA224',
    fn: SHA224,
  },
  {
    name: 'SHA256',
    fn: SHA256,
  },
  {
    name: 'SHA384',
    fn: SHA384,
  },
  {
    name: 'SHA512',
    fn: SHA512,
  },
  {
    name: 'SHA3',
    fn: SHA3,
  },
  {
    name: 'RIPEMD160',
    fn: RIPEMD160,
  },
];

export const Component: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');

  return (
    <Grid m={2}>
      <Col>
        <Label title="Input:" />
        <Textarea
          variant="code"
          flex
          value={plaintext}
          onChange={setPlaintext}
        />
      </Col>
      <Col>
        <Label title="CRC32:" />
        <Input
          readOnly
          value={(str(plaintext) >>> 0).toString(16).padStart(8, '0')}
        />
        {functions.map(hashfn => (
          <React.Fragment key={hashfn.name}>
            <Label title={`${hashfn.name}:`} />
            <Input readOnly value={hashfn.fn(plaintext).toString()} />
          </React.Fragment>
        ))}
      </Col>
    </Grid>
  );
};
