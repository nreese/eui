import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSteps } from './steps';

const steps = [
  {
    title: 'first title',
    children: (<p>{'Do this first'}</p>)
  },
  {
    title: 'second title',
    children: (<p>{'Then this'}</p>)
  },
  {
    title: 'third title',
    children: (<p>{'And finally, do this'}</p>)
  },
];

describe('EuiSteps', () => {
  test('renders steps', () => {
    const component = render(
      <EuiSteps {...requiredProps} steps={steps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('renders steps with offset', () => {
    const component = render(
      <EuiSteps {...requiredProps} steps={steps} offset={9} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
