import React, { useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Result } from '@zxing/library';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { FileSelect } from '../../../components/FileSelect/index.js';
import { ImagePreview } from '../../../components/ImagePreview/index.js';
import { Input } from '../../../components/Input/index.js';
import { usePaste } from '../../../hooks/usePaste.js';
import { Section } from '../../../components/Section/index.js';

export const Component: React.FC = () => {
  const [file, setFile] = useState<File>();

  const [result, setResult] = useState<Result>();

  const updateFile = async (file?: File) => {
    setFile(file);
    setResult(undefined);

    if (file) {
      const url = URL.createObjectURL(file);

      if (file.type.startsWith('image/') && url) {
        try {
          const reader = new BrowserQRCodeReader();
          const result = await reader.decodeFromImageUrl(url);
          setResult(result);
        } catch {
          setResult(undefined);
        }
      }
    }
  };

  usePaste(updateFile);

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input" />
        <FileSelect file={file} onChange={updateFile} />
        <ImagePreview file={file} />
      </Col>
      <Col>
        <Section title="Text" />
        <Input value={result ? result.getText() : undefined} readOnly />
      </Col>
    </Grid>
  );
};

export default Component;
