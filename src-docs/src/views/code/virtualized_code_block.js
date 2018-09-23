import React from 'react';

import {
  EuiCodeBlock,
} from '../../../../src/components';

let jsCode = '';
for (let i = 0; i < 2000; i++) {
  jsCode += `
function myFunc${i} {
  const a = ${i};
  const b = ${i};
  return a + b;
}`;
}

export default () => (
  <div>
    <EuiCodeBlock
      language="js"
      fontSize="l"
      paddingSize="s"
      color="dark"
      overflowHeight={300}
      isVirtualized={true}
    >
      {jsCode}
    </EuiCodeBlock>
  </div>
);
