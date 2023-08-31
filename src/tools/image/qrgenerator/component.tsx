import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeSvgWriter } from '@zxing/browser';
import { IoCopy, IoLink } from 'react-icons/io5/index.js';
import { TbJpg, TbPng, TbSvg } from 'react-icons/tb/index.js';
import { fromImage } from 'imtool';
import { download } from 'fitool';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { ImageGeneratorPreview } from '../../../components/ImageGeneratorPreview/index.js';
import { Section } from '../../../components/Section/index.js';
import { Button } from '../../../components/Button/index.js';
import { ControlsWrapper } from '../../../components/ControlsWrapper/index.js';
import { copy } from '../../../helpers/copy.js';

export const Component: React.FC = () => {
  const [text, setText] = useState('https://util.to');
  const divRef = useRef<HTMLDivElement>(null);

  const getDataUrl = () => {
    const svgURL = new XMLSerializer().serializeToString(
      divRef.current!.querySelector('svg')!,
    );
    return 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgURL);
  };

  useEffect(() => {
    const writer = new BrowserQRCodeSvgWriter();
    const svg = writer.write(text, 500, 500);
    if (divRef.current) {
      divRef.current.innerHTML = '';
      divRef.current.append(svg);
    }
  }, [text]);

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input:" />
        <Textarea value={text} onChange={setText} />
      </Col>
      <Col>
        <Section title="Code:" />
        <ControlsWrapper
          controls={
            <>
              <Button
                icon={<TbJpg />}
                title="Download as JPEG"
                onClick={async () =>
                  (await fromImage(getDataUrl()))
                    .background('white')
                    .toDownload('qr.jpg')
                }
              />
              <Button
                icon={<TbPng />}
                title="Download as PNG"
                onClick={async () =>
                  (await fromImage(getDataUrl()))
                    .type('image/png')
                    .toDownload('qr.png')
                }
              />
              <Button
                icon={<TbSvg />}
                title="Download as SVG"
                onClick={() => download(getDataUrl(), 'qr.svg')}
              />
              <Button
                icon={<IoCopy />}
                title="Copy to clipboard"
                onClick={async () =>
                  navigator.clipboard.write([
                    new ClipboardItem({
                      'image/png': (await fromImage(getDataUrl()))
                        .type('image/png')
                        .toBlob(),
                    }),
                  ])
                }
              />
              <Button
                icon={<IoLink />}
                title="Copy as data URL"
                onClick={() => copy(getDataUrl())}
              />
            </>
          }
        >
          <ImageGeneratorPreview>
            <div ref={divRef}></div>
          </ImageGeneratorPreview>
        </ControlsWrapper>
      </Col>
    </Grid>
  );
};

export default Component;
