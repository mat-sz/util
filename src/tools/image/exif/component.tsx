import React, { useState } from 'react';
import ExifReader from 'exifreader';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { FileSelect } from '../../../components/FileSelect/index.js';
import { ImagePreview } from '../../../components/ImagePreview/index.js';
import { Input } from '../../../components/Input/index.js';
import { usePaste } from '../../../hooks/usePaste.js';
import { Section } from '../../../components/Section/index.js';

export const Component: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [tags, setTags] = useState<ExifReader.Tags>();

  const updateFile = async (file?: File) => {
    setFile(file);
    setTags(undefined);
    if (!file) {
      return;
    }

    setTags(await ExifReader.load(file));
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
        {tags ? (
          <Grid m={3}>
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

export default Component;
