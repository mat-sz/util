import React, { useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { BarcodeFormat, Result } from '@zxing/library';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { FileSelect } from '../../../components/FileSelect/index.js';
import { ImagePreview } from '../../../components/ImagePreview/index.js';
import { Input } from '../../../components/Input/index.js';
import { usePaste } from '../../../hooks/usePaste.js';

export const Component: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [dataUrl, setDataUrl] = useState<string>();

  const [result, setResult] = useState<Result>();

  const updateFile = async (file?: File) => {
    setFile(file);
    setResult(undefined);

    if (file) {
      const url = URL.createObjectURL(file);
      setDataUrl(url);

      if (file.type.startsWith('image/') && url) {
        try {
          const reader = new BrowserMultiFormatReader();
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
    <Grid m={2}>
      <Col>
        <Label title="Input:" />
        <FileSelect file={file} onChange={updateFile} />
        {!!dataUrl && file?.type.startsWith('image/') && (
          <ImagePreview url={dataUrl} />
        )}
      </Col>
      <Col>
        <Label title="Format:" />
        <Input
          value={result ? BarcodeFormat[result.getBarcodeFormat()] : undefined}
          readOnly
        />
        <Label title="Text:" />
        <Input value={result ? result.getText() : undefined} readOnly />
      </Col>
    </Grid>
  );
};

export default Component;
