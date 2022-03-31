import React from 'react';
import { render, cleanup } from 'react-testing-library';
import StepFlow from '../StepFlow';

describe('UI tests', () => {
  const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Review'];

  afterEach(cleanup);

  it('Should render all labels', () => {
    const { container } = render(<StepFlow currentStep={1} stepLabels={stepLabels} />);
    expect(container.querySelectorAll('text')).toHaveLength(stepLabels.length);
  });
});
