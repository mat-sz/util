import React, { useState } from 'react';

import { Grid } from '../../../components/Grid/index.js';
import { Label } from '../../../components/Label/index.js';
import { Input } from '../../../components/Input/index.js';
import { Section } from '../../../components/Section/index.js';
import { Col } from '../../../components/Col/index.js';

export const Component: React.FC = () => {
  const [value, setValue] = useState(0);
  const [base, setBase] = useState(36);
  return (
    <Grid m={2} flex>
      <Col>
        <Label title="Binary (2):" />
        <Input
          value={value.toString(2)}
          onChange={value => setValue(parseInt(value, 2))}
        />
        <Label title="Octal (8):" />
        <Input
          value={value.toString(8)}
          onChange={value => setValue(parseInt(value, 8))}
        />
      </Col>
      <Col>
        <Label title="Decimal (10):" />
        <Input
          value={value.toString(10)}
          onChange={value => setValue(parseInt(value, 10))}
        />
        <Label title="Hex (16):" />
        <Input
          value={value.toString(16)}
          onChange={value => setValue(parseInt(value, 16))}
        />
      </Col>
      <Col>
        <Section title="Custom">
          <Label title="Base:" />
          <Input
            type="number"
            value={base}
            onChange={value => setBase(parseInt(value))}
            min={1}
            max={36}
            step={1}
            defaultValue="36"
          />
          <Label title="Value:" />
          <Input
            value={value.toString(base)}
            onChange={value => setValue(parseInt(value, base))}
          />
        </Section>
      </Col>
    </Grid>
  );
};

export default Component;
