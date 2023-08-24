import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeSvgWriter } from '@zxing/browser';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { ImageGeneratorPreview } from '../../../components/ImageGeneratorPreview/index.js';

export const Component: React.FC = () => {
  const [text, setText] = useState('https://util.to');
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const writer = new BrowserQRCodeSvgWriter();
    const svg = writer.write(text, 500, 500);
    if (divRef.current) {
      divRef.current.innerHTML = '';
      divRef.current.append(svg);
    }
  }, [text]);

  return (
    <Grid m={2}>
      <Col>
        <Label title="Input:" />
        <Textarea value={text} onChange={setText} />
      </Col>
      <Col>
        <Label title="Code:" />
        <ImageGeneratorPreview>
          <div ref={divRef}></div>
        </ImageGeneratorPreview>
      </Col>
    </Grid>
  );
};

export default Component;
