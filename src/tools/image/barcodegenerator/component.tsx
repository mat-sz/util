import React, { useEffect, useRef, useState } from 'react';
import bwipjs from 'bwip-js';
import { TbJpg, TbPng } from 'react-icons/tb/index.js';
import { IoCopy, IoLink } from 'react-icons/io5/index.js';
import { download } from 'fitool';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Select } from '../../../components/Select/index.js';
import { ImageGeneratorPreview } from '../../../components/ImageGeneratorPreview/index.js';
import { symdesc } from '../../../helpers/bwip.js';
import { Section } from '../../../components/Section/index.js';
import { ControlsWrapper } from '../../../components/ControlsWrapper/index.js';
import { Button } from '../../../components/Button/index.js';
import { fromCanvas } from 'imtool';
import { copy } from '../../../helpers/copy.js';

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
        <ControlsWrapper
          controls={
            <>
              <Button
                icon={<TbJpg />}
                title="Download as JPEG"
                onClick={async () =>
                  (await fromCanvas(canvasRef.current!))
                    .background('white')
                    .toDownload('barcode.jpg')
                }
              />
              <Button
                icon={<TbPng />}
                title="Download as PNG"
                onClick={() =>
                  download(
                    canvasRef.current!.toDataURL('image/png'),
                    'barcode.png',
                  )
                }
              />
              <Button
                icon={<IoCopy />}
                title="Copy to clipboard"
                onClick={() =>
                  canvasRef.current!.toBlob(blob => {
                    if (blob) {
                      navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob }),
                      ]);
                    }
                  }, 'image/png')
                }
              />
              <Button
                icon={<IoLink />}
                title="Copy as data URL"
                onClick={() => copy(canvasRef.current!.toDataURL('image/png'))}
              />
            </>
          }
        >
          <ImageGeneratorPreview>
            <canvas ref={canvasRef} />
          </ImageGeneratorPreview>
        </ControlsWrapper>
      </Col>
    </Grid>
  );
};

export default Component;
