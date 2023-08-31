import React, { useState } from 'react';
import { toFile } from 'fitool';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { FileSelect } from '../../../components/FileSelect/index.js';
import { ImagePreview } from '../../../components/ImagePreview/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { usePaste } from '../../../hooks/usePaste.js';
import { Section } from '../../../components/Section/index.js';

export const Component: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [dataUrl, setDataUrl] = useState<string>();

  const updateFile = async (file?: File) => {
    setFile(file);

    if (file) {
      setDataUrl(URL.createObjectURL(file));
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
        <Section title="Output" />
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

export default Component;
