import React, { useState } from 'react';
import { decodeJwt, decodeProtectedHeader } from 'jose';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Textarea } from '../../../components/Textarea/index.js';

function tryDecodeJwt(value: string) {
  try {
    return {
      header: decodeProtectedHeader(value),
      payload: decodeJwt(value),
    };
  } catch {
    try {
      return {
        header: decodeProtectedHeader(value),
      };
    } catch {
      return undefined;
    }
  }
}

export const Component: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <Grid m={2}>
      <Col>
        <Label title="JWT:" />
        <Textarea
          variant="code"
          flex
          value={value}
          onChange={setValue}
          language="json"
        />
      </Col>
      <Col>
        <Label title="Output:" />
        <Textarea
          variant="code"
          flex
          value={JSON.stringify(tryDecodeJwt(value), null, 2)}
          readOnly
          language="json"
        />
      </Col>
    </Grid>
  );
};
