import React from 'react';

import {
  EuiTutorial,
} from '../../../../src/components';

const tutorial = {
  name: 'My Tutorial',
  longDescription: 'Description about tutorial.',
  completionTimeMinutes: 10,
  previewImagePath: '',
  onPrem: {
    instructionSets: [
      {
        title: 'Getting Started',
        instructionVariants: [
          {
            id: 'OSX',
            instructions: [
              {
                title: 'onPrem instructions',
              }
            ]
          }
        ]
      }
    ]
  },
  elasticCloud: {
    instructionSets: [
      {
        title: 'Getting Started',
        instructionVariants: [
          {
            id: 'OSX',
            instructions: [
              {
                title: 'onPremElasticCloud instructions - TBD',
              }
            ]
          }
        ]
      }
    ]
  },
  onPremElasticCloud: {
    instructionSets: [
      {
        title: 'Getting Started',
        instructionVariants: [
          {
            id: 'OSX',
            instructions: [
              {
                title: 'onPremElasticCloud instructions - TBD',
              }
            ]
          }
        ]
      }
    ]
  }
}

export default () => (
  <EuiTutorial
    description={'Description about tutorial.'}
    title={'My Tutorial'}
  />
);
