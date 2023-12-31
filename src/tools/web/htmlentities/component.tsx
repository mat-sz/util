import React, { useState } from 'react';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Section } from '../../../components/Section/index.js';

const encode = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.innerText = text;
  return textarea.innerHTML;
};

const decode = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

export const Component: React.FC = () => {
  const [encoded, setEncoded] = useState('');
  const [plaintext, setPlaintext] = useState('');

  const onChangeEncoded = (data: string) => {
    setEncoded(data);
    try {
      setPlaintext(decode(data));
    } catch {
      // Invalid
    }
  };
  const onChangePlaintext = (data: string) => {
    setPlaintext(data);
    setEncoded(encode(data));
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
