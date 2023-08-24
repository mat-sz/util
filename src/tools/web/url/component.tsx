import React, { useState } from 'react';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Form } from '../../../components/Form/index.js';
import { FormInput } from '../../../components/Form/FormInput.js';

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
    <Grid m={2}>
      <Col>
        <Label title="Input:" />
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
      </Col>
    </Grid>
  );
};
