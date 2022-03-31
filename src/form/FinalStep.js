import React from 'react';
import { pathOr } from 'ramda';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useFormStyles from '../hooks/useFormStyles';

const FinalStep = ({ onBack, onSubmit, allStepsData }) => {
  const classes = useFormStyles();

  const meal = pathOr('', [1, 'meal'])(allStepsData);
  const numberOfPeople = pathOr('', [1, 'numberOfPeople'])(allStepsData);
  const restaurant = pathOr('', [2, 'restaurant'])(allStepsData);
  const dishes = pathOr([], [3, 'dishes'])(allStepsData);

  return (
    <div>
      <Grid className={classes.gridContainer} spacing={24} container>
        <Grid item xs={5}>
          <Typography variant="h5" align="right" gutterBottom>
            Meal
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="subtitle1" gutterBottom>
            {meal}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h5" align="right" gutterBottom>
            Number of people
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="subtitle1" gutterBottom>
            {numberOfPeople}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h5" align="right" gutterBottom>
            Restaurant
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="subtitle1" gutterBottom>
            {restaurant}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h5" align="right" gutterBottom>
            Dishes
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <div>
            {dishes.map(dish => (
              <Typography key={dish.name} variant="subtitle1" gutterBottom>
                {`${dish.name} - ${dish.quantity}`}
              </Typography>
            ))}
          </div>
        </Grid>
      </Grid>
      <div className={classes.buttonsArea}>
        <Button name="back" variant="contained" onClick={onBack}>
          Back
        </Button>
        <Button name="submit" variant="contained" color="secondary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FinalStep;
