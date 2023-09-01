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

  const url = (() => {
    if (value) {
      try {
        return new URL(value);
      } catch {
        //
      }
    }
    return undefined;
  })();

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input" />
        <Textarea variant="code" flex value={value} onChange={setValue} />
      </Col>
      <Col>
        <Form
          values={url}
          onChange={(key, value) => {
            if (url) {
              (url as any)[key] = value;
              setValue(url.toString());
            }
          }}
        >
          <Label title="Protocol:" />
          <FormInput name="protocol" />
          <Label title="Host:" />
          <FormInput name="host" />
          <Label title="Port:" />
          <FormInput name="port" />
          <Label title="Hostname:" />
          <FormInput name="hostname" />
          <Label title="Path:" />
          <FormInput name="pathname" />
          <Label title="Search:" />
          <FormInput name="search" />
          <Label title="Hash:" />
          <FormInput name="hash" />
          <Label title="Username:" />
          <FormInput name="username" />
          <Label title="Password:" />
          <FormInput name="password" />
        </Form>
        {url && (
          <Section title="Search params">
            <Form
              values={[...url.searchParams.entries()]}
              onChange={(key, value) => {
                const params = [...url.searchParams.entries()];
                url.search = new URLSearchParams(
                  set(params, key, value),
                ).toString();
                setValue(url.toString());
              }}
            >
              <Grid xs={3}>
                <Label title="Key:" />
                <Label title="Value:" />
                <Label title="Delete:" />
                {[...url.searchParams.keys()].map((_, i) => (
                  <React.Fragment key={i}>
                    <FormInput name={`${i}.0`} />
                    <FormInput name={`${i}.1`} />
                    <Button
                      icon={<IoClose />}
                      title="Delete"
                      onClick={() => {
                        const params = [...url.searchParams.entries()];
                        params.splice(i, 1);
                        url.search = new URLSearchParams(params).toString();
                        setValue(url.toString());
                      }}
                    />
                  </React.Fragment>
                ))}
                <Button
                  onClick={() => {
                    url.searchParams.append('', '');
                    setValue(url.toString());
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Form>
          </Section>
        )}
      </Col>
    </Grid>
  );
};

export default Component;
