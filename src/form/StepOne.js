import React from 'react';
import { union, pathOr, isEmpty } from 'ramda';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import useFormStyles from '../hooks/useFormStyles';

const StepOne = ({ onNext, fieldData, currentStep, allStepsData }) => {
  const classes = useFormStyles();

  const meal = pathOr('', [currentStep, 'meal'])(allStepsData);
  const numberOfPeople = pathOr(1, [currentStep, 'numberOfPeople'])(allStepsData);

  const meals = extractAvailableMeals(fieldData);

  return (
    <Formik initialValues={{ meal, numberOfPeople }} onSubmit={onNext} validate={validator}>
      {({ values, errors, handleChange }) => {
        return (
          <Form className={classes.form}>
            <div className={classes.fieldsArea}>
              <TextField
                className={classes.field}
                id="meal"
                name="meal"
                label="Meal"
                select
                value={values.meal}
                onChange={handleChange}
                fullWidth
                error={!!errors.meal}
                helperText={errors.meal || ' '}
              >
                {meals.map(meal => (
                  <MenuItem key={meal} value={meal}>
                    {meal}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                className={classes.field}
                id="numberOfPeople"
                name="numberOfPeople"
                label="Number of people"
                type="number"
                value={values.numberOfPeople}
                onChange={handleChange}
                fullWidth
                error={!!errors.numberOfPeople}
                helperText={errors.numberOfPeople || ' '}
              />
            </div>

            <div className={classes.buttonsArea}>
              <div />
              <Button name="next" type="submit" variant="contained" color="primary">
                Next
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StepOne;

export const extractAvailableMeals = data =>
  data.reduce((acc, dish) => union(acc, dish.availableMeals), []);

export const validator = values => {
  let errors = {};

  if (values.numberOfPeople < 1 || values.numberOfPeople > 10) {
    errors.numberOfPeople = 'Value between 1 ~ 10';
  }

  if (isEmpty(values.numberOfPeople)) {
    errors.numberOfPeople = 'Required';
  }

  if (isEmpty(values.meal)) {
    errors.meal = 'Required';
  }

  return errors;
};
