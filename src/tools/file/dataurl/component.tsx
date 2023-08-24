import React, { useState } from 'react';
import { toFile, toDataURL } from 'fitool';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { FileSelect } from '../../../components/FileSelect/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { usePaste } from '../../../hooks/usePaste.js';

export const Component: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [dataUrl, setDataUrl] = useState<string>();

  const updateFile = async (file?: File) => {
    setFile(file);

    if (file) {
      setDataUrl(await toDataURL(file));
    }
  };

  usePaste(updateFile);

  return (
    <Grid m={2}>
      <Col>
        <Label title="Input:" />
        <FileSelect file={file} onChange={updateFile} />
      </Col>
      <Col>
        <Label title="Output:" />
        <Textarea
          variant="code"
          value={dataUrl}
          flex
          onChange={async url => {
            setDataUrl(url);
            setFile(await toFile(url.replaceAll('\n', '').trim()));
          }}
        />
      </Col>
    </Grid>
  );
};
