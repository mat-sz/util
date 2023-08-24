import React, { useMemo, useState } from 'react';
import {
  Colorful,
  Wheel,
  EditableInputHSLA,
  EditableInputRGBA,
  color,
} from '@uiw/react-color';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Section } from '../../../components/Section/index.js';
import { Input } from '../../../components/Input/index.js';
import { Label } from '../../../components/Label/index.js';

export const Component: React.FC = () => {
  const [value, setValue] = useState('#128ad0');

  const result = useMemo(() => color(value), [value]);

  return (
    <Grid m={2}>
      <Col>
        <Section title="Input">
          <Input value={value} onChange={setValue} />
          <Grid m={3}>
            <Col center>
              <Colorful
                color={result.hexa}
                onChange={color => setValue(color.hexa)}
              />
            </Col>
            <Col center>
              <Wheel
                style={{ overflow: 'hidden' }}
                color={result.hexa}
                onChange={color => setValue(color.hexa)}
              />
            </Col>
            <Col>
              <EditableInputHSLA
                hsva={result.hsva}
                onChange={color => setValue(color.hexa)}
              />
              <EditableInputRGBA
                hsva={result.hsva}
                onChange={color => setValue(color.hexa)}
              />
            </Col>
          </Grid>
        </Section>
      </Col>
      <Col>
        <Section title="Output">
          <Label title="Hex" />
          <Input value={result.hex} readOnly />
          <Label title="Hex + alpha" />
          <Input value={result.hexa} readOnly />
          <Label title="RGB" />
          <Input
            value={
              result.rgb
                ? `rgb(${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b})`
                : undefined
            }
            readOnly
          />
          <Label title="RGBA" />
          <Input
            value={
              result.rgba
                ? `rgba(${result.rgba.r}, ${result.rgba.g}, ${
                    result.rgba.b
                  }, ${result.rgba.a.toFixed(2)})`
                : undefined
            }
            readOnly
          />
          <Label title="HSL" />
          <Input
            value={
              result.hsl
                ? `hsl(${Math.round(result.hsl.h)}, ${Math.round(
                    result.hsl.s,
                  )}%, ${Math.round(result.hsl.l)}%)`
                : undefined
            }
            readOnly
          />
          <Label title="HSLA" />
          <Input
            value={
              result.hsla
                ? `hsla(${Math.round(result.hsla.h)}, ${Math.round(
                    result.hsla.s,
                  )}%, ${Math.round(result.hsla.l)}%, ${Math.round(
                    result.hsla.a * 100,
                  )}%)`
                : undefined
            }
            readOnly
          />
          <Label title="HSV/HSB" />
          <Input
            value={
              result.hsv
                ? `hsv(${Math.round(result.hsv.h)}, ${Math.round(
                    result.hsv.s,
                  )}%, ${Math.round(result.hsv.v)}%)`
                : undefined
            }
            readOnly
          />
          <Label title="HSVA/HSBA" />
          <Input
            value={
              result.hsva
                ? `hsva(${Math.round(result.hsva.h)}, ${Math.round(
                    result.hsva.s,
                  )}%, ${Math.round(result.hsva.v)}%, ${Math.round(
                    result.hsva.a * 100,
                  )}%)`
                : undefined
            }
            readOnly
          />
        </Section>
      </Col>
    </Grid>
  );
};

export default Component;
