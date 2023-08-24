import React, { useState } from 'react';
import { fromByteArray, toByteArray } from 'base64-js';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Textarea } from '../../../components/Textarea/index.js';

const decoder = new TextDecoder();
const encoder = new TextEncoder();

export const Component: React.FC = () => {
  const [encoded, setEncoded] = useState('');
  const [plaintext, setPlaintext] = useState('');

  const onChangeEncoded = (data: string) => {
    setEncoded(data);
    try {
      const decoded = toByteArray(data);
      setPlaintext(decoder.decode(decoded));
    } catch {
      // Invalid
    }
  };
  const onChangePlaintext = (data: string) => {
    setPlaintext(data);
    setEncoded(fromByteArray(encoder.encode(data)));
  };

  return (
    <Grid m={2}>
      <Col>
        <Label title="Input:" />
        <Textarea
          variant="code"
          flex
          value={plaintext}
          onChange={onChangePlaintext}
        />
      </Col>
      <Col>
        <Label title="Output:" />
        <Textarea
          variant="code"
          flex
          value={encoded}
          onChange={onChangeEncoded}
        />
      </Col>
    </Grid>
  );
};

export default Component;
