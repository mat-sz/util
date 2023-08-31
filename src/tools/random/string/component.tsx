import React, { useCallback, useEffect, useState } from 'react';

import { Grid } from '../../../components/Grid/index.js';
import { Label } from '../../../components/Label/index.js';
import { Section } from '../../../components/Section/index.js';
import { Col } from '../../../components/Col/index.js';
import { Form } from '../../../components/Form/index.js';
import { FormInput } from '../../../components/Form/FormInput.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Toggle } from '../../../components/Toggle/index.js';
import { Button } from '../../../components/Button/index.js';

const randomString = (length: number, alphabet: string): string => {
  let result = '';
  const alphabetLength = alphabet.length;
  let counter = 0;
  while (counter < length) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
    counter += 1;
  }
  return result;
};

const alphabets: Record<string, string> = {
  'A-Z': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'a-z': 'abcdefghijklmnopqrstuvwxyz',
  '0-9': '0123456789',
  '!@#$%^&*': '!@#$%^&*',
};

export const Component: React.FC = () => {
  const [settings, setSettings] = useState({
    count: 10,
    length: 32,
    alphabets: ['A-Z', 'a-z', '0-9'],
  });
  const [generated, setGenerated] = useState('');

  const refresh = useCallback(() => {
    const arr = Array.from({ length: settings.count }, () =>
      randomString(
        settings.length,
        settings.alphabets.map(key => alphabets[key]).join(''),
      ),
    );
    setGenerated(arr.join('\n'));
  }, [settings, setGenerated]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Settings">
          <Form
            values={settings}
            onChange={(key, value) => {
              setSettings(settings => ({
                ...settings,
                [key]: parseInt(value),
              }));
            }}
          >
            <Label title="Count:" />
            <FormInput name="count" type="number" min={1} max={100} step={1} />
            <Label title="Length:" />
            <FormInput name="length" type="number" min={1} max={100} step={1} />
            <Label title="Character sets:" />
            {Object.keys(alphabets).map(key => (
              <Toggle
                key={key}
                value={settings.alphabets.includes(key)}
                label={key}
                onChange={() =>
                  setSettings(settings => ({
                    ...settings,
                    alphabets: settings.alphabets.includes(key)
                      ? settings.alphabets.filter(k => k !== key)
                      : [...settings.alphabets, key],
                  }))
                }
              />
            ))}
            <Label title="" />
            <Button onClick={refresh}>Regenerate</Button>
          </Form>
        </Section>
      </Col>
      <Col>
        <Section title="Output">
          <Textarea variant="code" flex value={generated} readOnly />
        </Section>
      </Col>
    </Grid>
  );
};

export default Component;
