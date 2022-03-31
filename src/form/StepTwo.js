import React from 'react';
import { union, includes, prop, compose, pathOr, isEmpty } from 'ramda';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import useFormStyles from '../hooks/useFormStyles';

const StepTwo = ({ onNext, onBack, fieldData, currentStep, allStepsData }) => {
  const classes = useFormStyles();

  const meal = pathOr('', [currentStep - 1, 'meal'])(allStepsData);
  const restaurant = pathOr('', [currentStep, 'restaurant'])(allStepsData);

  const restaurants = extractRestaurantByMeal(meal)(fieldData);

  return (
    <Formik initialValues={{ restaurant }} onSubmit={onNext} validate={validator}>
      {({ values, errors, handleChange }) => {
        return (
          <Form className={classes.form}>
            <div className={classes.fieldsArea}>
              <TextField
                className={classes.field}
                id="restaurant"
                name="restaurant"
                label="Restaurant"
                select
                value={values.restaurant}
                onChange={handleChange}
                fullWidth
                error={!!errors.restaurant}
                helperText={errors.restaurant || ' '}
              >
                {restaurants.map(restaurant => (
                  <MenuItem key={restaurant} value={restaurant}>
                    {restaurant}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.buttonsArea}>
              <Button name="back" variant="contained" onClick={onBack}>
                Back
              </Button>
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

export default StepTwo;

export const extractRestaurantByMeal = meal => data =>
  data
    .filter(
      compose(
        includes(meal),
        prop('availableMeals'),
      ),
    )
    .reduce((acc, dish) => union(acc, [dish.restaurant]), []);

export const validator = values => {
  let errors = {};

  if (isEmpty(values.restaurant)) {
    errors.restaurant = 'Required';
  }

  return errors;
};
