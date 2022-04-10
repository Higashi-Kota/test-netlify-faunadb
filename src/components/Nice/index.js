import React from 'react';

const Nice = React.memo(({ style }) => {
  console.log('nice render');
  return <div style={style}>{'Nice'}</div>;
});

export { Nice };
