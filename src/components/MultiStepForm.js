import React, { useReducer, useCallback, useMemo, cloneElement } from 'react';
import { equals } from 'ramda';
import StepFlow from './StepFlow';

const initialState = {
  currentStep: 1,
  allStepsData: {},
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'next': {
      const { currentStep, allStepsData } = state;
      const currentStepData = allStepsData[currentStep] || {};

      let newAllStepsData = {};
      if (!equals(currentStepData, payload)) {
        for (let i = 1; i < currentStep; i++) {
          newAllStepsData[i] = allStepsData[i];
        }
      } else {
        newAllStepsData = allStepsData;
      }
      newAllStepsData[currentStep] = payload;

      return {
        allStepsData: newAllStepsData,
        currentStep: currentStep + 1,
      };
    }
    case 'back':
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    default:
      return state;
  }
};

const MultiStepForm = ({ children, fieldData, showFlow }) => {
  const [formState, dispatch] = useReducer(reducer, initialState);

  const handleNext = useCallback(payload => dispatch({ type: 'next', payload }));
  const handleBack = useCallback(() => dispatch({ type: 'back' }));
  const hanleSubmit = useCallback(() => console.log(formState));

  const stepLabels = useMemo(() => children.map(child => child.props.label));

  const { currentStep, allStepsData } = formState;
  const currentStepComponent = children[currentStep - 1];

  return (
    <>
      {showFlow && <StepFlow currentStep={currentStep} stepLabels={stepLabels} />}
      {cloneElement(currentStepComponent, {
        key: currentStepComponent.props.label,
        onNext: handleNext,
        onBack: handleBack,
        onSubmit: hanleSubmit,
        fieldData,
        allStepsData,
        currentStep,
      })}
    </>
  );
};

export default MultiStepForm;
