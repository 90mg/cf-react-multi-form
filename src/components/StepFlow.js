import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const StepFlow = ({ stepLabels, currentStep }) => (
  <Stepper>
    {stepLabels.map((label, index) => (
      <Step key={label} completed={index + 1 < currentStep} active={index + 1 === currentStep}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default StepFlow;
