import React from 'react';
import { union, pathOr, isEmpty } from 'ramda';
import { Formik, Form, FieldArray } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import FormHelperText from '@material-ui/core/FormHelperText';
import useFormStyles from '../hooks/useFormStyles';

const StepThree = ({ onNext, onBack, fieldData, currentStep, allStepsData }) => {
  const classes = useFormStyles();

  const numberOfPeople = pathOr(1, [1, 'numberOfPeople'])(allStepsData);
  const restaurant = pathOr('', [currentStep - 1, 'restaurant'])(allStepsData);
  const dishes = pathOr([{ name: '', quantity: 1 }], [currentStep, 'dishes'])(allStepsData);

  const availableDishes = extractAvailableDishesByRestaurant(restaurant)(fieldData);

  return (
    <Formik initialValues={{ dishes }} onSubmit={onNext} validate={validator(numberOfPeople)}>
      {({ values, errors, handleChange }) => (
        <Form>
          <FieldArray className={classes.fieldsArea} name="dishes" validateOnChange>
            {({ push, remove }) => (
              <div>
                {values.dishes.map((dish, index) => (
                  <div className={classes.compondField} key={index}>
                    <TextField
                      id={`dishes[${index}].name`}
                      name={`dishes[${index}].name`}
                      label="Dish"
                      select
                      fullWidth
                      value={dish.name}
                      onChange={handleChange}
                      error={!!pathOr(false, [`dishes[${index}].name`])(errors)}
                      helperText={pathOr(' ', [`dishes[${index}].name`])(errors)}
                    >
                      {availableDishes.map(dish => (
                        <MenuItem key={dish} value={dish}>
                          {dish}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      id={`dishes[${index}].quantity`}
                      name={`dishes[${index}].quantity`}
                      label="Quantity"
                      type="number"
                      fullWidth
                      value={dish.quantity}
                      onChange={handleChange}
                      error={!!pathOr(false, [`dishes[${index}].quantity`])(errors)}
                      helperText={pathOr(' ', [`dishes[${index}].quantity`])(errors)}
                    />

                    <IconButton name="remove-dish" onClick={() => remove(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                ))}
                <FormHelperText className={classes.helperText} variant="filled" error>
                  {pathOr('', ['countAllQuantity'])(errors)}
                </FormHelperText>
                <Fab
                  className={classes.addButton}
                  name="add-dish"
                  color="primary"
                  onClick={() => push({ name: '', quantity: 1 })}
                >
                  <AddIcon />
                </Fab>
              </div>
            )}
          </FieldArray>
          <div className={classes.buttonsArea}>
            <Button name="back" variant="contained" onClick={onBack}>
              Back
            </Button>
            <Button name="next" type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepThree;

export const extractAvailableDishesByRestaurant = restaurant => data =>
  data
    .filter(dish => dish.restaurant === restaurant)
    .reduce((acc, dish) => union(acc, [dish.name]), []);

export const validator = numberOfPeople => values => {
  let errors = {};

  values.dishes.forEach((dish, index) => {
    if (dish.quantity < 1 || dish.quantity > 10) {
      errors[`dishes[${index}].quantity`] = 'Value between 1 ~ 10';
    }

    if (isEmpty(dish.quantity)) {
      errors[`dishes[${index}].quantity`] = 'Required';
    }

    const countByName = values.dishes.filter(({ name }) => name === dish.name).length;
    if (countByName > 1) {
      errors[`dishes[${index}].name`] = 'Cannot same dishes';
    }

    if (isEmpty(dish.name)) {
      errors[`dishes[${index}].name`] = 'Required';
    }
  });

  const countAllQuantity = values.dishes.reduce((acc, { quantity }) => acc + quantity, 0);
  if (numberOfPeople > countAllQuantity) {
    errors['countAllQuantity'] =
      'The total number of dishes should be greater or equal to the number of person';
  }

  return errors;
};
