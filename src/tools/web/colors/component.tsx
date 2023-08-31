import React, { useState } from 'react';
import {
  Colorful,
  Wheel,
  EditableInputHSLA,
  EditableInputRGBA,
  HsvaColor,
} from '@uiw/react-color';
import Color from 'color';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Section } from '../../../components/Section/index.js';
import { Input } from '../../../components/Input/index.js';
import { Label } from '../../../components/Label/index.js';

function tryColor(value: string) {
  try {
    return Color(value);
  } catch {
    return Color('#000000');
  }
}

export const Component: React.FC = () => {
  const [value, setValue] = useState('#128ad0');

  const tempColor = tryColor(value);
  const hsv = tempColor.hsv();
  const hsva: HsvaColor = { ...hsv.object(), a: hsv.alpha() } as any;
  const color = tempColor.alpha(Math.round(tempColor.alpha() * 100) / 100);

  const lab = color.lab().array();
  const labStr = `${lab[0].toFixed(0)}% ${lab[1].toFixed(0)} ${lab[2].toFixed(
    0,
  )}`;

  const lch = color.lch().array();
  const lchStr = `${lch[0].toFixed(0)}% ${lch[1].toFixed(0)} ${lch[2].toFixed(
    0,
  )}`;

  const cmyk = color.cmyk().array();
  const cmykStr = `${cmyk[0].toFixed(0)}% ${cmyk[1].toFixed(
    0,
  )}% ${cmyk[2].toFixed(0)}% ${cmyk[3].toFixed(0)}%`;

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input">
          <Input value={value} onChange={setValue} />
          <Grid m={3}>
            <Col center>
              <Colorful color={hsva} onChange={color => setValue(color.hexa)} />
            </Col>
            <Col center>
              <Wheel
                style={{ overflow: 'hidden' }}
                color={hsva}
                onChange={color => setValue(color.hexa)}
              />
            </Col>
            <Col>
              <EditableInputHSLA
                hsva={hsva}
                onChange={color => setValue(color.hexa)}
              />
              <EditableInputRGBA
                hsva={hsva}
                onChange={color => setValue(color.hexa)}
              />
            </Col>
          </Grid>
        </Section>
      </Col>
      <Col>
        <Section title="Output">
          <Label title="Hex" />
          <Input value={color.hex()} readOnly />
          <Label title="Hex + alpha" />
          <Input value={color.hexa()} readOnly />
          <Label title="RGB" />
          <Input value={color.rgb().string(0)} readOnly />
          <Label title="HSL" />
          <Input value={color.hsl().string(0)} readOnly />
          <Label title="HSV/HSB" />
          <Input value={color.hsv().string(0)} readOnly />
          <Label title="HWB" />
          <Input value={color.hwb().string(0)} readOnly />
          <Label title="LAB" />
          <Input
            value={
              color.alpha() === 1
                ? `lab(${labStr})`
                : `lab(${labStr} / ${color.alpha()})`
            }
            readOnly
          />
          <Label title="LCH" />
          <Input
            value={
              color.alpha() === 1
                ? `lch(${lchStr})`
                : `lch(${lchStr} / ${color.alpha()})`
            }
            readOnly
          />
          <Label title="CMYK" />
          <Input
            value={
              color.alpha() === 1
                ? `device-cmyk(${cmykStr})`
                : `device-cmyk(${cmykStr} / ${color.alpha()})`
            }
            readOnly
          />
          <Label title="Color name" />
          <Input value={color.keyword()} readOnly />
        </Section>
      </Col>
    </Grid>
  );
};

export default Component;
