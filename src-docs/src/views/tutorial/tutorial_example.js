import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Tutorial from './tutorial';
const tutorialSource = require('!!raw-loader!./tutorial');
const tutorialHtml = renderToHtml(Tutorial);

export const TutorialExample = {
  title: 'Tutorial',
  sections: [{
    title: 'Tutorial',
    source: [{
      type: GuideSectionTypes.JS,
      code: tutorialSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: tutorialHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiTutorial</EuiCode> component.
      </p>
    ),
    demo: <Tutorial />,
  }],
};
