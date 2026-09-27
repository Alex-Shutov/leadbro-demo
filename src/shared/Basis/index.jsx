import React from 'react';

const BasisComponent = ({ basis, className, children }) => {
  const style =
    basis === undefined || basis === null || basis === 'auto'
      ? undefined
      : { flexBasis: basis };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

export default BasisComponent;
