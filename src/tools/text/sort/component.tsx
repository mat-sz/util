import React, { useState } from 'react';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Select } from '../../../components/Select/index.js';

const sortFn: Record<string, (a: string, b: string) => number> = {
  az: (a, b) => a.localeCompare(b),
  za: (a, b) => b.localeCompare(a),
  iaz: (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
  iza: (a, b) => b.toLowerCase().localeCompare(a.toLowerCase()),
  '19': (a, b) => parseFloat(a) - parseFloat(b),
  '91': (a, b) => parseFloat(b) - parseFloat(a),
};

export const Component: React.FC = () => {
  const [text, setText] = useState('');
  const [order, setOrder] = useState('az');

  return (
    <Grid cols={2}>
      <Col>
        <Label title="Input:" />
        <Textarea variant="code" flex value={text} onChange={setText} />
      </Col>
      <Col>
        <Label title="Output:" />
        <Select value={order} onChange={setOrder}>
          <option value="az">A → Z (text; ascending; case-sensitive)</option>
          <option value="za">Z → A (text; descending; case-sensitive)</option>
          <option value="iaz">A → Z (text; ascending; case-insensitive)</option>
          <option value="iza">
            Z → A (text; descending; case-insensitive)
          </option>
          <option value="19">1 → 9 (numbers; ascending)</option>
          <option value="91">9 → 1 (numbers; descending)</option>
        </Select>
        <Textarea
          variant="code"
          flex
          value={text.split('\n').sort(sortFn[order]).join('\n')}
          readOnly
        />
      </Col>
    </Grid>
  );
};
