import React, { useState } from 'react';
import { addSlashes, removeSlashes } from 'slashes';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Section } from '../../../components/Section/index.js';

export const Component: React.FC = () => {
  const [encoded, setEncoded] = useState('');
  const [plaintext, setPlaintext] = useState('');

  const onChangeEncoded = (data: string) => {
    setEncoded(data);
    try {
      setPlaintext(removeSlashes(data));
    } catch {
      // Invalid
    }
  };
  const onChangePlaintext = (data: string) => {
    setPlaintext(data);
    setEncoded(addSlashes(data));
  };

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input" />
        <Textarea
          variant="code"
          flex
          value={plaintext}
          onChange={onChangePlaintext}
        />
      </Col>
      <Col>
        <Section title="Output" />
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
