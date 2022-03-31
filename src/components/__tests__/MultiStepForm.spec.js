import { reducer } from '../MultiStepForm';

describe('Reducer tests', () => {
  it('Should increase current step', () => {
    const mockState = {
      currentStep: 1,
      allStepsData: {},
    };

    const payload = { meal: 'breakfast' };
    const type = 'next';

    expect(reducer(mockState, { type, payload })).toHaveProperty('currentStep', 2);
  });

  it('Should decrease current step', () => {
    const mockState = {
      currentStep: 2,
      allStepsData: {},
    };

    const type = 'back';

    expect(reducer(mockState, { type })).toHaveProperty('currentStep', 1);
  });

  it('Should add new step data', () => {
    const mockState = {
      currentStep: 1,
      allStepsData: {},
    };

    const payload = { meal: 'breakfast' };
    const type = 'next';

    expect(reducer(mockState, { type, payload })).toEqual({
      allStepsData: { '1': { meal: 'breakfast' } },
      currentStep: 2,
    });
  });

  it('Should add more step data', () => {
    const mockState = {
      allStepsData: { '1': { meal: 'breakfast' } },
      currentStep: 2,
    };

    const payload = { restaurant: 'Olive Garden' };
    const type = 'next';

    expect(reducer(mockState, { type, payload })).toEqual({
      allStepsData: {
        '1': { meal: 'breakfast' },
        '2': { restaurant: 'Olive Garden' },
      },
      currentStep: 3,
    });
  });

  it('Should remove further step data if current step data changed (back then change some data)', () => {
    const mockState = {
      allStepsData: {
        '1': { meal: 'breakfast' },
        '2': { restaurant: 'Olive Garden' },
      },
      currentStep: 1,
    };

    const payload = { meal: 'lunch' };
    const type = 'next';

    expect(reducer(mockState, { type, payload })).toEqual({
      allStepsData: { '1': { meal: 'lunch' } },
      currentStep: 2,
    });
  });

  it('Should not remove further step data if current step data not changed (back then not change any data)', () => {
    const mockState = {
      allStepsData: {
        '1': { meal: 'breakfast' },
        '2': { restaurant: 'Olive Garden' },
      },
      currentStep: 1,
    };

    const payload = { meal: 'breakfast' };
    const type = 'next';

    expect(reducer(mockState, { type, payload })).toEqual({
      allStepsData: {
        '1': { meal: 'breakfast' },
        '2': { restaurant: 'Olive Garden' },
      },
      currentStep: 2,
    });
  });
});
