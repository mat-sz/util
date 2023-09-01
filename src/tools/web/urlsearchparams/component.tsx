import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5/index.js';
import { set } from 'radash';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Form } from '../../../components/Form/index.js';
import { FormInput } from '../../../components/Form/FormInput.js';
import { Section } from '../../../components/Section/index.js';
import { Button } from '../../../components/Button/index.js';

export const Component: React.FC = () => {
  const [value, setValue] = useState('');

  const searchParams = (() => {
    if (value) {
      try {
        return new URLSearchParams(value);
      } catch {
        //
      }
    }
    return new URLSearchParams();
  })();

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input" />
        <Textarea variant="code" flex value={value} onChange={setValue} />
      </Col>
      <Col>
        <Section title="Search params">
          <Form
            values={[...searchParams.entries()]}
            onChange={(key, value) => {
              const params = [...searchParams.entries()];
              setValue(new URLSearchParams(set(params, key, value)).toString());
            }}
          >
            <Grid xs={3}>
              <Label title="Key:" />
              <Label title="Value:" />
              <Label title="Delete:" />
              {[...searchParams.keys()].map((_, i) => (
                <React.Fragment key={i}>
                  <FormInput name={`${i}.0`} />
                  <FormInput name={`${i}.1`} />
                  <Button
                    icon={<IoClose />}
                    title="Delete"
                    onClick={() => {
                      const params = [...searchParams.entries()];
                      params.splice(i, 1);
                      setValue(new URLSearchParams(params).toString());
                    }}
                  />
                </React.Fragment>
              ))}
              <Button
                onClick={() => {
                  searchParams.append('', '');
                  setValue(searchParams.toString());
                }}
              >
                Add
              </Button>
            </Grid>
          </Form>
        </Section>
      </Col>
    </Grid>
  );
};

export default Component;
