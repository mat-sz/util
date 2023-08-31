import React, { useState } from 'react';
import { version, v1, v3, v4, v5 } from 'uuid';
import { ulid } from 'ulid';
import { nanoid } from 'nanoid';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Row } from '../../../components/Row/index.js';
import { Select } from '../../../components/Select/index.js';
import { Button } from '../../../components/Button/index.js';
import { Input } from '../../../components/Input/index.js';
import { Section } from '../../../components/Section/index.js';

const ObjectId = (h = 16, s = (s: number) => Math.floor(s).toString(h)) =>
  s(Date.now() / 1000) +
  ' '.repeat(h).replace(/./g, () => s(Math.random() * h));

const generateFns: Record<string, () => string> = {
  'UUID v1': v1,
  'UUID v3': () => v3('test', v4()),
  'UUID v4': v4,
  'UUID v5': () => v5('test', v4()),
  ULID: ulid,
  NanoID: nanoid,
  ObjectID: ObjectId,
};

export const Component: React.FC = () => {
  const [value, setValue] = useState('');
  const [count, setCount] = useState(10);
  const [type, setType] = useState('UUID v4');
  const [generated, setGenerated] = useState('');

  const [info, setInfo] = useState({ type: 'Invalid' });

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Parse">
          <Input
            value={value}
            onChange={value => {
              setValue(value);

              try {
                setInfo({ type: `UUID v${version(value)}` });
              } catch {
                setInfo({ type: 'Invalid' });
              }
            }}
          />
          <Label title="Type:" />
          <Input value={info.type} readOnly />
        </Section>
      </Col>
      <Col>
        <Section title="Generate" />
        <Row>
          <Select flex value={type} onChange={setType}>
            {Object.keys(generateFns).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Select>
          <Input
            type="number"
            min={1}
            step={1}
            value={count}
            defaultValue="1"
            onChange={value => setCount(parseInt(value))}
          />
          <Button
            onClick={() => {
              const arr = Array.from({ length: count }, () =>
                generateFns[type](),
              );
              setGenerated(arr.join('\n'));
            }}
          >
            Generate
          </Button>
        </Row>
        <Textarea variant="code" flex value={generated} readOnly />
      </Col>
    </Grid>
  );
};

export default Component;
