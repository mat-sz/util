import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Textarea } from '../../../components/Textarea/index.js';
import { Box } from '../../../components/Box/index.js';
import { Section } from '../../../components/Section/index.js';
import { Tabs } from '../../../components/Tabs/index.js';

export const Component: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <Grid m={2}>
      <Col>
        <Section title="Input">
          <Textarea variant="code" flex value={value} onChange={setValue} />
        </Section>
      </Col>
      <Col>
        <Section title="Output" />
        <Tabs
          tabs={[
            {
              id: 'preview',
              title: 'Preview',
              view: (
                <Box>
                  <ReactMarkdown
                    children={value}
                    remarkPlugins={[remarkBreaks, remarkGfm]}
                  />
                </Box>
              ),
            },
            {
              id: 'html',
              title: 'HTML',
              view: (
                <Textarea
                  variant="code"
                  flex
                  value={unified()
                    .use(remarkParse as any)
                    .use(remarkBreaks as any)
                    .use(remarkGfm as any)
                    .use(remarkHtml as any)
                    .processSync(value)
                    .toString()}
                  readOnly
                />
              ),
            },
          ]}
        />
      </Col>
    </Grid>
  );
};
