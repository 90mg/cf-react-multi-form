import React from 'react';
import { render, cleanup } from 'react-testing-library';
import FinalStep from '../FinalStep';
import { dishes } from '../../../public/data/dishes.json';

describe('UI tests', () => {
  afterEach(cleanup);

  it('Should have back button', () => {
    const { container } = render(<FinalStep fieldData={dishes} />);
    expect(container.querySelectorAll('button[name="back"]')).toHaveLength(1);
  });

  it('Should have submit button', () => {
    const { container } = render(<FinalStep fieldData={dishes} />);
    expect(container.querySelectorAll('button[name="submit"]')).toHaveLength(1);
  });
});
