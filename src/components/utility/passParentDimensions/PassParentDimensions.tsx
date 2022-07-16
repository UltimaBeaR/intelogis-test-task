import useDimensions from 'react-cool-dimensions';

import classes from './PassParentDimensions.module.scss';

interface PassParentDimensionsProps {
  children: (parentWidth: number, parentHeight: number) => React.ReactNode;
}

function PassParentDimensions({ children }: PassParentDimensionsProps) {
  const { observe, width, height } = useDimensions<HTMLDivElement>();

  return (
    <div ref={observe} className={classes['measuring-height-parent']}>
      <div className={classes['measuring-height-intermediate-fix']}>
        {children(width, height)}
      </div>
    </div>
  );
}

export default PassParentDimensions;