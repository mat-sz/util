import React, { useState } from 'react';
import ExifReader from 'exifreader';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { FileSelect } from '../../../components/FileSelect/index.js';
import { ImagePreview } from '../../../components/ImagePreview/index.js';
import { Input } from '../../../components/Input/index.js';
import { usePaste } from '../../../hooks/usePaste.js';

export const Component: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [tags, setTags] = useState<ExifReader.Tags>();
  const [previewUrl, setPreviewUrl] = useState<string>();

  const updateFile = async (file?: File) => {
    setFile(file);
    setPreviewUrl(undefined);
    setTags(undefined);
    if (!file) {
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setTags(await ExifReader.load(file));
  };

  usePaste(updateFile);

  return (
    <Grid cols={2}>
      <Col>
        <Label title="Input:" />
        <FileSelect file={file} onChange={updateFile} />
        {!!previewUrl && file?.type.startsWith('image/') && (
          <ImagePreview url={previewUrl} />
        )}
      </Col>
      <Col>
        <Label title="Output:" />
        {tags ? (
          <Grid cols={3}>
            <div>Tag</div>
            <div>Raw value</div>
            <div>Value</div>
            {Object.keys(tags).map(tag => {
              const value = tags[tag];
              if (
                tag in tags &&
                typeof value === 'object' &&
                'value' in value
              ) {
                return (
                  <React.Fragment key={tag}>
                    <Input readOnly value={tag} />
                    <Input readOnly value={value['value']} />
                    <Input
                      readOnly
                      value={'description' in value ? value['description'] : ''}
                    />
                  </React.Fragment>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        ) : (
          'Invalid image file.'
        )}
      </Col>
    </Grid>
  );
};
