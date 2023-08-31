import React, { useState } from 'react';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { FileSelect } from '../../../components/FileSelect/index.js';
import { ImagePreview } from '../../../components/ImagePreview/index.js';
import { usePaste } from '../../../hooks/usePaste.js';
import { fromImage } from 'imtool';
import { Section } from '../../../components/Section/index.js';
import { Input } from '../../../components/Input/index.js';
import { Button } from '../../../components/Button/index.js';

export const Component: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [quality, setQuality] = useState(0.9);
  const [previewUrl, setPreviewUrl] = useState<string>();

  const updateFile = (file?: File) => {
    setFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : undefined);
  };

  usePaste(updateFile);

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input" />
        <FileSelect file={file} onChange={updateFile} />
        {!!previewUrl && file?.type.startsWith('image/') && (
          <ImagePreview url={previewUrl} />
        )}
      </Col>
      <Col>
        <Section title="JPEG">
          <Label title="Quality:" />
          <Input
            type="number"
            value={quality}
            onChange={value => setQuality(parseFloat(value))}
            min={0.1}
            max={1.0}
            step={0.1}
          />
          <Button
            onClick={async () => {
              if (!file) {
                return;
              }

              (await fromImage(file))
                .quality(quality)
                .type('image/jpeg')
                .toDownload('converted.jpg');
            }}
          >
            Download JPEG
          </Button>
        </Section>
        <Section title="PNG">
          <Button
            onClick={async () => {
              if (!file) {
                return;
              }

              (await fromImage(file))
                .quality(quality)
                .type('image/png')
                .toDownload('converted.png');
            }}
          >
            Download PNG
          </Button>
        </Section>
      </Col>
    </Grid>
  );
};

export default Component;
