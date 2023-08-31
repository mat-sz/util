import React, { useState } from 'react';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import {
  TextareaRegExp,
  TextareaRegExpValue,
} from '../../../components/Textarea/RegExp.js';
import { TextareaHighlights } from '../../../components/Textarea/Highlights.js';
import { Section } from '../../../components/Section/index.js';

interface RegExpIndicesArray extends RegExpExecArray {
  indices?: Array<[number, number]>;
}

function regexpResults(regexp: RegExp, str: string): RegExpIndicesArray[] {
  regexp.lastIndex = 0;
  if (regexp.flags.includes('g')) {
    return [...str.matchAll(regexp)] as RegExpIndicesArray[];
  } else {
    return [str.match(regexp)] as RegExpIndicesArray[];
  }
}

export const Component: React.FC = () => {
  const [regexp, setRegexp] = useState<TextareaRegExpValue | undefined>({
    source: '',
    flags: 'g',
  });
  const [text, setText] = useState('');

  const result = regexp?.regexp
    ? regexpResults(regexp.regexp, text)
    : undefined;

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="Input" />
        <TextareaRegExp value={regexp} onChange={setRegexp} />
        <TextareaHighlights
          value={text}
          onChange={setText}
          flex
          highlights={result?.flatMap(result => result?.indices || [])}
        />
      </Col>
      <Col>
        <Section title="Output" />
        {result ? (
          <pre>{JSON.stringify(result)}</pre>
        ) : (
          <div>Invalid regular expression</div>
        )}
      </Col>
    </Grid>
  );
};

export default Component;
