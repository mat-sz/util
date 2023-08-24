import React, { useState } from 'react';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Textarea } from '../../../components/Textarea/index.js';

function formatJson(str: string): string {
  try {
    const parsed = JSON.parse(str);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return 'Invalid JSON';
  }
}

export const Component: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <Grid m={2}>
      <Col>
        <Label title="Input:" />
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
          value={formatJson(value)}
          readOnly
          language="json"
        />
      </Col>
    </Grid>
  );
};
