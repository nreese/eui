import React from 'react';

import { renderToHtml } from '../../services';

import {
  Link,
} from 'react-router';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiCodeBlockImpl,
} from '../../../../src/components';

import Code from './code';
const codeSource = require('!!raw-loader!./code');
const codeHtml = renderToHtml(Code);

import CodeBlock from './code_block';
const codeBlockSource = require('!!raw-loader!./code_block');
const codeBlockHtml = renderToHtml(CodeBlock);

import VirtualizedCodeBlock from './virtualized_code_block';
const virtualizedCodeBlockSource = require('!!raw-loader!./virtualized_code_block');
const virtualizedCodeBlockHtml = renderToHtml(VirtualizedCodeBlock);

export const CodeExample = {
  title: 'Code',
  sections: [{
    title: 'Inline',
    source: [{
      type: GuideSectionTypes.JS,
      code: codeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: codeHtml,
    }],
    text: (
      <p>
        <EuiCode>Code</EuiCode> is for making inline code snippets that can work
        within or next to bodies of text.
      </p>
    ),
    demo: <Code />,
  }, {
    title: 'CodeBlock',
    source: [{
      type: GuideSectionTypes.JS,
      code: codeBlockSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: codeBlockHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiCodeBlock</EuiCode> can be used to create multi-line code blocks.
      </p>
    ),
    props: { EuiCodeBlockImpl },
    demo: <CodeBlock />,
  }, {
    title: 'Virtualized CodeBlock',
    source: [{
      type: GuideSectionTypes.JS,
      code: virtualizedCodeBlockSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: virtualizedCodeBlockHtml,
    }],
    text: (
      <p>
        Use TBD prop to configure <EuiCode>EuiCodeBlock</EuiCode> to use
        {' '}<Link to="https://github.com/bvaughn/react-virtualized">react-virtualized</Link>{' '}
        to only render the visible code section to be super fast no matter lenght of the code block.
      </p>
    ),
    props: { EuiCodeBlockImpl },
    demo: <VirtualizedCodeBlock />,
  }],
};
