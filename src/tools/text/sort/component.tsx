import React, { useState } from 'react';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Select } from '../../../components/Select/index.js';
import { Toggle } from '../../../components/Toggle/index.js';
import { Row } from '../../../components/Row/index.js';
import { Section } from '../../../components/Section/index.js';

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
  const [deduplicate, setDeduplicate] = useState(false);
  const [order, setOrder] = useState('az');

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input" />
        <Textarea variant="code" flex value={text} onChange={setText} />
      </Col>
      <Col>
        <Section title="Output" />
        <Row>
          <Select value={order} onChange={setOrder}>
            <option value="az">A → Z (text; ascending; case-sensitive)</option>
            <option value="za">Z → A (text; descending; case-sensitive)</option>
            <option value="iaz">
              A → Z (text; ascending; case-insensitive)
            </option>
            <option value="iza">
              Z → A (text; descending; case-insensitive)
            </option>
            <option value="19">1 → 9 (numbers; ascending)</option>
            <option value="91">9 → 1 (numbers; descending)</option>
          </Select>
          <Toggle
            label="Deduplicate"
            value={deduplicate}
            onChange={setDeduplicate}
          />
        </Row>
        <Textarea
          variant="code"
          flex
          value={(deduplicate
            ? [...new Set(text.split('\n'))]
            : text.split('\n')
          )
            .sort(sortFn[order])
            .join('\n')}
          readOnly
        />
      </Col>
    </Grid>
  );
};

export default Component;
