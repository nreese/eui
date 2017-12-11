import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTutorial } from './tutorial';

describe('EuiTutorial', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTutorial {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
