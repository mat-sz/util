import React, { useEffect, useRef, useState } from 'react';
import bwipjs from 'bwip-js';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Select } from '../../../components/Select/index.js';
import { ImageGeneratorPreview } from '../../../components/ImageGeneratorPreview/index.js';
import { symdesc } from '../../../helpers/bwip.js';
import { Section } from '../../../components/Section/index.js';

export const Component: React.FC = () => {
  const [text, setText] = useState(symdesc['code128'].text);
  const [bcid, setBcid] = useState('code128');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    try {
      (bwipjs as any).toCanvas(canvasRef.current!, {
        bcid, // Barcode type
        text: text, // Text to encode
        scale: 3, // 3x scaling factor
        includetext: true, // Show human-readable text
        textxalign: 'center', // Always good to set this
      });
    } catch {
      //
    }
  }, [text, bcid]);

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input" />
        <Select
          value={bcid}
          onChange={value => {
            setBcid(value);
            setText(symdesc[value].text || '');
          }}
        >
          {Object.values(symdesc).map(({ sym, desc }) => (
            <option key={sym} value={sym}>
              {desc}
            </option>
          ))}
        </Select>
        <Textarea value={text} onChange={setText} />
      </Col>
      <Col>
        <Section title="Code" />
        <ImageGeneratorPreview>
          <canvas ref={canvasRef} />
        </ImageGeneratorPreview>
      </Col>
    </Grid>
  );
};

export default Component;
